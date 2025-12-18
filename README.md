# Firebase Api (Vercel Serverless Function)

This is a REST API proxy deployed on Vercel that allows you to interact with a Firebase Realtime Database via standard HTTP GET requests. This is useful for environments that have trouble with the Firebase SDK or need a simple URL-based bridge.

## 📍 Deployment URL
`https://your-project-name.vercel.app/api/your-file-name`

---

## 🛠 Usage & Parameters

All requests are sent via **GET**, and the operation is determined by the `action` query parameter.

| Parameter | Required | Description |
| :--- | :--- | :--- |
| `url` | **Yes** | Your Firebase Realtime DB URL (e.g., `https://name.firebaseio.com`) |
| `path` | **Yes** | The database path (e.g., `users/1`) |
| `action` | **Yes** | The operation: `get`, `add`, `put`, `edit`, `delete` |
| `data` | No | Required for `add`, `put`, `edit`. Must be a **URL-encoded JSON string**. |

---

## 🚀 Examples

### 1. Fetch Data (`get`)
`GET`
```text
https://your-app.vercel.app/api/proxy?action=get&url=https://db.firebaseio.com&path=users/admin
```

### 2. Add to a List (`add`)
Equivalent to Firebase `.push()`. Creates a unique ID automatically.
`GET`
```text
https://your-app.vercel.app/api/proxy?action=add&url=https://db.firebaseio.com&path=logs&data={"msg":"Login Success"}
```

### 3. Overwrite Data (`put`)
`GET`
```text
https://your-app.vercel.app/api/action=put&url=https://db.firebaseio.com&path=status&data="online"
```

### 4. Update Specific Fields (`edit`)
Equivalent to Firebase `.update()`.
`GET`
```text
https://your-app.vercel.app/api/action=edit&url=https://db.firebaseio.com&path=users/1&data={"lastSeen":"12:00"}
```

### 5. Remove Data (`delete`)
`GET`
```text
https://your-app.vercel.app/api/action=delete&url=https://db.firebaseio.com&path=temp_data
```

---

## 📦 Local Setup & Deployment

1. **Clone your repository**
2. **Install dependencies**:
   ```bash
   npm install node-fetch@2
   ```
   *(Note: Use node-fetch@2 for CommonJS `require` support in Node.js)*
3. **Project Structure**:
   ```text
   project/
   ├── api/
   │   └── index.js  <-- (Your code goes here)
   ├── package.json
   └── vercel.json
   ```
4. **Deploy**:
   ```bash
   vercel --prod
   ```

## 🔒 Security Warning
**Important:** Your current code allows *anyone* who knows your Vercel URL to read or delete data from *any* Firebase database if they have the URL. 

To secure this:
1. Ensure your **Firebase Realtime Database Rules** are set correctly.
2. Consider adding an API Key check in your code:
   ```javascript
   if (req.query.key !== "MY_SECRET_PASSWORD") return res.status(401).send("Unauthorized");
   ```
3. Use `encodeURIComponent()` when passing JSON data in the `data` parameter to avoid breaking the URL.

## 📄 Response Format
All responses return a JSON object:
```json
{
  "success": true,
  "result": { ... firebase_data ... }
}
```
