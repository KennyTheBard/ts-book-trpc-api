"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const zod_1 = require("zod");
exports.BookSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    publishDate: zod_1.z.date(),
    authorId: zod_1.z.number()
});
