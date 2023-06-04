import bcrypt from "bcryptjs";
const today = new Date();

const users = [
  {
    fullname: "Admin user",
    email: "admin@mail.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
    isBarista: true,
    isClient: true,
    isVipClient: true,
    numberOfCups: 0,
    VIPdate: today,
  },
  {
    fullname: "Maor Tal",
    email: "maor@mail.com",
    password: bcrypt.hashSync("12345678", 10),
    isBarista: true,
    isClient: true,
    isVipClient: true,
    numberOfCups: 0,
    VIPdate: today,
  },
  {
    fullname: "Ben Linder",
    email: "ben@mail.com",
    password: bcrypt.hashSync("12345678", 10),
    isClient: true,
    isVipClient: true,

    VIPdate: today,
  },
  {
    fullname: "Eran Grady",
    email: "eran@mail.com",
    password: bcrypt.hashSync("12345678", 10),
    isClient: true,
  },
];

export default users;
