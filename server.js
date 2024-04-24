const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { log } = require("console");
// configuration

const myConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecovolt",
});
//test the connection
myConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database EcoVolt");
  }
});
//Query Method

const app = express();
//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/learning_Centre", (req, res) => {
  res.render("learningCentre.ejs");
});
app.get("/projects", (req, res) => {
  res.render("projects.ejs");
});
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
app.post("/signup", (req, res) => {
  if (req.body.password === req.body.confirmPass) {
    myConnection.query(
      `SELECT email FROM users WHERE email = "${req.body.email}"`,
      (sqlError, emailData) => {
        if (sqlError) {
          res.status(500).render("signup.ejs", {
            error: true,
            errMessage: "Server Error: Contact Admin if this persists .",
            prevInput: req.body,
          });
        } else {
          if (emailData.length > 0) {
            res.render("signup.ejs", {
              error: true,
              errMessage:
                "Email Already Registered. Login with email and password!",
              prevInput: req.body,
            });
          } else {
            let sqlStatement = `INSERT INTO users (name, email, phone, solar, wind, battery, other, message, password) VALUES ('${
              req.body.name
            }', '${req.body.email}', '${req.body.phone}', '${
              req.body.solar
            }', '${req.body.wind}', '${req.body.battery}', '${
              req.body.other
            }', '${req.body.message}', '${bcrypt.hashSync(
              req.body.password,
              5
            )}')`;

            myConnection.query(sqlStatement, (sqlErr) => {
              if (sqlErr) {
                res.status(500).render("signup.ejs", {
                  error: true,
                  errMessage:
                    "Server Error: Contact Admin if this persists.(Data Insertion Error)",
                  prevInput: req.body,
                });
              } else {
                res.status(304).redirect("/login?signupSuccess=true");
              }
            });
          }
        }
      }
    );
  } else {
    res.render("signup.ejs", {
      error: true,
      errMessage: "password and confirm password do not match!",
      prevInput: req.body,
    });
  }
});

app.post("/login", (req, res) => {
  const loginStatement = `SELECT *FROM users WHERE email = '${req.body.email}'`;
  myConnection.query(loginStatement, (sqlErr, userData) => {
    if (sqlErr) {
      console.log(sqlErr.message);
      res.status(500).render("login.ejs", {
        error: true,
        message: "Server Error, Contact Admin if this persists!",
        prevInput: req.body,
      });
    } else {
      console.log(userData);
      if (userData.length == 0) {
        res.status(401).render("login.ejs", {
          error: true,
          message: "Email or Password Invalid",
          prevInput: req.body,
        });
      } else {
        if (bcrypt.compareSync(req.body.password, userData[0].password)) {
          // create a session
          // res.cookie("email",userData[0].email, {maxAge: 60} )
          req.session.user = userData[0];
          // Check if this was a redirection , send back the person to where they were
          // Check if there is a cookie , we can call this cookie a redirect history
          if (req.cookies.redirectHistory) {
            let redirectPath = req.cookies.redirectHistory;
            res.clearCookie("redirectHistory");
            res.redirect(redirectPath);
          } else {
            res.redirect("/");
          }
        } else {
          res.status(401).render("login.ejs", {
            error: true,
            message: "Email or Password Invalid",
            prevInput: req.body,
          });
        }
      }
    }
  });
});
app.get("/login", (req, res) => {
  if (req.query.signupSuccess) {
    res.render("login.ejs", {
      message: "Signup successful!! You can now log in.",
    });
  } else if (req.query.message) {
    res.render("login.ejs", { message: "login to get a quote." });
  } else {
    res.render("login.ejs");
  }
});
app.get("/test", (req, res) => {
  res.render("test.ejs");
});
app.get("/shop", (req, res) => {
  res.render("shop.ejs");
});
app.get("/Quote", (req, res) => {
  let sql = "SELECT * FROM Quotes";
  myConnection.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.render("quote.ejs", { data: data });
    }
  });
});
app.get("/quotes/:quoteID", (req, res) => {
  let id = req.params.quoteID;
  let sql = `SELECT * FROM Projects WHERE quote_id = ${id}`;
  myConnection.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.render("getquote.ejs", { data: data });
    }
  });
});
app.post("/quotes/1", (req, res) => {
  const { name, email, phone, project, payment_method } = req.body;

  const sql = `SELECT Estimated_cost FROM Projects WHERE Project_Id = ?`;
  myConnection.query(sql, [project], (err, result) => {
    if (err) {
      console.error("Error fetching estimated cost:", err);
      res.status(500).send("Error fetching estimated cost");
    } else {
      const estimatedCost = result[0].Estimated_cost;

      const insertBookingQuery = `INSERT INTO Bookings (email, Project_Id, payment_method, booking_status, estimatedCost, name) VALUES (?, ?, ?, ?, ?, ?)`;
      myConnection.query(
        insertBookingQuery,
        [email, project, payment_method, "checkedIn", estimatedCost, name],
        (err, result) => {
          if (err) {
            console.error("Error inserting booking data:", err);
            res.status(500).send("Error inserting booking data");
          } else {
            console.log("Booking data inserted successfully");
            res.redirect("/"); // Redirect to a success page
          }
        }
      );
    }
  });
});

// app.get("/get-estimated-cost/:projectId", (req, res) => {
//   const projectId = req.params.projectId;

//   // Query the database to fetch the estimated cost for the selected project
//   const sql = `SELECT Estimated_cost FROM Projects WHERE Project_Id = ?`;
//   myConnection.query(sql, [projectId], (err, result) => {
//     if (err) {
//       console.error("Error fetching estimated cost:", err);
//       res.status(500).json({ error: "Error fetching estimated cost" });
//     } else {
//       // Return the estimated cost as JSON response
//       res.json({ estimatedCost: result[0].Estimated_cost });
//     }
//   });
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
