export type NodeId = string;

export type Node = {
  id: NodeId;
  point: [number, number]; // [y, x]
};

export type Edge = {
  from: NodeId;
  to: NodeId;
};

export const NODES: Node[] = [
  { id: "you", point: [1500, 600] },        // default user position (demo)
  { id: "junction-a", point: [1400, 760] },
  { id: "junction-b", point: [1220, 900] },
  { id: "junction-c", point: [980, 1040] },
  { id: "junction-d", point: [860, 1160] },

  // Place anchors (connect to graph)
  { id: "p-block-51", point: [1400, 960] },
  { id: "p-makan-place", point: [1460, 930] },
  { id: "p-library", point: [820, 1180] },
  { id: "p-munch", point: [1020, 820] },
  { id: "p-gym", point: [1680, 1300] },
];

export const EDGES: Edge[] = [
  { from: "you", to: "junction-a" },
  { from: "junction-a", to: "junction-b" },
  { from: "junction-b", to: "junction-c" },
  { from: "junction-c", to: "junction-d" },
  { from: "junction-d", to: "p-library" },

  { from: "junction-b", to: "p-munch" },
  { from: "junction-b", to: "p-block-51" },
  { from: "p-block-51", to: "p-makan-place" },

  // a “longer” path to gym (demo)
  { from: "p-block-51", to: "p-gym" },
];

// Helper: map PlaceId -> NodeId in this graph
export const PLACE_TO_NODE: Record<string, NodeId> = {
  "block-51": "p-block-51",
  "makan-place": "p-makan-place",
  library: "p-library",
  munch: "p-munch",
  gym: "p-gym",
};
