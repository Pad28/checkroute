"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = void 0;
const express_validator_1 = require("express-validator");
const valid = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.json(errores);
    }
    next();
};
exports.valid = valid;
