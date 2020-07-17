"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseService = exports.getAllExpenseService = exports.postExpenseService = void 0;
const moment_1 = __importDefault(require("moment"));
const Expense_1 = __importDefault(require("../models/Expense"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
exports.postExpenseService = (expenseData) => {
    const expenseDataCopy = Object.assign({}, expenseData);
    const momentDate = moment_1.default(expenseData.date, "DD/MM/YY", true);
    if (!momentDate.isValid()) {
        throw new ErrorHandler_1.default(503, "Please enter a valid date");
    }
    expenseDataCopy.date = momentDate.toDate();
    return Expense_1.default.create(expenseDataCopy);
};
exports.getAllExpenseService = () => {
    // No need for await here as result variable is promise,
    // so we can await this function where we are callling it
    // Thats why this function is not async declared by us
    const result = Expense_1.default.find();
    return result;
};
exports.getExpenseService = (id) => {
    // No need for await here as result variable is promise,
    // so we can await this function where we are callling it
    // Thats why this function is not async declared by us
    const result = Expense_1.default.find({ user: id });
    return result;
};
//# sourceMappingURL=expense.js.map