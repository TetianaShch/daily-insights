import { authors } from "../data/authors";

export type AuthorId = keyof typeof authors;

export interface Insight {
    id: string;
    title: string;
    keywords: string[];
    description: string;
    todo: string;
    author: AuthorId;
}
