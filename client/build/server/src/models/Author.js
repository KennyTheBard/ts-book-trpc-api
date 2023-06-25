"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorSchema = void 0;
const zod_1 = require("zod");
exports.AuthorSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.date(),
});
