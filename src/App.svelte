<script lang="ts">
  import TodoInput from "./lib/TodoInput.svelte";
  import TodoList from "./lib/TodoList.svelte";

</script>
<div class="container flex justify-center items-center m-auto">
    <main class="flex flex-col justify-center items-center w-full gap-4 p-4">
        <h1 class="text-3xl p-8 font-bold">
            WW Todo List
        </h1>
        <TodoInput/>
        <TodoList />

    </main>
</div>
<style>

</style>