import mongoose from "mongoose";
import logger from "../logger/logger.js";

const mongoPATH = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoPATH);
    logger.info("Conectado com sucesso!");
  } catch (err) {
    logger.error(`Erro: ${err}`);
  }
};

export default connectMongoDB;
