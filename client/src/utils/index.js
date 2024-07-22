export function CapitalizeFullName(name) {
  return name
    .split(" ")
    .map((p) => p[0].toUpperCase() + p.slice(1, p.length).toLowerCase())
    .join(" ");
}