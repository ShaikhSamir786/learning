const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;


app.use(express.json());



// jwt configuration

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }


    res.status(201).json({ message: "User registered successfully" , username , password });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Here you would typically validate the user's credentials
  // For this example, we'll just return a token if the username is "username" and password is "pass"
  if (username === "username" && password === "password") {
    const token = jwt.sign({ username }, "my_jwt_secret", {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});



app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});