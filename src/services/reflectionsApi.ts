import { supabase } from "./supabaseClient";
import type { Reflection } from "../types/reflection";

interface ReflectionRow {
    id: string;
    insight_id: string;
    nickname: string;
    text: string;
    created_at: string;
}

export const fetchReflections = async (
    insightId: string
): Promise<Reflection[]> => {
    const { data, error } = await supabase
        .from("reflections")
        .select("*")
        .eq("insight_id", insightId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data as ReflectionRow[]).map((reflection) => ({
        id: reflection.id,
        insightId: reflection.insight_id,
        nickname: reflection.nickname,
        text: reflection.text,
        createdAt: reflection.created_at,
    }));
};

