import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as cors from "cors";
import * as express from "express";
import { z } from "zod";

export const bootstrap = (async () => {
    const trpc = initTRPC.create();

    const appRouter = trpc.router({
        // createAuthor: trpc.procedure.input().mutation(),
        // createBook: trpc.procedure.input().mutation(),
        getAuthors: trpc.procedure.query((opts) => {}),
        getAuthorById: trpc.procedure
            .input(z.object({ id: z.number() }))
            .query((opts) => {
                
            }),
        getBooks: trpc.procedure.query((opts) => {}),
        getBookById: trpc.procedure
            .input(z.object({ id: z.number() }))
            .query((opts) => {}),
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

    app.listen(3000)
})();
