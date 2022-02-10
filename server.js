require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Admin = require("./models/admin");
const Distribution = require("./models/distribution");
const FoodItem = require("./models/foodItem");
const Student = require("./models/student");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/yoodaHostel")
  .then(() => {
    console.log("Database has been connect");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Data base is running");
});

// Get All Admin

app.get("/admin", (req, res) => {
  Admin.find().then((result) => {
    res.send({
      message: "Get All Admin Data",
      data: result,
    });
  });
});

// Insert Admin
app.post("/admin", (req, res) => {
  Admin.create(req.body)
    .then((result) => {
      res.send({
        message: "Admin Create Successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
});

/**
 * @Title : Login System
 *
 */

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  Admin.findOne({ email: email, password: password })
    .then((result) => {
      if (result === null) {
        res.send({
          error: "error Ocers",
        });
      } else {
        const { name, email, role } = result;
        jwt.sign(
          { name: name, email: email, role: role },
          process.env.JWT_SECRATE,
          function (err, token) {
            if (token) {
              res.send({
                message: "Login successfully",
                token: token,
              });
            } else {
              res.send({
                error: err.message,
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.send({
        error: error.message,
      });
    });
});

/**
 * @Title:  Get All Food Item data
 */

app.get("/food", (req, res) => {
  FoodItem.paginate({}, { page: req.query.page, limit: 5 })
    .then((result) => {
      res.send({
        message: "All Food Item",
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
});
/**
 * @Title:  Create A Food Item
 */

app.post("/food", async (req, res) => {
  try {
    const { token } = req.headers;
    const { email } = decode(token);

    await Admin.findOne({ email: email })

      .then((adminResult) => {
        if (adminResult && adminResult.role === "admin") {
          FoodItem.create(req.body)
            .then((dataResult) => {
              res.send({
                message: "Create Food Item data successfully",
                data: dataResult,
              });
            })
            .catch((error) => {
              res.send({
                error: error.message,
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          error: err.message,
        });
      });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
});

/**
 * @Title: Create A student
 */

app.get("/student", async (req, res) => {
  const { page } = req.query;
  await Student.paginate({}, { page: page, limit: 5 })
    .then((result) => {
      res.send({
        data: result,
      });
    })
    .catch((error) => {
      res.send({
        error: error.message,
      });
    });
});

/**
 * @Title: Get All Studnet Information
 *
 */

app.post("/student", async (req, res) => {
  try {
    const { token } = req.headers;
    const { email } = decode(token);
    await Admin.findOne({ email: email })
      .then(async (resAdmin) => {
        if (resAdmin && resAdmin.role === "admin") {
          await Student.create(req.body)
            .then((result) => {
              res.send({
                data: result,
                message: "Student Information post successfully",
              });
            })
            .catch((err) => {
              res.send({
                error: err.message,
              });
            });
        }
      })
      .catch((error) => {
        res.send({
          error: error.message,
        });
      });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
});

/**
 * @Student: Status update
 */
app.patch("/student/:id", async (req, res) => {
  try {
    const { token } = req.headers;
    const { email } = decode(token);
    const { id } = req.params;

    await Admin.findOne({ email: email }).then(async (adminRes) => {
      if (adminRes.role === "admin") {
        await Student.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              status: req.body.status,
            },
          },
          { new: true }
        )
          .then((result) => {
            res.send({
              message: "Status successfully update",
              data: result,
            });
          })
          .catch((error) => {
            res.send({
              error: error.message,
            });
          });
      }
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
});

/**
 *
 * @Title: Get Distribution Data
 *
 */

app.get("/distribution", async (req, res) => {
  await Distribution.find()
    .then((result) => {
      res.send({
        data: result,
        message: "Distribution All Data",
      });
    })
    .catch((error) => {
      res.send({
        error: error.message,
      });
    });
});

/**
 * @Title : Create Distritubtion info
 */

app.post("/distribution", async (req, res) => {
  await Admin.find(req.headers.email)
    .then(async (resAdmin) => {
      if (resAdmin && resAdmin.role === "admin") {
        await Distribution.create(req.body)
          .then((result) => {
            res.send({
              data: result,
              message: "Distribution information post successfully",
            });
          })
          .catch((error) => {
            res.send({
              error: error.message,
            });
          });
      }
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
