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
    } catch (error) {
        console.error("Failed to fetch todos:", error);
    }
}


    onMount(() => {
        loadToDoSummary();
    });

    function checkTodoSummary(id: number, tempCheck: boolean) {
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
</script>

<div class="todo_summary_container">
    <h3 class="font_med">Todo List:</h3>
    <div class="todo_summary_items">
        {#each todos as todo}
            <div>
                <input type="checkbox" name={String(todo.id)} id={String(todo.id)}
                 bind:checked={todo.tempCheck} on:click={() => checkTodoSummary(todo.id, todo.tempCheck)}>
                <label for={String(todo.id)}>{todo.item}</label>
            </div>
            
        {/each}
        {#if tempComplete.length >0}
            <h4 class="font_small_med">Completed:</h4>
            {#each tempComplete as temp}
                <div>
                    <input type="checkbox" name={String(temp.id)} id={String(temp.id)}
                     bind:checked={temp.tempCheck} on:click={() => checkTodoSummary(temp.id, temp.tempCheck)}>
                    <label for={String(temp.id)}>{temp.item}</label>
                </div>
            {/each}
        {/if}
    </div>
    <!-- Add click event with new todo popup -->
    <div class="todo_addButton">
        <p class="font_small">Add/Edit Todos</p>
    </div>
</div>

<style>
    .todo_summary_container h3 {
        margin-bottom: 20px;
    }
    .todo_summary_container h4 {
        margin: 20px 0 20px 0;
    }
    .todo_addButton {
        background-color: var(--color_third);
        color: var(--color_white);
        padding: 10px;
        margin-top: 25px;
        border-radius: 15px;
    }
</style>