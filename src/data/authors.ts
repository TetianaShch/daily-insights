import type { Author, AuthorId } from "../types/author";

export const authors: Record<AuthorId, Author> = {
    tetiana: {
        name: "Тетяна",
        username: "@tet_booktrovert",
        link: "https://www.tiktok.com/@tet_booktrovert",
    },

    maryna: {
        name: "Марина",
        username: "@slovka_books",
        link: "https://www.tiktok.com/@slovka_books",
    },
} as const;
