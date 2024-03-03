import { json } from "@sveltejs/kit";
import { sampleTodo } from "$lib/sampleApi/sampleTodo";

type todo_list = {
    item: string;
    id: number;
    tempCheck: boolean;
    completed: boolean;
    clicked: boolean | undefined;
    }

export function GET({ url }) {
    const completedString: string | null = url.searchParams.get('completed');

    const completed: boolean | undefined = completedString ? completedString === 'true' : undefined;

    const filteredTodos = sampleTodo.filter(todo => {
        const matchesCompleted: boolean = completed !== undefined ? todo.completed === completed : true;

        return matchesCompleted;
    })
    return json(filteredTodos);
}

export async function POST({ request }) { //uses time for generating id, MongoDb will create its own id
    const { item } = await request.json();
    const currentTime: Date = new Date();
    const id: number = currentTime.getTime();

    const newPost: todo_list = {
        'item': item,
        'id': id,
        'tempCheck': false,
        'completed': false,
        'clicked': false
    }

    if (newPost.item){
        sampleTodo.push(newPost);
        return json({ success: true });
    }
    else {
        return json({ success: false, error: 'No todo entered'}, { status: 404 });
    }
}

export async function PUT({ url, request }) {
    const todoIdString: string | null = url.searchParams.get('id');
    const todoId: number = todoIdString ? parseInt(todoIdString) : -1;
    if (isNaN(todoId)) {
        return json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }

    const { item, id, tempCheck, completed } = await request.json();
    const index = sampleTodo.findIndex(todo => todo.id === todoId);

    if (index !== -1) {
        sampleTodo[index].item = item;
        sampleTodo[index].id = id;
        sampleTodo[index].tempCheck = tempCheck;
        sampleTodo[index].completed = completed;

        return json({ success: true, updatedTodo: sampleTodo[index] });
    } else {
        return json({ success: false, error: 'Todo item not found' }, { status: 404 });
    }
}

export async function DELETE({ url }) {
    //extract todoId from url param
    const todoIdString: string | null = url.searchParams.get('id');
    const todoId: number = todoIdString ? parseInt(todoIdString) : -1;

    if (isNaN(todoId)) {
        return json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }
    //find the index of todo item to delete
    const index = sampleTodo.findIndex(todo => todo.id === todoId);

    if (index !== -1) {
        sampleTodo.splice(index, 1);

        return json({ success: true });
    } else {
        return json({ success: false, error: 'Todo item not found' }, { status: 404 });
    }
}