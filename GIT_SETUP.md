# Git Instalācija un Push Instrukcija

## 1️⃣ Instalē Git

### Lejupielādē un instalē:
1. Dodies uz: https://git-scm.com/download/win
2. Lejupielādē "64-bit Git for Windows Setup"
3. Palaidi instalāciju
4. Izmanto default iestatījumus (Next, Next, Next...)
5. **SVARĪGI:** Pēc instalācijas **restartē PowerShell/Terminal**

### Pārbaudi instalāciju:
```bash
git --version
```

Vajadzētu redzēt: `git version 2.x.x`

---

## 2️⃣ Konfigurē Git (Pirmā reize)

```bash
git config --global user.name "Tavs Vārds"
git config --global user.email "tavs@email.com"
```

---

## 3️⃣ Inicializē Git Repository

```bash
cd "c:\Users\GatisRomanovskis\SIA Anima\ANIMAS - Documents\Projekti\izaugt-milestiba"

git init
```

---

## 4️⃣ Pievieno Visus Failus

```bash
git add .
```

---

## 5️⃣ Commit

```bash
git commit -m "Initial commit - Izaugt Milestiba 2.0"
```

---

## 6️⃣ Savieno ar GitHub Repository

```bash
git remote add origin https://github.com/animasgpt/Izaugtmilestiba.git
```

---

## 7️⃣ Push uz GitHub

```bash
git branch -M main
git push -u origin main
```

### Ja prasa autentifikāciju:
- **Username:** animasgpt
- **Password:** Izmanto **Personal Access Token** (ne paroli!)

#### Kā izveidot Personal Access Token:
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. Izvēlies scopes: `repo` (visi)
5. Generate token
6. **NOKOPĒ TOKEN** (redzēsi tikai vienu reizi!)
7. Izmanto to kā password

---

## ✅ Pārbaudi

Atver: https://github.com/animasgpt/Izaugtmilestiba

Vajadzētu redzēt visus failus!

---

## 🔄 Turpmāk (Izmaiņu Push)

```bash
git add .
git commit -m "Apraksts par izmaiņām"
git push
```

---

## 🆘 Problēmas?

### "Git nav atpazīts"
- Restartē PowerShell
- Vai instalē Git no jauna

### "Authentication failed"
- Izmanto Personal Access Token, ne paroli
- Pārbaudi, vai token ir pareizs

### "Permission denied"
- Pārbaudi, vai esi repository īpašnieks
- Pārbaudi token permissions

---

**Pēc veiksmīga push:** Turpini ar Vercel deployment!
