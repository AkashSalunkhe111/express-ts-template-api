import { Router } from "express";
import { postExpense, getAllExpense, getExpense } from "../controllers/expense";
import protect from "../middlelware/auth";

const router = Router();

router.route("/").get(getAllExpense).post( postExpense);
router.route("/:id").get(protect, getExpense);

export default router;
