<!-- app.use("/test", (req, res) => {
   res.send(`Hello from test path`);
});

app.use("/hello", (req, res) => {
   res.send("Hello from hello path");
});

app.use("/", (req, res) => {
   res.send("Namaste");
});

 -->

<!-- 
- ORDER OF THE ROUTES MATTER A LOT.
- Explore routing and use ?, +, (), \* in the routes and use of regex.
- Reading queryParams and dynamic routes
- Should not use next at last route handler function as it throws error stating it need next route handler 
-->

<!--
// /abcd, ab?c, ab+c, a(bc)?d, regex
app.get("/user/:userId", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send({ firstName: "Adria", lastName: "Rae" });
}); -->

<!-- // // app.use("/user", [
// //   (req, res, next) => {
// //     console.log("Handling user route 1");
// //     next();
// //     res.send("Response");
// //   },
// //   (req, res) => {
// //     console.log("Handling user route 2");
// //     res.send("Response 2");
// //   },
// // ]);

// app.use("/admin", adminAuth);

// app.get("/user", (req, res) => {
//   return res.send("User data sent");
// });

// app.get("/admin/getAllData", (req, res) => {
//   // return res.send("Get all data");
//   throw new Error("dvgbg");
// });

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong");
//   }
// }); -->

<!--
// Go to MongoDB website
// Create a free M0 cluster
// Create a user
// Get the connection string
// Install MongoDB Compass
// Install Mongoose library
// Connect your application to the database "Connection-url/devTinder"
// Call the connectDB function and connect to database before starting the application
// Create a user schema
-->

<!--
// Difference between JS Object and JSON
// Explore mongoose documentation
// What are options in Model.findByIdAndUpdate and other methods as well
// API - Update the user with email ID
 -->

<!--
// Explore SchemaType options
// add required, unique, lowercase, trim
// add default
// create a custom validator for gender
// Improve DB schema - put appropriate validations
// Add timestamps
// Add API level validation
// DATA sanitization - apply validation for each field
// Install Validator from npm
// Explore validator library functions and use it for password, photoUrl
// NEVER TRUST REQ.BODY
 -->

<!--
// Validate signup data
// Install bcrypt library
// Create a hashed password using bcrypt and save the users with encrypted password

// Install cookie-parser
// send dummy cookie to user and read it
// In login API - create a jwt token
// Read the cookie inside profile API
// write userAuth middleware
// Add the userAuth  middleware to profile API and new sendConnection Request
// Set the expiry of jwt and cookies to 7 days
 -->

<!-- 
// Explore Tinder API
 -->