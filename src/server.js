require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(require("./middlewares").setUser);

require("./routes")(app);

const port = process.env.PORT || 3001;
app.listen(port, () =>
    console.log(`\nServer is running on: http://localhost:${port}\n`)
);

const db = require("./database");
db.sync({ force: false });