<script lang="ts">
  import TodoItem from './TodoItem.svelte'
  import {todos} from './store/todos'
  import {flip} from 'svelte/animate';

  let hovering = false;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTodos = todos

    if (start < target) {
      newTodos.update((todos) => {
        todos.splice(target + 1, 0, todos[start]);
        todos.splice(start, 1);
        return todos;
      });
    } else {
      newTodos.update((todos) => {
        todos.splice(target, 0, todos[start]);
        todos.splice(start + 1, 1);
        return todos;
      });
    }
    hovering = null

  }

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
    console.log(start);
  }

</script>

<ul class="w-full mx-2 md:w-2/3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
  {#each $todos as todo, index (todo)}
    <li draggable="true"
        class="cursor-move rounded-t-lg border-b border-gray-200 dark:border-gray-600 hover:cursor-pointer"
        animate:flip={{duration: 300}} on:dragstart={event => dragstart(event, index)}
        on:drop|preventDefault={event => drop(event, index)}
        on:dragover|preventDefault={() => false}
        on:dragenter={() => hovering = index}
        class:opacity-40={hovering === index}
        class:bg-gray-800={hovering === index}
    >
      <TodoItem
          id={todo.id} index={index} todoTitle={todo.text} done={todo.done}/>
    </li>
  {/each}
</ul>