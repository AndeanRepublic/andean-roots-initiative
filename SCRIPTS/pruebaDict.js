const D = { "132:0": "Desktop", "132:1": "Tablet", "132:2": "Mobile" };

const keys = Object.keys(D);
const values = Object.values(D);

// console.log(keys);
// console.log(values);

console.log(D["132:0"]);

Object.entries(D).forEach(([key, value]) => {
  console.log(value, key);
});
