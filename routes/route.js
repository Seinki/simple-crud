import express from "express";
import {
  createUser,
  deletedUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deletedUser);

export default router;
