 ## Firebase REST API Gateway

A simple proxy to perform Firebase Realtime Database operations via URL parameters. Hosted on Vercel.

## 🔗 Base Endpoint
`https://firebase-api-azure.vercel.app/`

---

## 🛠 API Parameters

| Param | Required | Description |
| :--- | :--- | :--- |
| `url` | **Yes** | Your Firebase URL (e.g. `https://name.firebaseio.com`) |
| `action` | **Yes** | Operation: `get`, `add`, `put`, `edit`, `delete` |
| `path` | **Yes** | Database path (e.g. `users` or `posts/123`) |
| `data` | No | JSON data (required for `add`, `put`, `edit`) |

---

## 📮 Usage Examples

### 1. Add Data (POST/Push)
Equivalent to `push()`. Creates a unique auto-ID.
```text
https://firebase-api-azure.vercel.app/?url=https://test.firebaseio.com&action=add&path=users&data={"name":"John","age":25}
```

### 2. Get Data (GET)
```text
https://firebase-api-azure.vercel.app/?url=https://test.firebaseio.com&action=get&path=users
```

### 3. Overwrite Data (PUT)
```text
https://firebase-api-azure.vercel.app/?url=https://test.firebaseio.com&action=put&path=settings/theme&data="dark"
```

### 4. Update Specific Fields (PATCH)
```text
https://firebase-api-azure.vercel.app/?url=https://test.firebaseio.com&action=edit&path=users/id1&data={"status":"active"}
```

### 5. Delete Data (DELETE)
```text
https://firebase-api-azure.vercel.app/?url=https://test.firebaseio.com&action=delete&path=users/id1
```

---

## 📝 Response Format
```json
{
  "success": true,
  "result": {
    "name": "-N123456789",
    "status": "active"
  }
}
```

## ⚠️ Security Warning
Note: This API is open. To protect your data, ensure your **Firebase Realtime Database Rules** are locked down or add a `key` parameter to this script to authorize requests.
