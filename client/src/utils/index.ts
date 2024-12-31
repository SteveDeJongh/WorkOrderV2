export function CapitalizeFullName(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0].toUpperCase() + p.slice(1, p.length).toLowerCase())
    .join(" ");
}

export function snakeCase(val: string): string {
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
    // return "No results";
    return [];
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

export function sumAProp(collection, prop, unlessOpts = {}) {
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

export const dateRegExp = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)

export function dateTimeFormatter(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: "short",
    timeZone: "Canada/Pacific"});
}

export function showAsDollarAmount(value: string | number): string {
  return `$${Number(value).toFixed(2)}`
}