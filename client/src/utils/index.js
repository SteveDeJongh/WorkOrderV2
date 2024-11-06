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

export function formDataLogger(formData) {
  formData.entries().forEach((pair) => {
    console.log("key", pair[0]);
    console.log("value", pair[1]);
  })
}

export function sumAProp(collection, prop, unlessOpts) {
  return collection.reduce((acc, x) => {
    if (unlessOpts) {
      let ok = true;
      Object.entries(unlessOpts).forEach(([k, v]) => {
        if(x[k] == v) {
          ok = false;
        }
      })
      return ok ? acc + parseFloat(x[prop]) : acc;
    } else {
      return acc + parseFloat(x[prop])
    }
  }, 0.0)
}