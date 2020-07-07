import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
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

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export default ExpenseModel;
