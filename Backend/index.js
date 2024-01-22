require("dotenv").config();

const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection MongoDB
mongoose.connect(
  "mongodb+srv://p2w:133713371337@cluster0.4jcmvmw.mongodb.net/pay2win"
);

// API

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image Storage

const storage = multer.diskStorage({
  destination: "./upload/img",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Upload img endpoint
app.use("/img", express.static("upload/img"));
app.post("/upload", upload.single("games"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/img/${req.file.filename}`,
  });
});

// Creating Product Schema

const PriceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  price: [PriceSchema],
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  // Automated Generated id +1
  let products = await Product.find({});
  let id;

  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1; // Increment the id property
  } else {
    id = 1;
  }

  const prices = req.body.price.map((price) => ({
    name: price.name,
    value: price.value,
  }));

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    price: prices,
  });

  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Delete Products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Data Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// GET all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetch");
  res.status(200).send(products);
});

// Endpoint All Product by ID
app.get("/allproducts/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const game = await Product.findOne({ id: productId });

    if (!game) {
      return res.status(404).json({ error: "Game tidak ada" });
    }

    res.json(game);
  } catch (error) {
    console.error("Error fetching game detail:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

// User Schema
const Users = mongoose.model("Users", {
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  access_token: {
    type: String,
  },
});

// User Endpoint
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({
    username: req.body.username,
  });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "User telah terdaftar!" });
  }

  const user = new Users({
    username: req.body.username,
    password: req.body.password,
    date: req.body.date,
  });

  await user.save();
  console.log(user);
  res.json({ success: req.body.username });
});

// Login endpoint

app.post("/signin", async (req, res) => {
  let user = await Users.findOne({ username: req.body.username });
  if (user) {
    const passwordCheck = req.body.password === user.password;
    if (passwordCheck) {
      const token = jwt.sign({ username: req.body.username }, "secret_ecom");
      res
        .status(201)
        .json({ username: req.body.username, access_token: token });
    } else {
      res.status(401).json({ errors: "Password Salah" });
    }
  } else {
    res.status(401).json({ errors: "Email Salah atau belum terdaftar" });
  }
});

// Payment Scheme
function generateRandomOrderId() {
  const min = 100000; // Angka terkecil dengan 6 digit
  const max = 999999; // Angka terbesar dengan 6 digit
  const randomOrderId = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomOrderId.toString();
}

const Payment = mongoose.model("Payment", {
  order_id: {
    type: Number,
  },
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  orders: {
    type: String,
  },
  pay_amount: {
    type: Number,
  },
  userId: {
    type: String,
  },
  payment_method: {
    type: String,
  },
});

app.post("/payment", async (req, res) => {
  const { name, category, orders, pay_amount, userId, payment_method } =
    req.body;

  if (
    !name ||
    !category ||
    !orders ||
    !pay_amount ||
    !userId ||
    !payment_method
  ) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  const newPayment = new Payment({
    order_id: generateRandomOrderId(),
    name,
    category,
    orders,
    pay_amount,
    userId,
    payment_method,
  });

  try {
    await newPayment.save();
    const orderId = newPayment.order_id;

    res.status(201).json({
      message: "Pembayaran berhasil disimpan",
      order_id: orderId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menyimpan pembayaran" });
  }
});

app.get("/payment/:order_id", async (req, res) => {
  const orderId = Number(req.params.order_id, 10);

  if (isNaN(orderId)) {
    return res.status(400).json({ error: "Invalid order_id" });
  }

  try {
    const order = await Payment.findOne({ order_id: orderId });

    if (!order) {
      return res.status(404).json({ Error: "Order ID Tidak ditemukan" });
    }

    res.json(order);
  } catch (error) {
    console.log("Error Fetching order id:", error);
    res.status(500).json({ error: "Terjadi Kesalahan pada server" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running in port" + port);
  } else console.log("Server Error : " + error);
});
