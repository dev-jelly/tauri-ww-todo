<script lang="ts">
  import TodoItem from './TodoItem.svelte'
  import {todos} from './store/todos'

</script>

<ul class="w-full mx-2 md:w-2/3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">

    {#each $todos as todo}
        <TodoItem id={todo.id} todo={todo.text} done={todo.done}/>
    {/each}
</ul>