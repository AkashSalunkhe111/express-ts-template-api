"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// import cron from "node-cron";
const xss = require("xss-clean");
const expense_1 = __importDefault(require("./routes/expense"));
const auth_1 = __importDefault(require("./routes/auth"));
const db_1 = __importDefault(require("./config/db"));
const error_1 = __importDefault(require("./middlelware/error"));
dotenv_1.default.config({ path: __dirname + "/../config.env" });
// Connect to database
db_1.default();
const app = express_1.default();
// Body parser
app.use(express_1.default.json());
// cookie parser
app.use(cookie_parser_1.default());
// To remove data, use:
app.use(express_mongo_sanitize_1.default());
app.use(helmet_1.default());
app.use(xss());
// Rate limiting
const limiter = express_rate_limit_1.default({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
app.use(limiter);
// Prevent http param polllution
app.use(hpp_1.default());
// cron.schedule("* * * * *", function () {
//   console.log("running a task every minute");
// });
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
    app.use(cors_1.default());
}
// Mount routers
app.use("/api/expense", expense_1.default);
app.use("/api/auth", auth_1.default);
// Error Middlleware
app.use(error_1.default);
const PORT = process.env.PORT;
process.on("unhandledRejection", (err) => {
    // Send errors to some error logger
    console.log("Unhandled rejection:", err);
});
app.listen(PORT, () => console.log("Server Running"));
module.exports = app;
//# sourceMappingURL=app.js.map