const inquiries = [];

export default async function handler(req, res) {
  const url = req.url || "";

  if (url.includes("/portfolio/images")) {
    return res.status(200).json([]);
  }

  if (url.includes("/inquiries")) {
    if (req.method === "POST") {
      inquiries.push({
        id: Date.now(),
        ...req.body,
        status: "new",
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({ ok: true });
    }

    if (req.method === "GET") {
      return res.status(200).json(inquiries);
    }

    return res.status(200).json({ ok: true });
  }

  if (url.includes("/site-settings")) {
    return res.status(200).json({});
  }

  if (url.includes("/google-reviews")) {
    return res.status(200).json([]);
  }

  return res.status(200).json({ ok: true });
}