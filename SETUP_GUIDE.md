# Setup Guide - Thai Amulet Identifier

## Quick Start (Development)

### 1. Clone Repository
```bash
git clone https://github.com/kyoleow/amuletscan
cd amuletscan
npm install
```

### 2. Get API Keys

#### Google Gemini API
1. Go to [Google AI Studio](https://ai.google.dev)
2. Click "Get API Key"
3. Create new project or select existing
4. Copy API key

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project (name: "amulet-scan")
3. Enable Firestore Database (start in test mode for MVP)
4. Go to Project Settings → Service Accounts
5. Copy project credentials

### 3. Environment Configuration
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=paste_your_gemini_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Production Deployment (Vercel)

### Prerequisites
- GitHub account with amuletscan repo pushed
- Vercel account (free tier)

### 1. Deploy to Vercel
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 2. Configure Environment Variables in Vercel
In [Vercel Dashboard](https://vercel.com):
1. Go to Settings → Environment Variables
2. Add all `NEXT_PUBLIC_*` variables
3. Set for Production environment

### 3. Verify Deployment
- Check live URL provided by Vercel
- Test camera capture
- Test image upload
- Verify AI identification works

---

## Firestore Security Rules (Production)

Replace default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /feedback/{document=**} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

This allows anonymous feedback writes but prevents reads/deletes.

---

## Testing the App

### Camera Capture Flow
1. Click "Open Camera"
2. Allow camera permissions (browser prompt)
3. Point at amulet
4. Click "Capture"
5. Wait for Gemini analysis

### Image Upload Flow
1. Click upload area
2. Select amulet image file
3. Wait for Gemini analysis

### Results Workflow
1. View AI results
2. (Optional) Click "Edit Fields" to amend
3. Click feedback buttons (👍/👎)
4. Click "Identify Another Amulet" for new session

---

## Troubleshooting

### "Camera permission denied"
- Check browser camera permissions
- Try different browser (Chrome works best)
- Must use HTTPS or localhost for camera access

### "Gemini API not working"
- Verify API key in `.env.local`
- Check Gemini quota in Google Cloud Console
- Ensure image is valid (not corrupted)

### "Firebase connection error"
- Verify Firebase project credentials
- Check Firestore is enabled in project
- Ensure Firestore location matches region

### "Build fails locally"
- Delete `node_modules` and `.next`
- Run `npm install` again
- Check TypeScript types: `npm run build`

---

## API Rate Limits

**Gemini:**
- Free tier: 60 calls/minute
- Production: Upgrade to paid if needed

**Firebase:**
- Free tier: 20k read/day, 10k write/day
- Suitable for MVP (~100-200 daily users)

**Vercel:**
- Included with free tier
- Auto-scales, no setup needed

---

## Monitoring & Analytics

### Firebase Firestore Console
- Monitor feedback submissions in real-time
- Check document counts and storage usage

### Vercel Analytics
- Dashboard → Analytics tab
- Monitor deployment health
- View error logs

---

## Next Steps (Phase 2)

- [ ] Capacitor integration for iOS/Android
- [ ] Play Store submission
- [ ] User authentication
- [ ] Amulet history tracking
- [ ] Search & filter interface
- [ ] Temple location database

---

**Questions?** Check GitHub Issues or contact support.
