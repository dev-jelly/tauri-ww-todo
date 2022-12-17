<script lang="ts">
  import TodoInput from "./lib/TodoInput.svelte";
  import TodoList from "./lib/TodoList.svelte";
  import Tabs from "./lib/Tabs.svelte";
  import TabTitle from "./lib/TabTitle.svelte";
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
