const inquiries = [];

const categories = [
  { label: "Model Portfolio", folder: "model", count: 29 },
  { label: "Event", folder: "events", count: 27 },
  { label: "Fashion & E-Commerce", folder: "fashion", count: 46 },
  { label: "Club", folder: "club", count: 59 },
  { label: "Portraits", folder: "portraits", count: 12 },
];

const portfolioImages = categories.flatMap(({ label, folder, count }) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${folder}-${i + 1}`,
    imagePath: `${folder}/${i + 1}.webp`,
    category: label,
    src: `/assets/images/${folder}/${i + 1}.webp`,
    staticSrc: `/assets/images/${folder}/${i + 1}.webp`,
    customTitle: `${label} ${i + 1}`,
    caption: null,
    hidden: false,
    sortOrder: i + 1,
    overrideId: null,
  })),
);

export default async function handler(req, res) {
  const url = req.url || "";

  if (url.includes("/portfolio/images")) {
    return res.status(200).json(portfolioImages);
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