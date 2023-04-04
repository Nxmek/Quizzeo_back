import escape from "validator/lib/escape.js";
import { log } from "../utils/logger.utils.js";
import { isString } from "../utils/string.utils.js";

export const sanitizeMiddleware = (req, res, next) => {
  const keys = Object.keys(req.body);

  const sanitizedBody = keys.reduce(
    (tb, k) => ({
      ...tb,
      [k]: isString(req.body[k]) ? escape(req.body[k]) : req.body[k],
    }),
    {}
  );

  log(`sanitized body =`, sanitizedBody);

  req.body = { ...sanitizedBody };
  next();
};
