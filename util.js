// ax, ay = coordinates of center of first circle
// ar = radius of first circle
// bx, by = coordinates of center of second circle
// br = radius of second circle
function collideCircles(ax, ay, ar, bx, by, br) {
  const distX = bx - ax;
  const distY = by - ay;
  return distX * distX + distY * distY < (ar + br) * (ar + br);
}
