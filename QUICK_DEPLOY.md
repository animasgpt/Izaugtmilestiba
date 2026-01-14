# 🚀 Ātrā Vercel Deployment Instrukcija

## 1️⃣ Instalē Prisma

```bash
npm install
```

## 2️⃣ Izveido .env failu

Nokopē `.env.example` uz `.env`:

```bash
copy .env.example .env
```

Rediģē `.env` un pievieno savu DATABASE_URL (vēlāk).

## 3️⃣ Izveido GitHub Repository

```bash
# Inicializē Git (ja vēl nav)
git init

# Pievieno visus failus
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Izveido repository GitHub (https://github.com/new)
# Pēc tam:
git remote add origin https://github.com/TAVS-USERNAME/izaugt-milestiba.git
git branch -M main
git push -u origin main
```

## 4️⃣ Izveido Vercel Kontu

1. Dodies uz https://vercel.com
2. Sign Up ar GitHub
3. Authorize Vercel

## 5️⃣ Izveido Datu Bāzi

### Variants A: Vercel Postgres (Ieteicams)

1. Vercel Dashboard → Storage
2. Create Database → Postgres
3. Nokopē connection string

### Variants B: Supabase (Bezmaksas)

1. https://supabase.com → New Project
2. Settings → Database → Connection String
3. Nokopē PostgreSQL connection string

## 6️⃣ Deploy uz Vercel

1. Vercel Dashboard → New Project
2. Import Git Repository → Izvēlies `izaugt-milestiba`
3. **Environment Variables** (SVARĪGI!):
   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=your-random-secret-here
   ```
4. Deploy

## 7️⃣ Migrē Datu Bāzi

Pēc deployment:

```bash
# Lokāli (ja vēlies testēt)
npx prisma migrate dev --name init

# Vai Vercel Dashboard:
# Settings → General → Build Command
# Pievieno: npx prisma migrate deploy && npx prisma generate && npm run build
```

## 8️⃣ Seed Datu Bāzi

```bash
npm run prisma:seed
```

## 9️⃣ Pārbaudi

Atver savu Vercel URL: `https://your-project.vercel.app`

---

## ⚡ Ātrā Pārbaude

- [ ] Git repository izveidots
- [ ] Kods GitHub
- [ ] Vercel konts
- [ ] Datu bāze izveidota
- [ ] DATABASE_URL pievienots Vercel
- [ ] Deployed
- [ ] Datu bāze migrēta
- [ ] Viss darbojas!

---

## 🆘 Problēmas?

### "Build failed"
- Pārbaudi Vercel logs
- Pārbaudi, vai DATABASE_URL ir pareizs

### "Database connection error"
- Pārbaudi DATABASE_URL formātu
- Pārbaudi, vai datu bāze ir pieejama

### "Missing environment variables"
- Vercel → Settings → Environment Variables
- Pievieno DATABASE_URL un NEXTAUTH_SECRET

---

**Pilna instrukcija:** Skatīt `DEPLOYMENT.md`
