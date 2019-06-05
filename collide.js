// ax, ay = coordinates of center of first circle
// ar = radius of first circle
// bx, by = coordinates of center of second circle
// br = radius of second circle
function collideCircles(ax, ay, ar, bx, by, br) {
  const distX = bx - ax;
  const distY = by - ay;
  return distX * distX + distY * distY < (ar + br) * (ar + br);
}

function collideRects(ax, ay, aw, ah, bx, by, bw, bh) {
  if (ax + aw < bx || bx + bw < ax) return false;
  if (ay + ah < by || by + bh < ay) return false;
  return true;
}
