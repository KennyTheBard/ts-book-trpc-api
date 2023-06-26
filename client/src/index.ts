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
        id: 1,
        name: "Testuleascu",
        dateOfBirth: new Date()
    });

    const book = await trpc.createBook.mutate({
        id: 1,
        title: "Test",
        publishDate: new Date(),
        authorId: 1
    })

    const books = await trpc.getBooks.query();

    console.log(books);
}

doStuff().catch(console.error);
