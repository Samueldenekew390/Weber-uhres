I’m organizing setup instructions for a MongoDB cluster, collections, and connection string retrieval.

Created 2 todos

## MongoDB setup for this project

This app uses MongoDB, not SQL. So instead of tables, you create:
- one database
- collections
- documents with fields

---

## 1. Create a MongoDB Atlas cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new project
4. Build a free cluster:
   - Cloud provider: AWS / GCP / Azure
   - Region: choose one near you
   - Tier: `M0 Sandbox` is free
5. Wait for the cluster to finish provisioning

---

## 2. Create database and collections

After cluster is ready:

### Option A: Atlas UI
1. Open your cluster
2. Click `Browse Collections`
3. Click `Create Database`
4. Set:
   - Database name: `weber_uhrenservice`
   - Collection name: `settings`
5. Then create additional collections:
   - `services`
   - `bookings`

### Option B: `mongosh` shell
If you have `mongosh` installed, connect with your Atlas URI and run:

```js
use weber_uhrenservice
db.createCollection("settings")
db.createCollection("services")
db.createCollection("bookings")
```

---

## 3. Insert initial documents

### `settings`
This is required for admin and app defaults:

```js
use weber_uhrenservice

db.settings.insertOne({
  logoUrl: "/logo.svg",
  imgbbApiKey: "",
  enableDemoMode: true,
  adminEmail: "darbas11@gmail.com",
  businessName: "Weber Uhrenservice",
  phone: "+4915218263006",
  email: "darbas11@gmail.com",
  passwordHash: "admin123",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### `services`
Example service documents:

```js
db.services.insertMany([
  {
    id: "service-1",
    title: "Uhrenreparatur / Watch Repair",
    description: "Professionelle Reparatur und Instandsetzung mechanischer Uhrwerke sowie Quarz-Kaliber von Schweizer und deutschen Manufakturen.",
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 1
  },
  {
    id: "service-2",
    title: "Uhrenservice & Wartung / Watch Service",
    description: "Komplette Revision, Ultraschall-Gehäuseaufbereitung, Dichtigkeitsprüfung und Prüfung der Ganggenauigkeit nach Herstellernormen.",
    imageUrl: "https://images.unsplash.com/photo-1547996169-4284591fe50d?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 2
  }
])
```

### `bookings`
Example booking document:

```js
db.bookings.insertOne({
  id: "WEBER-2026-101",
  fullName: "Dr. Florian Schmidt",
  email: "florian.schmidt@example.de",
  phone: "+49 170 1234567",
  preferredDate: "2026-08-15",
  preferredTime: "10:30",
  service: "Uhrenservice & Wartung / Watch Service",
  message: "Rolex Submariner Date – Revision und Überprüfung der Wasserdichtigkeit.",
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## 4. Get your MongoDB connection string

In Atlas:
1. Go to your cluster
2. Click `Connect`
3. Choose `Connect your application`
4. Copy the connection string like:

```
mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/weber_uhrenservice?retryWrites=true&w=majority
```

Replace:
- `<username>` with your database user
- `<password>` with that user’s password

---

## 5. Add env variables to .env.local

In your project .env.local, set:

```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/weber_uhrenservice?retryWrites=true&w=majority"
MONGODB_DB="weber_uhrenservice"
IMGBB_API_KEY="your-imgbb-key"
GEMINI_API_KEY="your-gemini-key"
APP_URL="http://localhost:5173"
ADMIN_PASSWORD="your-admin-password"
```

> `MONGODB_URI` is the only required one for the backend API to work.

---

## 6. API key vs MongoDB key

- MongoDB does not use a single “API key” in this app.
- You use a connection string with a username/password.
- In Atlas, that is created under:
  - `Database Access` → `Create New Database User`

---

## 7. If you want SQL-style commands

MongoDB is document-based, so use JSON-style commands like the ones above instead of SQL.

If you want something closer to SQL, use these MongoDB shell equivalents:

```js
use weber_uhrenservice
show collections
db.settings.find()
db.services.find()
db.bookings.find()
```

---

## Recap

Required collection names:
- `settings`
- `services`
- `bookings`

Required fields:
- `settings`: `logoUrl`, `imgbbApiKey`, `enableDemoMode`, `adminEmail`, `businessName`, `phone`, `email`, `passwordHash`
- `services`: `id`, `title`, `description`, `imageUrl`, `createdAt`, `updatedAt`, `order`
- `bookings`: `id`, `fullName`, `email`, `phone`, `preferredDate`, `preferredTime`, `service`, `message`, `status`, `createdAt`, `updatedAt`

If you want, I can now give you a ready-to-run Atlas step-by-step with exact clicks and values.