import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as cors from "cors";
import * as express from "express";
import { z } from "zod";
import { db } from "./db";
import { AuthorSchema, BookSchema } from "./models";

export const bootstrap = (async () => {
    const trpc = initTRPC.create();

    const appRouter = trpc.router({
        createAuthor: trpc.procedure.input(AuthorSchema).mutation((opts) => db.authors.push(opts.input)),
        createBook: trpc.procedure.input(BookSchema).mutation((opts) => db.books.push(opts.input)),
        getAuthors: trpc.procedure.query((opts) => db.authors),
        getAuthorById: trpc.procedure
            .input(z.object({ id: z.number() }))
            .query((opts) => db.authors.find(author => author.id === opts.input.id)),
        getBooks: trpc.procedure.query((opts) => db.books),
        getBookById: trpc.procedure
            .input(z.object({ id: z.number() }))
            .query((opts) => db.books.find(book => book.id === opts.input.id)),
    });

    // created for each request
    const createContext = ({
        req,
        res,
    }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
    type Context = inferAsyncReturnType<typeof createContext>;

    const app = express();
    app.use(cors());

    app.use(
        "/trcp",
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
        })
    );

    app.listen(3000);
})();
