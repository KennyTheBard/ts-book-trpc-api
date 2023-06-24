import { z } from "zod";

export type Author = {
    id: number;
    name: string;
    dateOfBirth: Date;
};

export const AuthorSchema: z.ZodType<Author> = z.object({
    id: z.number(),
    name: z.string(),
    dateOfBirth: z.date(),
});
