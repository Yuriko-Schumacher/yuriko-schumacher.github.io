export default function slugize(str) {
  return str.replace(" ", "-").toUpperCase();
}
