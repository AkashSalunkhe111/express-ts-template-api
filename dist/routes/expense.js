"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expense_1 = require("../controllers/expense");
const auth_1 = __importDefault(require("../middlelware/auth"));
const router = express_1.Router();
router.route("/").get(expense_1.getAllExpense).post(expense_1.postExpense);
router.route("/:id").get(auth_1.default, expense_1.getExpense);
exports.default = router;
//# sourceMappingURL=expense.js.map