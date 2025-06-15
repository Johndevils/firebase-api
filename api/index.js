const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { url, action, path, data } = req.query;

  if (!url || !action || !path) {
    return res.status(400).json({ error: "Missing 'url', 'action', or 'path'" });
  }

  let firebaseUrl = `${url}/${path}.json`;

  try {
    let response;

    if (action === "put") {
      response = await fetch(firebaseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data || "{}"
      });
    } else if (action === "edit") {
      response = await fetch(firebaseUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: data || "{}"
      });
    } else if (action === "delete") {
      response = await fetch(firebaseUrl, {
        method: "DELETE"
      });
    } else if (action === "get") {
      response = await fetch(firebaseUrl);
    } else if (action === "add") {
      response = await fetch(firebaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data || "{}"
      });
    } else {
      return res.status(400).json({ error: "Invalid action. Use put, edit, delete, get, or add" });
    }

    const result = await response.json();
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: "Firebase request failed", details: err.message });
  }
};
