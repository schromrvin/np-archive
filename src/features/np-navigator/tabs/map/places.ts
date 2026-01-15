export type Place = {
  id: string;
  name: string;
  aliases?: string[];
  // CRS.Simple coordinates: [y, x] (Leaflet uses LatLng order)
  point: [number, number];
  category: "block" | "food" | "facility" | "study";
};

export const PLACES: Place[] = [
  {
    id: "makan-place",
    name: "Makan Place (Blk 51)",
    aliases: ["makan place", "canteen", "food court", "blk 51 makan"],
    point: [1460, 930],
    category: "food",
  },
  {
    id: "library",
    name: "Library (Block 93)",
    aliases: ["block 93", "blk 93", "lib", "l3 library"],
    point: [820, 1180],
    category: "study",
  },
  {
    id: "munch",
    name: "Munch",
    aliases: ["Food court"],
    point: [1020, 820],
    category: "food",
  },
  {
    id: "potato-corner",
    name: "Potato Corner",
    aliases: ["Fries", "Food"],
    point: [1680, 1300],
    category: "food",
  },
];

// Quick search helper
export function findPlace(query: string): Place | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  // Exact / includes match over name+aliases
  const scored = PLACES.map((p) => {
    const hay = [p.name, ...(p.aliases ?? [])].join(" ").toLowerCase();
    let score = 0;
    if (p.name.toLowerCase() === q) score += 50;
    if (hay.includes(q)) score += 10;
    if (p.id.includes(q)) score += 5;
    return { p, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.p ?? null;
}

export function suggestPlaces(query: string, limit = 6): Place[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return PLACES.filter((p) => {
    const hay = [p.name, ...(p.aliases ?? [])].join(" ").toLowerCase();
    return hay.includes(q);
  }).slice(0, limit);
}
