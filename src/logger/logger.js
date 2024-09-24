import winston from "winston";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("colors");

const logConfiguration = {
  format: winston.format.combine(
    winston.format.colorize(), // aplica as cores
    winston.format.simple() // formata a saída
  ),
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.label({
      label: `[LOGGER]`,
    }),

    winston.format.timestamp({
      format: "DD-MMM-YYYY HH:mm:ss",
    }),

    winston.format.printf(
      (info) =>
        `${info.level.toLocaleUpperCase().yellow}: ${info.label.red}: ${[
          info.timestamp,
        ]}: ${info.message.green}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);
export default logger;
