export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ ok: true });
  }

  const body = req.body;

  console.log("New inquiry:", body);

  return res.status(201).json({
    ok: true,
    inquiry: body,
  });
}