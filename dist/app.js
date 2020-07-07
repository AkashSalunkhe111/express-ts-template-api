"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const expense_1 = __importDefault(require("./routes/expense"));
const db_1 = __importDefault(require("./config/db"));
const error_1 = __importDefault(require("./middlelware/error"));
dotenv_1.default.config({ path: __dirname + "/../config.env" });
// Connect to database
db_1.default();
const app = express_1.default();
// Body parser
app.use(express_1.default.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
}
// Mount routers
app.use("/api/expense", expense_1.default);
// Error Middlleware
app.use(error_1.default);
const PORT = process.env.PORT;
process.on("unhandledRejection", (err) => {
    // Send errors to some error logger
    console.log("Unhandled rejection:", err);
});
app.listen(PORT, () => console.log("Server Running"));
//# sourceMappingURL=app.js.map