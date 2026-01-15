import { EDGES, NODES, type NodeId } from "./graph";

function dist(a: [number, number], b: [number, number]) {
  const dy = a[0] - b[0];
  const dx = a[1] - b[1];
  return Math.sqrt(dy * dy + dx * dx);
}

export function aStarRoute(start: NodeId, goal: NodeId): NodeId[] | null {
  const nodes = new Map(NODES.map((n) => [n.id, n]));
  const neighbors = new Map<NodeId, NodeId[]>();

  for (const e of EDGES) {
    if (!neighbors.has(e.from)) neighbors.set(e.from, []);
    if (!neighbors.has(e.to)) neighbors.set(e.to, []);
    neighbors.get(e.from)!.push(e.to);
    neighbors.get(e.to)!.push(e.from);
  }

  const open = new Set<NodeId>([start]);
  const cameFrom = new Map<NodeId, NodeId>();

  const gScore = new Map<NodeId, number>();
  const fScore = new Map<NodeId, number>();
  for (const id of nodes.keys()) {
    gScore.set(id, Infinity);
    fScore.set(id, Infinity);
  }

  gScore.set(start, 0);
  fScore.set(start, dist(nodes.get(start)!.point, nodes.get(goal)!.point));

  function lowestF(): NodeId {
    let best: NodeId = start;
    let bestVal = Infinity;
    for (const id of open) {
      const v = fScore.get(id)!;
      if (v < bestVal) {
        bestVal = v;
        best = id;
      }
    }
    return best;
  }

  while (open.size > 0) {
    const current = lowestF();
    if (current === goal) {
      // reconstruct
      const path: NodeId[] = [current];
      let cur = current;
      while (cameFrom.has(cur)) {
        cur = cameFrom.get(cur)!;
        path.push(cur);
      }
      path.reverse();
      return path;
    }

    open.delete(current);

    const curNode = nodes.get(current);
    if (!curNode) continue;

    for (const nb of neighbors.get(current) ?? []) {
      const nbNode = nodes.get(nb);
      if (!nbNode) continue;

      const tentative = gScore.get(current)! + dist(curNode.point, nbNode.point);
      if (tentative < gScore.get(nb)!) {
        cameFrom.set(nb, current);
        gScore.set(nb, tentative);
        fScore.set(nb, tentative + dist(nbNode.point, nodes.get(goal)!.point));
        open.add(nb);
      }
    }
  }

  return null;
}

export function routeToPoints(nodePath: NodeId[]): Array<[number, number]> {
  const nodeMap = new Map(NODES.map((n) => [n.id, n.point]));
  return nodePath.map((id) => nodeMap.get(id)!).filter(Boolean);
}

export function pathPixelLength(points: Array<[number, number]>): number {
  let sum = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    sum += Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
  }
  return sum;
}
