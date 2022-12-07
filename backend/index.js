const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const sessionStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const swaggerUi = require("swagger-ui-express");

const { sequelize, Sequelize } = require("./utils/database");
const { User } = require("./models/user");
const { Subject } = require("./models/subject");
const { Faculty } = require("./models/faculty");
const associations = require("./models/associations");

const ExpressError = require("./utils/ExpressError");

const userRoutes = require("./routes/user");
const subjectRoutes = require("./routes/subject");
const facultyRoutes = require("./routes/faculty");
const studentRoutes = require("./routes/student");
const attendanceRoutes = require("./routes/attendance");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const store = new sessionStore({
  db: sequelize,
});

const sessionConfig = {
  secret: "Ganpati Bappa Morya!",
  store: store,
  resave: false,
  proxy: true,
  saveUninitialized: true,
  cookie: {
    // httpOnly: true,
    // secure: true,     UNCOMMENT BEFORE DEPLOYMENT
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());
sequelize.sync({ force: true });
// sequelize.sync();

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function verify(username, password, done) {
      const user = await User.findOne({ where: { email: username } });
      if (user === null) {
        return done(null, false, {
          message: "User not found",
        });
      }
      console.log(user.passHash);
      bcrypt.compare(password, user.passHash, (err, res) => {
        if (err) {
          return done(err);
        }
        if (res === false) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        } else {
          return done(null, user);
        }
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user.id,
      username: user.fullname,
      role: user.role,
      email: user.email,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/users", userRoutes);
app.use("/subjects", subjectRoutes);
app.use("/faculty", facultyRoutes);
app.use("/student", studentRoutes);
app.use("/attend", attendanceRoutes);

const documentation = require("./documentation/swagger_output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(documentation));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (err.message == undefined) {
    err.message = "Something Went Wrong!";
  }
  res.status(statusCode).send(err.message);
});

app.listen(5000, () => {
  console.log("Listening on Port 5000");
});
