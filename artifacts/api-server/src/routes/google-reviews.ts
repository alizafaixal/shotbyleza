import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/google-reviews", async (req: Request, res: Response) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  let placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey) {
    res.status(503).json({
      configured: false,
      error: "GOOGLE_PLACES_API_KEY not set in Replit Secrets.",
    });
    return;
  }

  try {
    // Auto-discover Place ID from text search if env var not set
    if (!placeId) {
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=shotbyleza+photographer+Sydney+NSW&key=${apiKey}`;
      const searchRes = await fetch(searchUrl);
      const searchData = (await searchRes.json()) as { results?: { place_id: string }[] };
      if (searchData.results?.[0]?.place_id) {
        placeId = searchData.results[0].place_id;
      } else {
        res.status(404).json({
          configured: true,
          error: "Business not found via text search. Set GOOGLE_PLACE_ID in Replit Secrets.",
        });
        return;
      }
    }

    // Fetch place details including up to 5 reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&reviews_sort=newest&key=${apiKey}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = (await detailsRes.json()) as {
      status: string;
      result?: {
        name: string;
        rating: number;
        user_ratings_total: number;
        reviews?: {
          author_name: string;
          rating: number;
          text: string;
          relative_time_description: string;
          profile_photo_url?: string;
        }[];
      };
    };

    if (detailsData.status !== "OK") {
      res.status(500).json({
        configured: true,
        error: `Places API error: ${detailsData.status}`,
      });
      return;
    }

    const place = detailsData.result!;
    res.json({
      configured: true,
      placeId,
      businessName: place.name,
      rating: place.rating,
      totalReviews: place.user_ratings_total,
      reviews: (place.reviews ?? []).map((r) => ({
        name: r.author_name,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
        photoUrl: r.profile_photo_url,
      })),
      note: "Google Places API returns a maximum of 5 reviews (most relevant only — not all reviews).",
    });
  } catch (err) {
    res.status(500).json({
      configured: true,
      error: "Failed to fetch from Google Places API.",
    });
  }
});

export default router;
