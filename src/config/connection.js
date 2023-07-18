import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/assignment_5");
    console.log("Database connected:", mongoose.connections[0].name);
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};
