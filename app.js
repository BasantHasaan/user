
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const { verifyToken, isAdmin } = require("./middleware/auth");
const cookieParser = require('cookie-parser')
const { mongoose } = require("./config/db.config");
const app = express();
// middleware
app.use(cors())
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(cookieParser())


// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

app.use(authRoutes);

app.use(verifyToken);
app.use("/user", usersRoutes);
app.use(isAdmin);
app.use("/users", usersRoutes);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});