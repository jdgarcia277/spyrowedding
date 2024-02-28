<script lang="ts">
    import { onMount } from "svelte";

    type todo_list = {
    item: string;
    id: number;
    tempCheck: boolean;
    completed: boolean;
    }
    let todos: todo_list[] = [];
    let tempComplete: todo_list[] = [];

    async function loadToDoSummary() {
    try {
        const response = await fetch('api/todo');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        todos = await response.json();
    }   catch (error) {
            console.error("Failed to fetch todos:", error);
        }
    }
    onMount(() => {
        loadToDoSummary();
    });
    function checkTodoSummary(id: number, tempCheck: boolean): void {
        if (!tempCheck) {
            const index: number = todos.findIndex(todo => todo.id === id);
            todos[index].tempCheck = true;
            tempComplete.push(todos[index]);
            todos.splice(index, 1);
            tempComplete = [...tempComplete];
            todos = [...todos];
        }
        else {
            const index: number = tempComplete.findIndex(todo => todo.id === id);
            tempComplete[index].tempCheck = false;
            todos.push(tempComplete[index]);
            tempComplete.splice(index, 1);
            tempComplete = [...tempComplete];
            todos = [...todos];
        }
    }
    function cancelCompleted(): void {
        let arrayLength: number = tempComplete.length;
        if(arrayLength > 0) {
            for (let index: number = 0; index < arrayLength; index ++) {
                tempComplete[index].tempCheck = false;
                todos.push(tempComplete[index])
            }
            todos = [...todos];
            tempComplete = [];
        }
    }
</script>

<div class="todo_summary_container">
    <h3 class="font_med">Todo List:</h3>
    <div class="todo_summary_items">
        {#each todos as todo}
            <div class="checkbox_item font_smallish">
                <input type="checkbox" name={String(todo.id)} id={String(todo.id)}
                 bind:checked={todo.tempCheck} on:click={() => checkTodoSummary(todo.id, todo.tempCheck)}>
                <label for={String(todo.id)}>{todo.item}</label>
            </div>    
        {/each}
    </div>
    <div class="todo_complete_items_container">
        {#if tempComplete.length > 0}
            <h4 class="font_small_med">Completed:</h4>
            <div class="todo_complete_items">
                {#each tempComplete as temp}
                <div class="checkbox_item font_smallish">
                    <input type="checkbox" name={String(temp.id)} id={String(temp.id)}
                     bind:checked={temp.tempCheck} on:click={() => checkTodoSummary(temp.id, temp.tempCheck)}>
                    <label for={String(temp.id)}>{temp.item}</label>
                </div>
            {/each}
            </div>
        <div class="complete_buttons_container">
            <div class="accept_button">
                <p>Submit</p>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="reject_button" on:click={cancelCompleted}>
                <p>Cancel</p>
            </div>
        </div>
        {/if}
    </div>
    <!-- Add click event with new todo popup -->
    <div class="todo_addButton">
        <p class="font_small">Add/Edit Todos</p>
    </div>
</div>

<style>
    .todo_summary_container {
        margin: 20px;
    }
    .todo_summary_container h3 {
        margin-bottom: 20px;
    }
    .todo_summary_container h4 {
        margin: 20px 0 20px 0;
    }
    .todo_addButton {
        background-color: var(--color_third);
        color: var(--color_white);
        box-shadow: 1px 1px 3px black;
        padding: 10px;
        margin-top: 25px;
        border-radius: 15px;
        text-align: center;
    }
    .todo_addButton:hover {
        background-color: var(--color_third_light);
        box-shadow: 3px 3px 3px black;
    }
    .checkbox_item {
        display: grid;
        grid-template-columns: 1em auto;
        gap: 0.5em;
        align-items: center;
    }
    input[type="checkbox"] {
        appearance: none;
        background-color: var(--color_white);
        margin: 0;
        font: inherit;
        color: currentColor;
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid currentColor;
        transform: translateY(-0.075em);
        display: grid;
        place-content: center;
    }
    .checkbox_item + .checkbox_item {
        margin-top: 0.5em;
    }
    input[type="checkbox"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--color_primary_light);
        background-color: CanvasText;
        transform-origin: bottom left;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }
    .complete_buttons_container {
        display: flex;
        gap: 1em;
        align-items: center;
        margin-top: 20px;
    }
    .accept_button {
        padding: 10px;
        border-radius: 15px;
        background-color: #00e600;
        box-shadow: 1px 1px 3px;
        color: var(--color_black);
    }
    .accept_button:hover {
        background-color: #00ff00;
        box-shadow: 3px 3px 3px;
    }
    .reject_button {
        padding: 10px;
        border-radius: 15px;
        background-color: #e60000;
        box-shadow: 1px 1px 3px black;
        color: var(--color_white);
    }
    .reject_button:hover {
        background-color: #ff0000;
        box-shadow: 3px 3px 3px black;
    }
</style>