import { json } from "@sveltejs/kit";
import { sampleDates } from "$lib/sampleApi/sampleDates";

type date_list = {
    id: number;
    time: string;
    item: string;
}

export function GET() {
    return json(sampleDates);
}