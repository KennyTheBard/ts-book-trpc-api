import { z } from "zod";

export type Author = {
    id: number;
    name: string;
    dateOfBirth: Date;
};

export const AuthorSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
});
