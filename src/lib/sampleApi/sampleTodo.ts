type todo_list = {
    item: string;
    id: number;
    tempCheck: boolean;
    completed: boolean;
}

export let sampleTodo: todo_list[] = [
    {
        'item': 'Buy Dress',
        'id' : 1,
        'tempCheck': false,
        'completed': false,
    },
    {
        'item': 'Order Flowers',
        'id' : 2,
        'tempCheck': false,
        'completed': false,
    },
    {
        'item': 'Finalize Catering',
        'id' : 3,
        'tempCheck': false,
        'completed': false,
    },
    {
        'item': 'Find Photographer',
        'id' : 4,
        'tempCheck': false,
        'completed': false,
    },
]