<script lang="ts">
  import TodoItem from './TodoItem.svelte'
  import {tabManager} from '../../lib/store/todos'
  import {flip} from 'svelte/animate';

  let hovering = false;

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const {tabs, tabIndex} = tabManager.get();
    const newTodos = tabs[tabIndex].todos;
    console.info(start)
    if (Number.isNaN(start)){
      console.log(start)
      return;
    }

    if (start < target) {
      tabManager.update((tm) => {
        tm.tabs[tm.tabIndex].todos = [
          ...newTodos.slice(0, start),
          ...newTodos.slice(start + 1, target + 1),
          newTodos[start],
          ...newTodos.slice(target + 1),
        ];
        return tm;
      });
    } else {
      tabManager.update((tm) => {
        tm.tabs[tm.tabIndex].todos = [
          ...newTodos.slice(0, target),
          newTodos[start],
          ...newTodos.slice(target, start),
          ...newTodos.slice(start + 1),
        ];
        return tm;
      });
    }
    hovering = null
  }

  const dragstart = (event, index) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('text/plain', index);
  }

  $: currentTodos = $tabManager.tabs[$tabManager.tabIndex].todos
</script>

<ul class="w-full mx-2 md:w-2/3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
  {#each currentTodos as todo, index (todo)}
    <li draggable="true"
        class="rounded-t-lg border-b border-gray-200 dark:border-gray-600"
        animate:flip={{duration: 300}} on:dragstart={event => dragstart(event, index)}
        on:drop|preventDefault={event => drop(event, index)}
        on:dragover|preventDefault={() => false}
        on:dragenter={() => hovering = index}
        on:dragend={() => hovering = false}
        class:opacity-40={hovering === index}
        class:bg-gray-800={hovering === index}
        data-index="{index}">

      <TodoItem
          id={todo.id} index={index} todoTitle={todo.text} done={todo.done}/>
    </li>
  {/each}
</ul>