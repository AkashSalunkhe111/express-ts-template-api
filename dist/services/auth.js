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
exports.loginUserService = exports.registerUserService = void 0;
const User_1 = __importDefault(require("../models/User"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
exports.registerUserService = (userData) => {
    return User_1.default.create(userData);
};
exports.loginUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    if (!email || !password) {
        throw new ErrorHandler_1.default(400, "Please provide email and password");
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw new ErrorHandler_1.default(401, "Invalid credentials");
    }
    const isMatch = yield user.matchPassword(password);
    if (!isMatch) {
        throw new ErrorHandler_1.default(401, "Invalid credentials");
    }
    return user;
});
//# sourceMappingURL=auth.js.map