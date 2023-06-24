import {z} from 'zod'; 

export type Book = {
    id: number;
    title: string;
    publishDate: Date;
    authorId: number;
}

export const BookSchema: z.ZodType<Book> = z.object({
    id: z.number(),
    title: z.string(),
    publishDate: z.date(),
    authorId: z.number()
});
