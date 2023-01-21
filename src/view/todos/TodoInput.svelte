<script lang="ts">
  import {tabManager} from "../../lib/store/todos.ts";

  let todoTitle = "";
  let addButton;
  const onSubmit = (e) => {
    e.preventDefault();
    addTodo();
    return true;
  };

  const addTodo = () => {
    todoTitle = todoTitle.trim();
    if (!todoTitle) return;
    setTimeout(() => addButton.blur(), 300);
    tabManager.update((tm) => {
      const todos = tm.tabs[tm.tabIndex].todos;
      tm.tabs[tm.tabIndex].todos = [{
        id: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        text: todoTitle,
        done: false
      }, ...todos];
      todoTitle = "";
      return tm;
    });
  };
</script>

<form class="w-2/3" on:submit={onSubmit}>
  <label for="todo" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
         >Something To Do...</label>
  <div class="relative w-full">
    <input type="search" id="todo"
           bind:value={todoTitle}
           on:drop|preventDefault={() => false}
           class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="Something To Do...">
    <button type="submit"
            bind:this={addButton}
            class="text-black dark:text-white absolute right-2.5 bottom-2.5 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-1 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-blue-800">
      +
    </button>
  </div>
</form>