import { supabase } from "./supabaseClient";
import type { Reflection } from "../types/reflection";

interface ReflectionRow {
    id: string;
    insight_id: string;
    nickname: string;
    text: string;
    created_at: string;
}

interface CreateReflectionPayload {
    insightId: string;
    nickname: string;
    text: string;
    accessCode: string;
}

const mapReflection = (reflection: ReflectionRow): Reflection => ({
    id: reflection.id,
    insightId: reflection.insight_id,
    nickname: reflection.nickname,
    text: reflection.text,
    createdAt: reflection.created_at,
});

export const fetchReflections = async (
    insightId: string,
): Promise<Reflection[]> => {
    const { data, error } = await supabase
        .from("reflections")
        .select("*")
        .eq("insight_id", insightId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data as ReflectionRow[]).map(mapReflection);
};

export const createReflection = async ({
    insightId,
    nickname,
    text,
    accessCode,
}: CreateReflectionPayload): Promise<Reflection> => {
    const { data, error } = await supabase.functions.invoke(
        "create-reflection",
        {
            body: {
                insightId,
                nickname,
                text,
                accessCode,
            },
        },
    );

    if (error) {
        throw new Error(error.message);
    }

    if (data?.error) {
        throw new Error(data.error);
    }

    return mapReflection(data.reflection as ReflectionRow);
};

