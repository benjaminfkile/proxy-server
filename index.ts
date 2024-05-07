import dotenv from "dotenv";
import app from "./src/app"; // Adjust the path as necessary to correctly import `app`

// Configuring dotenv
dotenv.config();

// Getting the PORT from environment variables
const PORT = process.env.PORT || 8000; // Default to 8000 if PORT is not provided in the environment

// Starting the server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
