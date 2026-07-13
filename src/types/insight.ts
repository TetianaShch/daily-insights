import type { AuthorId } from "./author";
export interface Insight {
    id: string;
    title: string;
    keywords: string[];
    description: string;
    todo: string;
    author: AuthorId;
}
