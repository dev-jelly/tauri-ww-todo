<script lang="ts">
  import {tabManager} from "./store/todos";
  import { confirm } from '@tauri-apps/api/dialog';

  const tm = tabManager;

  let addTabButton;

  const setTab = (tabIndex: number) => {
    tm.set({
      ...tm.get(),
      tabIndex
    });
  };

  const addTab = () => {
    tm.set({
      ...tm.get(),
      tabs: [
        ...tm.get().tabs,
        {
          id: `tab-${Math.random().toString(36).substring(2)}`,
          title: "New Tab",
          todos: []
        }
      ]
    });
  };

  const removeTab = async (tabIndex: number) => {
    const isDelete = await confirm("Are you sure you want to delete this tab?");
    if(!isDelete) return;
    tm.set({
      ...tm.get(),
      tabs: tm.get().tabs.filter((_, i) => i !== tabIndex)
    });
    if (tm.get().tabIndex === tabIndex) {
      setTab(0);
    }
  };

</script>

<aside class="w-64 h-screen" aria-label="Sidebar">
    <div class="overflow-y-auto py-4 px-3 bg-gray-500 rounded-md dark:bg-gray-800 h-full">

        <ul class="space-y-2">
            {#each $tm.tabs as tab, index (tab.id)}
                <li class="cursor-pointer group relative" on:click={() => setTab(index)}>
                    {#if $tm.tabs.length > 1}
                        <button
                                on:click|stopPropagation={() => removeTab(index)}
                                class="text-black dark:text-white absolute w-6 pr-6 pb-2.5 leading-6 bg-gray-50 group-hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-lg px-4 py-1 dark:bg-gray-800 dark:group-hover:bg-gray-800 dark:hover:group-hover:bg-gray-900 dark:focus:ring-blue-800 right-1 bottom-1 top-1 opacity-0 group-hover:opacity-40 ">
                            -
                        </button>
                    {/if}
                    <a href="#"
                       class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
                        <span class="ml-3">{tab.title}</span>
                    </a>
                </li>
            {/each}
        </ul>
        <form class="flex justify-center w-full h-10 my-2">
            <button type="submit"
                    on:click|preventDefault={addTab}
                    bind:this={addTabButton}
                    class="text-black dark:text-white w-full bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-lg px-4 py-1 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-blue-800">
                +
            </button>
        </form>
    </div>
</aside>