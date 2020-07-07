"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expense_1 = require("../controllers/expense");
const router = express_1.Router();
router.route("/")
    .get(expense_1.getAllExpense)
    .post(expense_1.postExpense);
exports.default = router;
//# sourceMappingURL=expense.js.map