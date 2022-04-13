//IMPORTING ALL THE PACKAGES REQUIRED


const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


////////// USED FOR CONNECTING BACKEND (NODE JS) TO THE DATABASE (MONGO DB) ------------

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

///////////// TILL HERE----------------



//////// USED FOR UPLOADING PICTURES (USING MULTER LIBRARY) [SEARCH FOR MULTER ON GOOGLE]

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


////////// TILL HERE -=-----------


//////FOR USING ALL THE DIFFERENT ROUTES WE HAVE CREATED
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


/////JUST TO CONSOLE LOG THAT THE SERVER IS RUNNING
app.listen("5000", () => {
  console.log("Backend is running.");
});
