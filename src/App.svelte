<script lang="ts">
  import TodoInput from "./view/todos/TodoInput.svelte";
  import TodoList from "./view/todos/TodoList.svelte";
  import Tabs from "./view/tab/Tabs.svelte";
  import TabTitle from "./view/tab/TabTitle.svelte";
  import Zoom from "./view/Zoom.svelte";
  import Login from "./view/auth/Login.svelte";
import { fetchTodos } from "./lib/remote";
import type { RemoteTodo } from "./lib/remote";
  import { tabManager } from "./lib/store/todos";
  import { auth } from "./lib/store/auth";
  
  $: tabIndex = $tabManager.tabIndex;
  $: token = $auth;

let loaded = false;
$: if (token && !loaded) {
  loadTodos();
}

async function loadTodos() {
  try {
    const remote: RemoteTodo[] = await fetchTodos();
    tabManager.update((tm) => {
      if (tm.tabs.length === 0) tm.tabs.push({ id: "remote", title: "Todos", todos: [] });
      tm.tabs[0].todos = remote.map((t) => ({ id: t.id.toString(), text: t.title, done: t.completed }));
      tm.tabIndex = 0;
      return { ...tm };
    });
  } catch (e) {
    console.error("Failed to load todos", e);
  } finally {
    loaded = true;
  }
}
</script>
{#if token}
  <div class="flex">
    <Tabs />
    <div class="h-screen container flex m-auto overflow-y-scroll">
      <main class="min-h-screen flex flex-col justify-start items-center w-full gap-4 p-4 ">
        <TabTitle tabIndex={tabIndex} />
        <TodoInput />
        <TodoList />
        <div class=" bg-transparent opacity-0 mt-8">_</div>
        <Zoom />
      </main>
    </div>
  </div>
{:else}
  <Login />
{/if}
<style>

</style>
