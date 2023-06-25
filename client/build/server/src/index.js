"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@trpc/server");
const trpcExpress = require("@trpc/server/adapters/express");
const cors = require("cors");
const express = require("express");
const zod_1 = require("zod");
const db_1 = require("./db");
const models_1 = require("./models");
const trpc = server_1.initTRPC.create();
const appRouter = trpc.router({
    createAuthor: trpc.procedure.input(models_1.AuthorSchema).mutation((opts) => {
        if (db_1.db.authors.find((author) => author.id === opts.input.id)) {
            throw new Error(`Author #${opts.input.id} already exists`);
        }
        db_1.db.authors.push(opts.input);
    }),
    createBook: trpc.procedure.input(models_1.BookSchema).mutation((opts) => {
        if (db_1.db.books.find((book) => book.id === opts.input.id)) {
            throw new Error(`Book #${opts.input.id} already exists`);
        }
        db_1.db.books.push(opts.input);
    }),
    getAuthors: trpc.procedure.query((opts) => db_1.db.authors),
    getAuthorById: trpc.procedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query((opts) => db_1.db.authors.find((author) => author.id === opts.input.id)),
    getBooks: trpc.procedure.query((opts) => db_1.db.books),
    getBookById: trpc.procedure
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query((opts) => db_1.db.books.find((book) => book.id === opts.input.id)),
});
// created for each request
const createContext = ({ req, res, }) => ({}); // no context
const app = express();
app.use(cors());
app.use("/trpc", trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
