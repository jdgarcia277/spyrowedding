import { json } from "@sveltejs/kit";
import { sampleDates } from "$lib/sampleApi/sampleDates";

type date_list = {
    id: number;
    time: string;
    item: string;
    clicked: boolean;
}

export function GET() {
    return json(sampleDates);
}

export async function POST({ request }) { //uses time for generating id, MongoDb will create its own id
    const { time, item } = await request.json();
    const currentTime: Date = new Date();
    const id: number = currentTime.getTime();

    const newPost: date_list = {
        'id': id,
        'item': item,
        'time': time,
        'clicked': false
    }

    if (newPost.time && newPost.item){
        sampleDates.push(newPost);
        return json({ success: true });
    }
    else {
        return json({ success: false, error: 'No Date entered'}, { status: 404 });
    }
}

export async function PUT({ url, request }) {
    const dateIdString: string | null = url.searchParams.get('id');
    const dateId: number = dateIdString ? parseInt(dateIdString) : -1;
    if (isNaN(dateId)) {
        return json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }

    const { id, time, item } = await request.json();
    const index = sampleDates.findIndex(dateItem => dateItem.id === dateId);

    if (index !== -1) {
        sampleDates[index].id = id;
        sampleDates[index].time = time;
        sampleDates[index].item = item;
        
        return json({ success: true, updatedDate: sampleDates[index] });
    } else {
        return json({ success: false, error: 'Date item not found' }, { status: 404 });
    }
}

export async function DELETE({ url }) {

    const dateIdString: string | null = url.searchParams.get('id');
    const dateId: number = dateIdString ? parseInt(dateIdString) : -1;

    if (isNaN(dateId)) {
        return json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }

    const index = sampleDates.findIndex(dateItem => dateItem.id === dateId);

    if (index !== -1) {
        sampleDates.splice(index, 1);
        return json({ success: true });
    } else {
        return json({ success: false, error: 'Date not found' }, { status: 404 });
    } 
}