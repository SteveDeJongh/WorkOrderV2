export function CapitalizeFullName(name) {
  return name
    .split(" ")
    .map((p) => p[0].toUpperCase() + p.slice(1, p.length).toLowerCase())
    .join(" ");
}

export function snakeCase(val) {
  return val.split('').map((c) => {
    if (c === c.toUpperCase()) {
      return `_${c.toLowerCase()}`;
    } else {
      return c;
    }
  }).join('');
}