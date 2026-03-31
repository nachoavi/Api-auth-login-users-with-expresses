import express from "express";
import { userRouter } from "./routes/usersRouter.js";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("Server on in http://localhost:" + PORT);
});
