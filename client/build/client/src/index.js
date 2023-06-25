"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@trpc/client");
const trpc = (0, client_1.createTRPCProxyClient)({
    links: [
        (0, client_1.httpBatchLink)({
            url: "http://localhost:3000",
        }),
    ],
});
function doStuff() {
    return __awaiter(this, void 0, void 0, function* () {
        yield trpc.createAuthor.mutate({
            id: 1,
            name: "Testuleascu",
            dateOfBirth: new Date()
        });
        const book = yield trpc.createBook.mutate({
            id: 1,
            title: "Test",
            publishDate: new Date(),
            authorId: 1
        });
        const books = yield trpc.getBooks.query();
        console.log(books);
    });
}
doStuff().catch(console.error);
