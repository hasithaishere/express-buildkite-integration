const express = require('express');
const Config = require('./utils/Config');
const config = new Config();

const app = express();

// Middleware to handle the route
const myRouteHandler = async (req, res) => {
  const configVars = await config.loadEnvs();
  console.log(configVars)
  const mySecretValue = process.env.DB_HOST;
  res.send(`My secret value from Parameter Store: ${mySecretValue}`);
};

// Use the @middy/ssm middleware for this route
app.get('/myroute', myRouteHandler);

// Start the Express.js server
const port = 3000; // Change this to the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
