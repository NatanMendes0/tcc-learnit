require("dotenv").config();
<<<<<<< HEAD
const port = process.env.PORT || 5000;

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const helmet = require("helmet");
const cors = require("cors");
dbConnect();

// ROUTES

const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
=======
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const forumRoutes = require("./routes/forum");
>>>>>>> forum

/* CORS */
const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error(
          "The CORS policy for this site does not allow access from the specified Origin."
        )
      );
    }
  },
  withCredentials: true,
};

<<<<<<< HEAD
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(helmet());

app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);

app.use(notFound);
app.use(errorHandler);
=======
// Routes
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
app.use("/forum", forumRoutes);

const port = process.env.PORT || 8080;
>>>>>>> forum

app.listen(port, () => console.log(`Servidor escutando na porta ${port}!`));
