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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const auth_1 = require("../services/auth");
exports.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield auth_1.registerUserService(req.body);
        res.status(200).json({ success: "true" });
    }
    catch (err) {
        next(err);
    }
});
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.loginUserService(req.body);
        const token = user.getSignedToken();
        const cookieOption = {
            expires: new Date(
            // @ts-ignore
            Date.now() + Number(process.env.COOKIE_EXPIRE)),
            httpOnly: true,
        };
        res
            .status(200)
            .cookie("token", token, cookieOption)
            .json({ success: true, token: token });
    }
    catch (err) {
        next(err);
    }
});
exports.logout = (req, res, next) => {
    const cookieOption = {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    };
    res.cookie("token", "none", cookieOption);
    res.status(200).json({ success: true });
};
//# sourceMappingURL=auth.js.map