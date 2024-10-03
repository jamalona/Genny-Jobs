const app = require("./app")

const PORT =  5001; //process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;  // Export the server for graceful shutdown (optional)
