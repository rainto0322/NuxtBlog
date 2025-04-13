import mongoose from "mongoose";
import { consola } from "consola";
import { MONGODB_NAME, MONGODB_URL } from "@/config";
export default defineNitroPlugin(async (nitroApp) => {
  try {
    consola.start('🤔 Connecting to MongoDB ...')
    await mongoose.connect(MONGODB_URL, {
      dbName: MONGODB_NAME
    }).then(() => {
      consola.success('😄 Successfully connected to MongoDB')
    })
  } catch (err) {
    consola.error(`Error connecting to MongoDB: ${err}`)
  }
})
