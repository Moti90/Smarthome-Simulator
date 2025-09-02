# 🧪 GitHub Live Test Guide - Smart Home Simulator

## 🎯 **Formål**
Teste at Smart Home Simulator fungerer korrekt live på GitHub Pages efter deployment.

## 📋 **Test Checklist - Før Testing**

### **✅ Deployment Status:**
- [ ] Batch fil kørt (`upload_to_github.bat`)
- [ ] Alle filer committed til git
- [ ] Push til GitHub completed
- [ ] GitHub Pages deployment started

### **🌐 GitHub Pages URL:**
- **Live Demo**: https://moti90.github.io/Smarthome-Simulator/
- **Repository**: https://github.com/Moti90/Smarthome-Simulator

---

## 🧪 **TEST 1: Grundlæggende Funktionalitet**

### **1.1 Side Loading**
- [ ] **Åbn live URL** i browser
- [ ] **Side loader uden fejl** (ingen JavaScript fejl i console)
- [ ] **Interface vises korrekt** (logo, navigation, simulator)

### **1.2 Responsive Design**
- [ ] **Desktop view** - alt ser korrekt ud
- [ ] **Mobile view** - responsivt design
- [ ] **Tablet view** - mellemstørrelse

---

## 🧪 **TEST 2: Simulator Core Features**

### **2.1 Device Control**
- [ ] **Tænd/sluk lamper** - klik på lamper virker
- [ ] **Tænd/sluk stikkontakter** - klik på stikkontakter virker
- [ ] **Tænd/sluk varme** - klik på varme virker
- [ ] **Tænd/sluk dører** - klik på døre virker

### **2.2 Sensor Simulation**
- [ ] **Temperatur sensor** - viser realistiske værdier
- [ ] **Lys sensor** - reagerer på lamper
- [ ] **Bevægelse sensor** - reagerer på døre
- [ ] **Tid-baserede ændringer** - værdier ændrer sig over tid

---

## 🧪 **TEST 3: Rule Engine**

### **3.1 Regel Oprettelse**
- [ ] **Opret ny regel** - "Hvis lys < 50, tænd lampe"
- [ ] **Opret ny regel** - "Hvis temperatur > 22, sluk varme"
- [ ] **Opret ny regel** - "Hvis dør åbner, tænd lys"

### **3.2 Regel Test**
- [ ] **Test regel 1** - dæmp lys, lampe tænder automatisk
- [ ] **Test regel 2** - øg temperatur, varme slukker automatisk
- [ ] **Test regel 3** - åbn dør, lys tænder automatisk

### **3.3 Regel Administration**
- [ ] **Rediger regel** - ændre betingelser
- [ ] **Aktivér/deaktiver** regel
- [ ] **Slet regel** - fjern regel

---

## 🧪 **TEST 4: Progress Tracking**

### **4.1 Skole/Klasse Setup**
- [ ] **Vælg skole** fra dropdown
- [ ] **Vælg klasse** fra dropdown
- [ ] **Gem valg** - valg bliver gemt

### **4.2 Progress Gem**
- [ ] **Opret regler** - progress gemmes
- [ ] **Test regler** - progress gemmes
- [ ] **Refresh side** - progress er stadig der

---

## 🧪 **TEST 5: Firebase Integration**

### **5.1 Backend Services**
- [ ] **Authentication service** - ingen JavaScript fejl
- [ ] **Database service** - ingen JavaScript fejl
- [ ] **Firebase config** - korrekt indlæst

### **5.2 Data Persistence**
- [ ] **Progress gemmes** til Firebase (hvis authentication virker)
- [ ] **Fallback til localStorage** når Firebase ikke er tilgængelig
- [ ] **Real-time sync** (hvis authentication virker)

---

## 🧪 **TEST 6: Performance & Stability**

### **6.1 Performance**
- [ ] **Side loading** - under 3 sekunder
- [ ] **Regel execution** - under 1 sekund
- [ **Device response** - øjeblikkelig feedback

### **6.2 Stability**
- [ ] **Lang kørsel** - 5+ minutter uden fejl
- [ ] **Mange regler** - 10+ regler uden problemer
- [ ] **Browser refresh** - alt virker efter refresh

---

## 🐛 **Fejl Håndtering**

### **Hvis noget ikke virker:**

#### **JavaScript Fejl i Console:**
1. **Åbn Developer Tools** (F12)
2. **Gå til Console** fanen
3. **Kopier fejlmeddelelser**
4. **Tjek om Firebase config er korrekt**

#### **Firebase Fejl:**
1. **Tjek Firebase Console** - er projektet aktivt?
2. **Tjek Firestore Rules** - er de deployed?
3. **Tjek API nøgler** - er de korrekte?

#### **GitHub Pages Problemer:**
1. **Vent 5-10 minutter** - deployment tager tid
2. **Tjek GitHub Actions** - er deployment completed?
3. **Tjek repository** - er alle filer der?

---

## 📊 **Test Resultat**

### **Test Status:**
- **✅ Fungerer perfekt** - Alle tests passed
- **⚠️ Delvist fungerer** - Nogle features virker ikke
- **❌ Fungerer ikke** - Mange features virker ikke

### **Næste Skridt baseret på resultat:**
- **✅ Alle tests passed** → Fortsæt med authentication system
- **⚠️ Delvist fungerer** → Identificer og løs problemer
- **❌ Fungerer ikke** → Debug og løs grundlæggende problemer

---

## 🎯 **Exit Krav for Testing**

### **Testing er færdig når:**
1. **Alle core features** virker korrekt
2. **Ingen kritiske fejl** i console
3. **Performance** er acceptabel
4. **Data persistence** virker (localStorage eller Firebase)
5. **Responsive design** virker på alle enheder

---

**Test Guide Oprettet**: 2025-01-01
**Næste Review**: Efter live testing på GitHub
**Status**: Klar til brug
