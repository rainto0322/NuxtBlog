import mongoose from "mongoose";
import { consola } from "consola";

export default defineNitroPlugin(async (nitroApp) => {
  try {
    consola.start('🤔 Connecting to MongoDB ...')
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: process.env.MONGODB_NAME || "blog"
    }).then(() => {
      consola.success('😄 Successfully connected to MongoDB')
    })
  } catch (err) {
    consola.error(`Error connecting to MongoDB: ${err}`)
  }
})
