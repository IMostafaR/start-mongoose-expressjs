import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import { db } from "./config/connection.js";

export const router = (app, express) => {
  db();
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("*", (_, res) =>
    res.json({ status: "failed", message: "invalid routing" })
  );
};
