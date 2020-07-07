"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ExpenseSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: [true, " Date cannot be empty"],
    },
    amount: {
        type: Number,
        required: [true, "Amount cannot be empty"],
    },
    item: {
        type: String,
        required: [true, "Item name cannot be empty"],
    },
    type: {
        type: String,
        required: false,
    },
});
// Create save date
ExpenseSchema.pre("save", function (next) {
    this.date = new Date(this.date);
    next();
});
const ExpenseModel = mongoose_1.default.model("Expense", ExpenseSchema);
exports.default = ExpenseModel;
//# sourceMappingURL=Expense.js.map