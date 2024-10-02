const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// JWT Strategy setup
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.userId },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use(passport.initialize());

// Login route (username/password authentication + JWT generation)
app.post("/log-in", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      return res.status(400).json({ message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user.id, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: "Login error", error: err.message });
  }
});

app.use("/", indexRouter);
app.use("/users", passport.authenticate('jwt', { session: false }), usersRouter);
app.use("/posts", passport.authenticate('jwt', { session: false }), postsRouter);

app.get("/protected-route", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.get("/log-out", (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" });
});

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
