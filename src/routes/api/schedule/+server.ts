import { json } from "@sveltejs/kit";
import { sampleSchedule } from "$lib/sampleApi/sampleSchedule";

export function GET() {
    return json(sampleSchedule)
}