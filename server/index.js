require("dotenv").config();
const port = process.env.PORT || 5000;

const path = require("path");
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
const forumRouter = require("./routes/forumRouter");
const materialRouter = require("./routes/materialRouter");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();   

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Permite credenciais (cookies, autenticação etc.)
  })
);
app.use(cookieParser());
app.use('/Public', express.static(path.join(__dirname, 'Public')));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

app.use("/api/user", authRouter);
app.use("/api/forum", forumRouter);
app.use("/api/materials", materialRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor escutando na porta ${port}!`));
