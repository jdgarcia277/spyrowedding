import { json } from "@sveltejs/kit";
import { sampleTodo } from "$lib/sampleApi/sampleTodo";

export function GET() {
    return json(sampleTodo)
}