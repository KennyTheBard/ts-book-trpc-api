import {z} from 'zod'; 

export type Book = {
    id: number;
    title: string;
    publishDate: Date;
    authorId: number;
}

export const BookSchema = z.object({
    title: z.string(),
    publishDate: z.string(),
    authorId: z.number()
});
