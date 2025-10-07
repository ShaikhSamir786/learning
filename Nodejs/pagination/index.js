const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());


const Dummy = [
  { "username": "alpha_user", "password": "Pass123!" },
  { "username": "beta_tester", "password": "Qwerty@456" },
  { "username": "gamma_dev", "password": "DevPass#789" },
  { "username": "delta_admin", "password": "Admin!2023" },
  { "username": "epsilon_mod", "password": "Mod$Secure1" },
  { "username": "zeta_guest", "password": "Guest*Login2" },
  { "username": "theta_api", "password": "ApiKey#007" },
  { "username": "iota_member", "password": "JoinUs!321" },
  { "username": "kappa_user", "password": "Kappa$456" },
  { "username": "lambda_test", "password": "Test@999" }
]


// Routes
app.get('/', (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const paginatedData = Dummy.slice(skip, skip + limit);
    
    res.send(JSON.stringify(paginatedData));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});