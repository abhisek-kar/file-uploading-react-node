const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const dotenv = require("dotenv");

//port
let port = process.env.PORT || 8080;

//dotenv config
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

//endpoints
app.get("/", (req, res) => {
  res.send("hi");
});
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.body.name);
  console.log(req.file);
  res.status(201).json({
    message: "User Details Uploaded successfully",
  });
});

//listen
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
