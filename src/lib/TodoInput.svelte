<script lang="ts">
  import {todos} from "./store/todos.ts";
  let todoTitle = "";

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo();
    return true;
  };

  const addTodo = () => {
    if(!todoTitle) return;
    todos.update((todos) => {
      todos = [{id: Math.floor(Math.random() * 1000000000000000000000000), text: todoTitle, done: false} , ...todos];
      todoTitle= "";
      return todos;
    });
  };
</script>

<form class="w-2/3" on:submit={onSubmit}>
  <label for="todo" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Something To Do...</label>
  <div class="relative w-full">
    <input type="search" id="todo"
           bind:value={todoTitle}
           class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           placeholder="할 일을 입력해주세요">
    <button type="submit"
            class="text-black dark:text-white absolute right-2.5 bottom-2.5 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-1 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-blue-800">
      +
    </button>
  </div>
</form>