import { configDotenv } from "dotenv"
configDotenv()

import { initDatabase } from "./db/init.js"
import { app } from "./app.js"

try {
  await initDatabase()
} catch (err) {
  console.error(`Failed to connect to database:`, err.message)
  process.exit(1)
}

app.listen(process.env.PORT)

console.log(`Server listening on port ${process.env.PORT}`)
