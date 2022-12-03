<script lang="ts">
  import {tabManager} from "./store/todos";

  const tm = tabManager;

  const setTab = (tabIndex: number) => {
    tm.set({
      ...tm.get(),
      tabIndex
    });
  };

</script>

<aside class="w-64 h-screen" aria-label="Sidebar">
  <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
    <ul class="space-y-2">
      {#each $tm.tabs as tab, index (tab.id)}
        <li class="cursor-pointer" on:click={() => setTab(index)}>
          <a href="#"
             class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <span class="ml-3">{tab.title}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</aside>