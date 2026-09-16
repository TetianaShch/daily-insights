import { insights } from "../data/insights/index";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function getInsightByDate(date: Date) {
    const startDate = Date.UTC(2025, 5, 3);

    const selectedDate = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const daysPassed = Math.floor(
        (selectedDate - startDate) / DAY_IN_MS
    );

    const sortedInsights = [...insights].sort(
        (a, b) => Number(a.id) - Number(b.id)
    );

    const insightIndex =
        ((daysPassed % sortedInsights.length) + sortedInsights.length) %
        sortedInsights.length;

    return sortedInsights[insightIndex];
}



