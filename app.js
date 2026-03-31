import express from "express";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log("Server on in http://localhost:" + PORT);
});
