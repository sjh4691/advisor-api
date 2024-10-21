import express from "express";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const app = express();

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Advisor Dashboard API",
      version: "1.0.0",
      description: "API documentation for the Advisor Dashboard",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Advisor Dashboard API is running");
});

export default app;
