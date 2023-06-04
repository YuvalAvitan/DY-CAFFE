// Node packages
import dotenv from "dotenv";
import colors from "colors";
// DB connection file
import connectDB from "./config/db.js";

// Initialize environment variables
dotenv.config();
// Initialize DB connection
connectDB();

// Data
import users from "./data/users.js";
import items from "./data/items.js";
import tables from "./data/tables.js";
import rooms from "./data/rooms.js";
import categories from "./data/categories.js";

// Models
import Users from "./models/Users.js";
import Item from "./models/Item.js";
import Tables from "./models/Tables.js";
import Rooms from "./models/Rooms.js";
import Orders from "./models/Orders.js";
import Categories from "./models/Categories.js";

const importData = async () => {
  try {
    await Users.deleteMany();
    await Item.deleteMany();
    await Tables.deleteMany();
    await Rooms.deleteMany();
    await Categories.deleteMany();

    await Users.insertMany(users);
    const createItems = await Item.insertMany(items);
    const initCategory = categories.map((c) => {
      const sort = [];

      createItems.map((i) => {
        if (i.category === c.name) {
          sort.push(i._id);
        }
      });

      return { ...c, items: sort };
    });
    await Categories.insertMany(initCategory);
    const createdTables = await Tables.insertMany(tables);
    const createdTableInside = [];
    const createdTableOutside = [];
    createdTables.map((table) => {
      if (table.Inside) {
        createdTableInside.push(table._id);
      } else {
        createdTableOutside.push(table._id);
      }
    });

    const initTables = rooms.map((room) => {
      if (room.Inside) {
        return { ...room, Tables: createdTableInside };
      }
      return { ...room, Tables: createdTableOutside };
    });

    await Rooms.insertMany(initTables);

    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error.message.red.inverse);
    process.exit(1);
  }
};

const destroyedData = async () => {
  try {
    await Users.deleteMany();
    await Item.deleteMany();
    await Tables.deleteMany();
    await Rooms.deleteMany();
    await Orders.deleteMany();
    await Categories.deleteMany();

    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error.message.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyedData();
} else {
  importData();
}
