<script lang="ts">
    import { onMount } from 'svelte';
    import DashboardIcons from '$lib/items/DashboardIcons.svelte';

    //declaring type for database format
    type todo_list = {
    item: string;
    id: number;
    tempCheck: boolean;
    completed: boolean;
    clicked: boolean | undefined;
    }

    //database variables
    let pendingTodos: todo_list[] = [];
    let completedTodos: todo_list[] = [];

    //our database requests
    async function loadPendingToDos() {
        try {
            const response = await fetch('/api/todo?completed=false');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            pendingTodos = await response.json();
        }   catch (error) {
                console.error("Failed to fetch todos:", error);
            }
    }
    async function loadCompleteToDos() { //captures all of the todos
        try {
            const response = await fetch('/api/todo?completed=true');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            completedTodos = await response.json();
        }   catch (error) {
                console.error("Failed to fetch todos:", error);
            }
    }
    async function createTodo(newItem: string) {
        try {
            const response = await fetch('/api/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({item: newItem}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function editTodo(todo: todo_list) {
        try {
            const response = await fetch(`/api/todo?id=${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'item': todo.item, 'id': todo.id, 'tempCheck': todo.tempCheck, 'completed': todo.completed, }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error("Failed to update todo:", error);
        }
    }
    async function deleteTodo(todoId: number) {
        try {
            const response = await fetch(`/api/todo?id=${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Failed to delete todo', error);
        }
    }
    //ensure that the database call is made when our file is mounted to the DOM
    onMount(() => {
        loadPendingToDos();
        loadCompleteToDos();
    });

    //html variables
    let displayAddTodo: boolean = false;

    //html function calls
    function clickEdit(todo:todo_list): void {
            todo['clicked'] = !todo.clicked;
            pendingTodos = [...pendingTodos]; //trigger svelte reactivity
    }

</script>

<main>
    <h1 class="font_xl">Todos:</h1>
    <div class="edit_list">
        <ul class="font_med">
            {#each pendingTodos as todo}
                <div class="item_container">
                    {#if !todo.clicked}
                        <li>{todo.item}</li>
                    {:else if todo.clicked}
                        <form on:submit|preventDefault={async (e) => {
                            const formData = new FormData(e.currentTarget);
                            const newItem = formData.get('item');
                            
                            if (typeof newItem === 'string') {
                                todo.item = newItem;
                                await editTodo(todo);
                                todo.clicked = false; // Optionally close the edit mode
                                loadPendingToDos(); // Refresh your todos list
                            }
                        }}>
                            <!-- svelte-ignore a11y-autofocus -->
                            <input autofocus name="item" type="text" autocomplete="off" placeholder="Edit Todo">
                        </form>
                    {/if}
                    <div class="icons_container">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="icon" on:click={async () => {
                            todo.completed = true;
                            await editTodo(todo);
                            loadPendingToDos();
                            loadCompleteToDos();
                        }}>
                            <DashboardIcons iconName={'check_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'green'}/>
                        </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="icon" on:click={() => clickEdit(todo)}>
                            <DashboardIcons iconName={'pencil_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'yellow'}/>
                        </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="icon" on:click={async () => {
                            deleteTodo(todo.id);
                            loadPendingToDos();
                            loadCompleteToDos();}}>
                            <DashboardIcons iconName={'trash_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'red'} />
                        </div>
                    </div>
                </div>
            {/each}
        </ul>
    </div>
    <button class="add_new font_small_med" on:click={() => displayAddTodo = !displayAddTodo}>Add New Todo</button>
    {#if displayAddTodo}
        <form class = "form_add font_med" on:submit|preventDefault={async (e) => {
            const formData = new FormData(e.currentTarget);
            const newItem = formData.get('item');

            if (typeof newItem === 'string') {
                await createTodo(newItem);
                displayAddTodo = false;
                loadPendingToDos();
            }
        }}>
            <!-- svelte-ignore a11y-autofocus -->
            <input autofocus name="item" type="text" autocomplete="off" placeholder="Enter Todo">
            <button class="add_new font_small" type='submit'>Sumbit</button>
        </form>
    {/if}
    <div class="completed_list">
        <h2 class="font_large">Completed:</h2>
        <ul class="font_med">
            {#each completedTodos as todo}
                <div class="item_container">
                    <li>{todo.item}</li>
                    <div class="icons_container">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="icon" on:click={async () => {
                            deleteTodo(todo.id);
                            loadPendingToDos();
                            loadCompleteToDos();}}>
                            <DashboardIcons iconName={'trash_icon'} size={'1em'} color={'gray'} hover={true} hoverColor={'red'} />
                        </div>
                    </div>
                </div>
            {/each}
        </ul>
    </div>
    <a href="/dashboard"><button class="add_new font_small_med">Return home</button></a>
</main>

<style>
    main {
        margin: 50px;
        padding: 50px;
        border-radius: 15px;
        background-color: var(--color_white);
        color: black;
    }
    h1 {
        text-decoration: underline;
    }
    h2 {
        margin-bottom: 25px;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        max-height: 12em;
        flex-wrap: wrap;
        gap: 0.5em;
    }
    input {
        background-color: var(--color_white);
        color: black;
    }
    .add_new {
        background-color: var(--color_third);
        border: none;
        border-radius: 0.25em;
        width: 8em;
        padding: 0.5em;
        margin: 1em 0 1em 0;
    }
    .add_new:hover {
        background-color: var(--color_third_light);
    }
    .edit_list {
        margin-top: 25px;
    }
    .item_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 30%;
    }
    .icons_container {
        display: flex;
        gap: 0.5em;
    }
</style>