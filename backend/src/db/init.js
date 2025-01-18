import mongoose from "mongoose"

export function initDatabase() {
  mongoose.connection.on("open", () => {
    console.log(
      "Successfully connected to the database",
      process.env.DATABASE_URL
    )
  })

  return mongoose.connect(process.env.DATABASE_URL)
}
