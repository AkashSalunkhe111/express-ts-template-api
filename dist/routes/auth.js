"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = express_1.Router();
router.post("/register", auth_1.register);
router.post("/login", auth_1.login);
router.get("/logout", auth_1.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map