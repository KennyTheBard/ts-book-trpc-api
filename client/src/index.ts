import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src";

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc",
        }),
    ],
});

async function doStuff() {
    await trpc.createAuthor.mutate({
        name: "Testuleascu",
        dateOfBirth: new Date().toISOString()
    });

    const book = await trpc.createBook.mutate({
        title: "Test",
        publishDate: new Date().toISOString(),
        authorId: 1
    })

    const authors = await trpc.getAuthors.query();
    const books = await trpc.getBooks.query();

    console.log(authors);
    console.log(books);
}

doStuff().catch(console.error);
