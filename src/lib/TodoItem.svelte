<script lang="ts">
    import { todos } from './store/todos';
    export let id: number;
    export let todo: string;
    export let done: boolean;

    const onChangeChecked = () => {
        todos.update((todos) => {
            const index = todos.findIndex((t) => t.id === id);
            if (index !== -1) {
                todos[index].done = done;
            }
            return todos;
        });
    }

    const onClickDelete = () => {
        todos.update((todos) => {
            return todos.filter((t) => t.id !== id);
        });
    }
</script>

<li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
    <div class="flex relative items-center pl-3">
        <input id="todo-checkbox" type="checkbox"
               bind:checked={done}
               on:change={onChangeChecked}
               class="w-4 h-4 text-gray-500 bg-gray-100 rounded border-gray-900 focus:ring-gray-400 dark:focus:ring-gray-500 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-900">
        <label for="todo-checkbox" class="py-3 ml-2 w-full text-md font-medium text-gray-900 dark:text-gray-300 " class:line-through={done} class:text-gray-500={done}>{todo}</label>
        <button
                on:click={onClickDelete}
                class="text-black dark:text-white font-bold absolute right-3 top-2 bottom-2 bg-none hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-2xl px-3 leading-5 pb-1 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
            -
        </button>
    </div>
</li>
