import app from "./app"

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;  // Export the server for graceful shutdown (optional)
