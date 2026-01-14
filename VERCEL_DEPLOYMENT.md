# Vercel Deployment Guide

## Current Status
✅ Code pushed to GitHub: https://github.com/animasgpt/Izaugtmilestiba.git
✅ Build configuration updated
✅ Environment files created

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com/
2. **Sign in** with your GitHub account
3. **Click "Add New Project"**
4. **Import your repository**:
   - Select "animasgpt/Izaugtmilestiba"
   - Click "Import"

5. **Configure Project**:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

6. **Environment Variables** (IMPORTANT):
   Add these environment variables in Vercel:
   ```
   DATABASE_URL=file:./dev.db
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```
   
   If you plan to use Stripe:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

7. **Click "Deploy"**

## Option 2: Deploy via CLI

```bash
vercel --prod
```

## Post-Deployment

After deployment:
1. Vercel will provide you with a URL (e.g., `https://izaugtmilestiba.vercel.app`)
2. Update the `NEXT_PUBLIC_APP_URL` environment variable with your actual URL
3. Redeploy if needed

## Troubleshooting

### Build Errors
- Check the build logs in Vercel dashboard
- Ensure all environment variables are set correctly
- The build should work now that Prisma has been removed from the build script

### Database Setup (Future)
When you're ready to add a real database:
1. Set up a PostgreSQL database (e.g., on Vercel Postgres, Supabase, or Railway)
2. Update `DATABASE_URL` in Vercel environment variables
3. Run migrations: `npm run prisma:migrate`
4. Redeploy

## Automatic Deployments

Vercel will automatically deploy:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Custom Domain (Optional)

To add a custom domain:
1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain and follow DNS configuration instructions
