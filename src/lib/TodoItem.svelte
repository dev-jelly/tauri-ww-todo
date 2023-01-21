<script lang="ts">
  import {tabManager} from './store/todos';

  export let id: number;
  export let todoTitle: string;
  export let done: boolean;
  export let index: number;

  let checkbox;

  const toggleDone = (e) => {
    done = !done;
    checkbox.focus();
    tabManager.update((tm) => {
      const index = tm.tabs[tm.tabIndex].todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        tm.tabs[tm.tabIndex].todos[index].done = done;
      }
      return {...tm};
    });
  }

  const onClickDelete = () => {
    tabManager.update((tm) => {
      const todos =  tm.tabs[tm.tabIndex].todos;
      tm.tabs[tm.tabIndex].todos = todos.filter((t) => t.id !== id);
      return tm;
    });
  }

  const focus = (e) => {
    // focus out after 1s
    setTimeout(() => e.target.blur(), 300);
  }

</script>

<div
    class="w-full"
    on:click|preventDefault={toggleDone}>
  <div class="flex relative items-center pl-3">
    <input id="todo-checkbox-{id}" type="checkbox"
           bind:this={checkbox}
           bind:checked={done}
           on:click|stopPropagation={toggleDone}
           on:focus={focus}
           class="w-4 h-4 text-gray-500 bg-gray-100 rounded border-gray-900 focus:ring-gray-400 dark:focus:ring-gray-500 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-900">
    <label for="todo-checkbox-{id}" class="py-3 ml-2 w-full text-md font-medium text-gray-900 dark:text-gray-300 "
           class:line-through={done} class:text-gray-500={done}>{todoTitle}</label>
    <button
        on:click={onClickDelete}
        class="text-black dark:text-white font-bold absolute right-3 top-2 bottom-2 bg-none hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-2xl px-3 leading-5 pb-1 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
      -
    </button>
  </div>
</div>
