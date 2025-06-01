const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { url, action, path, data } = req.query;

  if (!url || !action || !path) {
    return res.status(400).json({ error: "Missing 'url', 'action', or 'path'" });
  }

  const firebaseUrl = `${url}/${path}.json`;

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
    } else {
      return res.status(400).json({ error: "Invalid action. Use put, edit, or delete" });
    }

    const result = await response.json();
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: "Firebase request failed", details: err.message });
  }
};
