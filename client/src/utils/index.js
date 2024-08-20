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

export function mapResponseDataToKeys(data) {
  if (data.length === 0) {
    return "No results";
  }
  let k = Object.keys(data[0]);
  return data.map((obj) => {
    let r = {};
    k.forEach((key) => {
      r[key] = obj[key];
    })
    return r;
  });
}

export function mapSingleResponseDataToKeys(d) {
  let k = Object.keys(d);
  let r = {};
  k.forEach((key) => {
    r[key] = d[key];
  })
  return r;
}