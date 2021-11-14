"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    expiresTime: process.env.TOKEN_EXPIRES_TIME || '8200',
    secret: process.env.TOKEN_SECRET || 'supersecrettoken'
};
//# sourceMappingURL=JWT.js.map