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
exports.postExpense = exports.getAllExpense = exports.testEndpoint = void 0;
const expense_1 = require("../services/expense");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
exports.testEndpoint = (req, res, next) => {
    // throw new ErrorHandler(503, "Custom error");
    // throw Error("default");
    return next(new ErrorHandler_1.default(503, "Custom Error"));
    // res.send("Hello World");
};
exports.getAllExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield expense_1.getAllExpenseService();
        res.status(200).json({ success: true, result });
    }
    catch (err) { }
});
exports.postExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield expense_1.postExpenseService(req.body);
        res.status(200).json({ success: true });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=expense.js.map