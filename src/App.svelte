<script lang="ts">
  import TodoInput from "./view/todos/TodoInput.svelte";
  import TodoList from "./view/todos/TodoList.svelte";
  import Tabs from "./view/tab/Tabs.svelte";
  import TabTitle from "./view/tab/TabTitle.svelte";
  import {tabManager} from "./lib/store/todos";
  $: tabIndex = $tabManager.tabIndex;
</script>
<div class="flex">
  <Tabs/>
  <div class="h-screen container flex m-auto overflow-y-scroll">
    <main class="h-screen flex flex-col justify-start items-center w-full gap-4 p-4">
      <TabTitle tabIndex={tabIndex}/>
      <TodoInput/>
      <TodoList/>

    </main>
  </div>
</div>
<style>

</style>
