import winston from "winston";
import config from "./index";

interface IPrintfData {
  level: string;
  message: string;
  timestamp?: string;
}

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.ENV === "DEV" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.ENV === "DEV"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message, timestamp }: IPrintfData) =>
        `${timestamp} :: ${level} :: ${message}`
    )
  ),
  transports: [
    config.ENV === "DEV" &&
      new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({ stderrLevels: ["error"] }),
  ].filter(Boolean) as winston.transport[],
});

export default logger;
