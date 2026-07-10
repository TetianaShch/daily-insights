import { insights } from "../data/insights/index";

export function getTodayInsight() {
    const startDate = new Date("2025-06-03");

    const today = new Date();

    const diffTime = today.getTime() - startDate.getTime();

    const daysPassed = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
    );

    const sortedInsights = [...insights].sort(
        (a, b) => Number(a.id) - Number(b.id)
    );

    return sortedInsights[
        daysPassed % sortedInsights.length
    ];
}
