import items from "./items.js";
let categories1 = [];
items.map((item) => {
  if (!categories1.includes(item.category)) categories1.push(item.category);
});

const categories = [];
categories1.map((c) => {
  let sort = [];
  items.map((i) => {
    if (i.category === c) {
      sort.push(i);
    }
  });
  const temp = {
    name: c,
  };
  categories.push(temp);
});

export default categories;
