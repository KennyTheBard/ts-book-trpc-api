import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as cors from "cors";
import * as express from "express";
import { z } from "zod";
import { db } from "./db";
import { AuthorSchema, BookSchema } from "./models";

const trpc = initTRPC.create();

const appRouter = trpc.router({
    createAuthor: trpc.procedure.input(AuthorSchema).mutation((opts) => {
        db.authors.push({
            ...opts.input,
            id: db.authors.length,
            dateOfBirth: new Date(opts.input.dateOfBirth)
        });
    }),
    createBook: trpc.procedure.input(BookSchema).mutation((opts) => {
        db.books.push({
            ...opts.input,
            id: db.books.length,
            publishDate: new Date(opts.input.publishDate)
        });
    }),
    getAuthors: trpc.procedure.query((opts) => db.authors),
    getAuthorById: trpc.procedure
        .input(z.object({ id: z.number() }))
        .query((opts) =>
            db.authors.find((author) => author.id === opts.input.id)
        ),
    getBooks: trpc.procedure.query((opts) => db.books),
    getBookById: trpc.procedure
        .input(z.object({ id: z.number() }))
        .query((opts) => db.books.find((book) => book.id === opts.input.id)),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

// created for each request
const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const app = express();
app.use(cors());

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

app.listen(3000, () => console.log("Listening on http://localhost:3000/trpc"));
