# Vercel Deployment Instrukcija

## 📋 Priekšnosacījumi

1. **GitHub konts** - lai augšupielādētu kodu
2. **Vercel konts** - bezmaksas (pierakstīties ar GitHub)
3. **Datu bāze** - izvēlēties vienu no:
   - Vercel Postgres (ieteicams, integrēts)
   - Supabase (bezmaksas)
   - PlanetScale (bezmaksas)
   - MongoDB Atlas (bezmaksas)

---

## 🚀 1. Sagatavošana Deployment

### A. Pārbaudi package.json

Pārliecinies, ka ir pareizs build script:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### B. Izveido .gitignore (jau ir)

Pārliecinies, ka šie faili NAV Git:
```
node_modules/
.next/
.env
.env.local
```

### C. Izveido .env.example

Izveidošu paraugu failu ar nepieciešamajiem environment variables.

---

## 🗄️ 2. Datu Bāzes Izvēle un Iestatīšana

### Ieteikums: **Vercel Postgres** (vienkāršākais)

#### Soļi:

1. **Pierakstīties Vercel:** https://vercel.com
2. **Izveidot projektu** (vēlāk)
3. **Storage → Create Database → Postgres**
4. **Nokopēt connection string**

#### Alternatīva: **Supabase** (bezmaksas, labs)

1. **Pierakstīties:** https://supabase.com
2. **New Project**
3. **Settings → Database → Connection String**
4. **Nokopēt PostgreSQL connection string**

---

## 📦 3. Instalē Prisma (ORM datu bāzei)

```bash
npm install prisma @prisma/client
npm install -D prisma
```

Inicializē Prisma:

```bash
npx prisma init
```

---

## 🔧 4. Konfigurē Prisma Schema

Izveidošu `prisma/schema.prisma` failu ar visām tabulām.

---

## 🌐 5. GitHub Repository

### A. Inicializē Git (ja vēl nav)

```bash
git init
git add .
git commit -m "Initial commit - Izaugt Milestiba 2.0"
```

### B. Izveido GitHub Repository

1. Dodies uz https://github.com/new
2. Repository name: `izaugt-milestiba`
3. Private vai Public (tavs izvēle)
4. **NEATZĪMĒ** "Initialize with README" (mums jau ir)
5. Create repository

### C. Savieno ar GitHub

```bash
git remote add origin https://github.com/TAVS-USERNAME/izaugt-milestiba.git
git branch -M main
git push -u origin main
```

---

## ☁️ 6. Deploy uz Vercel

### A. Pierakstīties Vercel

1. Dodies uz https://vercel.com
2. Sign Up ar GitHub kontu
3. Authorize Vercel

### B. Import Project

1. **New Project**
2. **Import Git Repository**
3. Izvēlies `izaugt-milestiba` repository
4. **Import**

### C. Konfigurē Environment Variables

Pirms deploy, pievieno:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=random-secret-string
NEXTAUTH_URL=https://your-domain.vercel.app
```

### D. Deploy

1. **Deploy**
2. Gaidi ~2-3 minūtes
3. Vercel automātiski:
   - Instalē dependencies
   - Izpilda `npm run build`
   - Izvieto aplikāciju

---

## 🗃️ 7. Migrē Datu Bāzi

### A. Lokāli

```bash
npx prisma migrate dev --name init
```

### B. Produkcijā (Vercel)

```bash
npx prisma migrate deploy
```

Vai Vercel Dashboard:
- Settings → General → Build & Development Settings
- Build Command: `npx prisma generate && npm run build`

---

## 📊 8. Seed Datu Bāzi (Sākotnējie Dati)

Izveidošu seed script, kas pievienos:
- Demo rakstus
- Demo produktus
- Demo pasūtījumus
- Admin lietotāju

```bash
npx prisma db seed
```

---

## ✅ 9. Pārbaudi Deployment

1. **Atver Vercel URL:** https://your-project.vercel.app
2. **Pārbaudi:**
   - Sākumlapa ielādējas
   - Raksti redzami
   - Admin panelis darbojas
   - Datu bāze savienota

---

## 🔄 10. Automātiskais Deployment

Tagad katru reizi, kad push uz GitHub:

```bash
git add .
git commit -m "Update design"
git push
```

Vercel **automātiski** izvietos jaunāko versiju!

---

## 🎯 Nākamie Soļi

1. **Custom Domain** (ja vēlies)
   - Vercel Dashboard → Settings → Domains
   - Pievieno savu domēnu (piemēram, izaugtmilestiba.lv)

2. **Analytics**
   - Vercel Analytics (bezmaksas)
   - Google Analytics

3. **Monitoring**
   - Vercel Logs
   - Error tracking (Sentry)

---

## 🆘 Problēmu Risināšana

### Build Error

```bash
# Lokāli pārbaudi build
npm run build
```

### Database Connection Error

- Pārbaudi DATABASE_URL
- Pārbaudi, vai Prisma schema ir pareiza
- Pārbaudi, vai migrations ir izpildītas

### Environment Variables

- Vercel Dashboard → Settings → Environment Variables
- Pievieno visus .env mainīgos

---

## 📝 Checklist

- [ ] GitHub repository izveidots
- [ ] Kods augšupielādēts GitHub
- [ ] Vercel konts izveidots
- [ ] Datu bāze izveidota (Vercel Postgres vai Supabase)
- [ ] Prisma konfigurēta
- [ ] Environment variables pievienoti Vercel
- [ ] Projekts deployed
- [ ] Datu bāze migrēta
- [ ] Seed dati pievienoti
- [ ] Viss testēts produkcijā

---

**Izveidots:** 2026-01-14  
**Versija:** 1.0  
**Status:** Gatavs deployment
