export default async function handler(req, res) {
    const apiKey = process.env.FOURSQUARE_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Missing FOURSQUARE_API_KEY" });
    }

    const qs = new URLSearchParams(req.query).toString();
    const url = `https://places-api.foursquare.com/places/search?${qs}`;

    try {
        const fsqRes = await fetch(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
                "X-Places-Api-Version": "2025-06-17",
            },
        });
        const data = await fsqRes.json();
        res.status(fsqRes.status).json(data);
    } catch (err) {
        res.status(502).json({ error: "Upstream request failed", detail: err.message });
    }
}