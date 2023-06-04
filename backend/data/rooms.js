import tables from "./tables.js";
let inside = [];
let outside = [];
tables.map((table) => {
  if (table.Inside) {
    inside.push(table);
  } else {
    outside.push(table);
  }
});
const rooms = [
  {
    Tables: [...inside],
    isAvailable: true,
    Inside: true,
  },
  {
    Tables: [...outside],
    isAvailable: true,
    Inside: false,
  },
];

export default rooms;
