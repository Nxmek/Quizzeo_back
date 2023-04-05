import cors from "cors";
import helmet from "helmet";
import express from "express";

const initMiddlewares = (app) => {
  // CORS
  const corsOrigin = "*";

  const corsOptions = {
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 3600,
  };

  app.use(cors(corsOptions));
  app.use(helmet());

  // parse requests of content-type - application/json
  app.use(express.json({ limit: "50mb" }));
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
};

export default initMiddlewares;
