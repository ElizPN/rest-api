const express = require("express");
const path = require("path");
const app = express();
const { v4 } = require("uuid");

// to make folder client static
//__dirname - current directory
app.use(express.static(path.resolve(__dirname, "client")));

// our "database"
let CONTACTS = [
  { id: v4(), name: "Liza Romanova", value: "+46-76-747-85-07", marked: false },
];

// it is used for our request can work with JSON
app.use(express.json());

//create first url where we can get this data
app.get("/api/contacts", (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);
  }, 1000);
});

app.post("/api/contacts/", (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

app.delete("/api/contacts/:id", (req, res) => {
  CONTACTS = CONTACTS.filter((el) => el.id === req.params.id);
  res.status(200).json({ message: "contact is deleted" });
});

// * means any routs ( any get requests)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
app.listen(3000, () => {
  console.log("Server has been started on port 3000");
});
