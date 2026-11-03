import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./config/database.js";

const PORT = Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`MaterialDesk running on http://localhost:${PORT}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Application startup failed:", error.message);
    } else {
      console.error("unkown startup error : ", error);
    }

    process.exit(1);
  }
};

startServer();
