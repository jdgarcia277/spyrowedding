import { json } from "@sveltejs/kit";
import { sampleVendor } from "$lib/sampleApi/sampleVendors";

type vendor_list = {
    id: number;
    name: string;
    number: string;
    email: string;
}

export async function GET() {
    return json(sampleVendor)
}

export async function POST({ request }) { //use time for generating id, MongoDB has own method
    const { name, number, email} = await request.json();
    const currentTime: Date = new Date();
    const id: number = currentTime.getTime();

    const newPost: vendor_list = {
        'id': id,
        'name': name,
        'number': number,
        'email': email
    }

    if (newPost.name && newPost.number && newPost.email) {
        sampleVendor.push(newPost);
        return json({ success: true });
    }
    else {
        return json({ success: false, error: 'No vendor entered'}, { status: 404});
    }
}

export async function PUT({ url, request }) {
    const vendorIdString: string | null = url.searchParams.get('id');
    const vendorId: number = vendorIdString ? parseInt(vendorIdString) : -1;
    if (isNaN(vendorId)) {
        return json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }

    const { id, name, number, email } = await request.json();
    const index = sampleVendor.findIndex(vendor => vendor.id === vendorId);

    if (index !== -1) {
        sampleVendor[index].id = id;
        sampleVendor[index].name = name;
        sampleVendor[index].number = number;
        sampleVendor[index].email = email;

        return json({ success: true, updatedVendor: sampleVendor[index] });
    }
    else {
        return json({ success: false, error: 'Vendor not found'}, { status: 404 });
    }
}

export async function DELETE({ url }) {
    const vendorIdString: string | null = url.searchParams.get('id');
    const vendorId: number = vendorIdString ? parseInt(vendorIdString) : -1;

    if(isNaN(vendorId)) {
        return json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }

    const index = sampleVendor.findIndex(vendor => vendor.id === vendorId);

    if (index !== -1) {
        sampleVendor.splice(index, 1);
        return json({ success: true })
    }
    else {
        return json({ success: false, error: 'Vendor not found' }, { status: 404 });
    }
}