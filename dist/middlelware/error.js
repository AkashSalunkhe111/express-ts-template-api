"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (Error, req, res, next) => {
    res.status(Error.statusCode || 500).json({
        success: false,
        message: Error.message || "Server Error",
    });
    // Call next if there is some next middleware to be called
    // next()
};
exports.default = errorHandler;
//# sourceMappingURL=error.js.map