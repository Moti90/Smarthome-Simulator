using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace IBISimulator
{
    internal static class Program
    {
        private static Mutex? _singleInstanceMutex;

        [STAThread]
        static void Main()
        {
            // Single-instance så bruger ikke får to vinduer ved et uheld
            bool createdNew = false;
            _singleInstanceMutex = new Mutex(true, "IBISIMULATOR_BY_RJ_SINGLE_INSTANCE", out createdNew);
            if (!createdNew)
            {
                MessageBox.Show("Programmet kører allerede.", "IBISIMULATOR", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            // Global exception handlers + høj DPI
            Application.SetHighDpiMode(HighDpiMode.PerMonitorV2);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            AppDomain.CurrentDomain.UnhandledException += (s, e) =>
            {
                try { Logger.Log("UnhandledException: " + (e.ExceptionObject?.ToString() ?? "(null)")); } catch { }
            };
            Application.ThreadException += (s, e) =>
            {
                try { Logger.Log("ThreadException: " + e.Exception.ToString()); } catch { }
                MessageBox.Show("Der opstod en fejl.\n\n" + e.Exception.Message, "Fejl", MessageBoxButtons.OK, MessageBoxIcon.Error);
            };

            Application.Run(new MainForm());
        }
    }

    internal static class Logger
    {
        private static readonly string LogDir = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "IBISIMULATOR", "logs");

        public static void Log(string message)
        {
            try
            {
                Directory.CreateDirectory(LogDir);
                string file = Path.Combine(LogDir, $"app-{DateTime.Now:yyyyMMdd}.log");
                File.AppendAllText(file, $"[{DateTime.Now:HH:mm:ss}] {message}{Environment.NewLine}", Encoding.UTF8);
            }
            catch { /* logging må aldrig crashe appen */ }
        }
    }

    internal class MainForm : Form
    {
        private readonly WebView2 _web = new WebView2();
        private CoreWebView2? _core;

        public MainForm()
        {
            Text = "IBISIMULATOR BY RJ";
            Width = 1280;
            Height = 800;
            StartPosition = FormStartPosition.CenterScreen;

            _web.Dock = DockStyle.Fill;
            Controls.Add(_web);

            Shown += async (s, e) =>
            {
                try
                {
                    await InitWebViewAsync();
                }
                catch (Exception ex)
                {
                    Logger.Log("InitWebViewAsync FAILED: " + ex);
                    MessageBox.Show("Kunne ikke initialisere WebView2.\n\n" + ex.Message, "Fejl", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    Close();
                }
            };
        }

        private async System.Threading.Tasks.Task InitWebViewAsync()
        {
            string userData = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "IBISIMULATOR", "wv2");

            Directory.CreateDirectory(userData);

            var env = await CoreWebView2Environment.CreateAsync(
                browserExecutableFolder: null,
                userDataFolder: userData,
                options: null);

            await _web.EnsureCoreWebView2Async(env);
            _core = _web.CoreWebView2;

            // Basale settings (skru ned for “drilleri” i produktion)
#if DEBUG
            _core.Settings.AreDevToolsEnabled = true;
            _core.Settings.AreDefaultContextMenusEnabled = true;
#else
            _core.Settings.AreDevToolsEnabled = false;
            _core.Settings.AreDefaultContextMenusEnabled = false;
#endif
            _core.Settings.IsStatusBarEnabled = false;
            _core.Settings.AreDefaultScriptDialogsEnabled = true;
            _core.Settings.IsZoomControlEnabled = true;
            _core.Settings.IsGeneralAutofillEnabled = false;
            _core.Settings.IsPasswordAutosaveEnabled = false;
            _core.Settings.IsBuiltInErrorPageEnabled = true;

            // Bro til JS (window.api.*)
            _core.WebMessageReceived += Core_WebMessageReceived;

            // Åbn eksterne links i standardbrowser
            _core.NavigationStarting += (s, e) =>
            {
                var uri = e.Uri ?? "";
                if (uri.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
                    uri.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
                {
                    e.Cancel = true;
                    try { Process.Start(new ProcessStartInfo(uri) { UseShellExecute = true }); } catch { }
                }
            };

            _core.NavigationCompleted += (s, e) =>
            {
                if (!e.IsSuccess)
                {
                    Logger.Log($"NavigationCompleted error: {e.WebErrorStatus}");
                    MessageBox.Show("Fejl under indlæsning af HTML (se log).", "Navigation", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
            };

            _core.ProcessFailed += (s, e) =>
            {
                Logger.Log($"ProcessFailed: {e.ProcessFailedKind}");
                MessageBox.Show("WebView2 genstartes pga. fejl i webprocessen.", "WebView2", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                try { _core?.Reload(); } catch { }
            };

                    // Indlæs index.html fra samme mappe som .exe
        var htmlPath = Path.Combine(AppContext.BaseDirectory, "index.html");
            if (!File.Exists(htmlPath))
            {
                            Logger.Log("index.html not found at: " + htmlPath);
            MessageBox.Show("Filen 'index.html' blev ikke fundet ved siden af .exe", "Mangler fil", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            _core.Navigate(new Uri(htmlPath).AbsoluteUri);
        }

        private async void Core_WebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            try
            {
                var json = e.TryGetWebMessageAsString();
                if (string.IsNullOrWhiteSpace(json))
                    return;

                using var doc = JsonDocument.Parse(json);
                var root = doc.RootElement;

                string id   = root.TryGetProperty("id", out var idEl) ? idEl.GetString() ?? "" : "";
                string cmd  = root.TryGetProperty("cmd", out var cmdEl) ? cmdEl.GetString() ?? "" : "";

                switch (cmd)
                {
                    case "saveText":
                    {
                        string defaultName = root.TryGetProperty("defaultName", out var dn) ? dn.GetString() ?? "output.txt" : "output.txt";
                        string text        = root.TryGetProperty("text", out var tx) ? tx.GetString() ?? "" : "";

                        string? path = ShowSaveDialog(defaultName);
                        if (path != null)
                        {
                            await File.WriteAllTextAsync(path, text, new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));
                            SendReply(id, new { path });
                            Logger.Log("Saved file: " + path);
                        }
                        else
                        {
                            SendReply(id, new { path = (string?)null });
                        }
                        break;
                    }
                    case "openText":
                    {
                        var path = ShowOpenDialog("JSON eller tekst|*.json;*.txt|Alle filer|*.*");
                        if (path != null)
                        {
                            string txt = await File.ReadAllTextAsync(path, Encoding.UTF8);
                            SendReply(id, new { ok = true, path, text = txt });
                            Logger.Log("Opened file: " + path);
                        }
                        else
                        {
                            SendReply(id, new { ok = false });
                        }
                        break;
                    }
                    default:
                        Logger.Log("Unknown cmd from JS: " + cmd);
                        break;
                }
            }
            catch (Exception ex)
            {
                Logger.Log("WebMessage handler error: " + ex);
            }
        }

        private void SendReply(string id, object payload)
        {
            try
            {
                if (string.IsNullOrEmpty(id) || _core == null) return;
                var wrapper = new
                {
                    replyTo = id,
                    payload
                };
                string json = JsonSerializer.Serialize(wrapper);
                _core.PostWebMessageAsJson(json);
            }
            catch (Exception ex)
            {
                Logger.Log("SendReply error: " + ex);
            }
        }

        private static string? ShowSaveDialog(string defaultName)
        {
            using var sfd = new SaveFileDialog
            {
                FileName = defaultName,
                Filter = "Lua|*.lua|JSON|*.json|Tekst|*.txt|Alle filer|*.*",
                RestoreDirectory = true,
                OverwritePrompt = true
            };
            return sfd.ShowDialog() == DialogResult.OK ? sfd.FileName : null;
        }

        private static string? ShowOpenDialog(string filter)
        {
            using var ofd = new OpenFileDialog
            {
                Filter = filter,
                RestoreDirectory = true
            };
            return ofd.ShowDialog() == DialogResult.OK ? ofd.FileName : null;
        }
    }
}
