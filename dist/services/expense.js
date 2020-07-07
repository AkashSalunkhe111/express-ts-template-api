"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllExpenseService = exports.postExpenseService = void 0;
const moment_1 = __importDefault(require("moment"));
const Expense_1 = __importDefault(require("../models/Expense"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
exports.postExpenseService = (expenseData) => __awaiter(void 0, void 0, void 0, function* () {
    const expenseDataCopy = Object.assign({}, expenseData);
    const momentDate = moment_1.default(expenseData.date, "DD/MM/YY", true);
    if (!momentDate.isValid()) {
        throw new ErrorHandler_1.default(503, "Please enter a valid date");
    }
    expenseDataCopy.date = momentDate.toDate();
    yield Expense_1.default.create(expenseDataCopy);
    // const resullt = await ExpenseModel.findById("asdasd");
    // if (!resullt) {
    //   return new ErrorHandler(404, "No expense found");
    // }
    return;
});
exports.getAllExpenseService = () => {
    const result = Expense_1.default.find();
    return result;
};
//# sourceMappingURL=expense.js.map