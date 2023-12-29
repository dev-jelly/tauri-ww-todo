<script lang="ts">
  import {tabManager} from "../../lib/store/todos";
  import {confirm} from '@tauri-apps/api/dialog';
  import {tweened} from "svelte/motion";
  import {animation} from "../../lib/utils/animations";
  import {flip} from 'svelte/animate';


  const tm = tabManager;

  let hovering: boolean | number = false;
  let addTabButton;
  let tabs;
  let arrow;

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
    if (!isDelete) return;
    tm.set({
      ...tm.get(),
      tabs: tm.get().tabs.filter((_, i) => i !== tabIndex)
    });
    if (tm.get().tabIndex === tabIndex) {
      setTab(0);
    }
  };




  const tabsWidth = tweened(16, animation);
  const arrowTransform = tweened(0, animation);
  $: isOpen = true;
  $: tabsWidth.set(isOpen ? 16 : 4);
  $: arrowTransform.set(isOpen ? 0 : 180);
  $: mouseHover = false;
  tabsWidth.subscribe((v) => {
    if (!tabs) return;
    tabs.style.width = `${v}rem`;
  });
  arrowTransform.subscribe((v) => {
    if (!arrow) return;
    arrow.style.transform = `rotate(${v}deg)`;
  });


  const toggleOpen = () => {
    isOpen = !isOpen;
  };

  const onMouseOverTabs = () => {
    if (isOpen) return;
    tabs.style.width = `16rem`;
    mouseHover = true;
  };

  const onMouseLeaveTabs = () => {
    if (isOpen) return;
    tabs.style.width = `4rem`;
    mouseHover = false;
  };


  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const {tabs} = tabManager.get();
    const newTabs = [...tabs];
    console.info(start)
    if (Number.isNaN(start)){
      console.log(start)
      return;
    }

    if (start < target) {
      tabManager.update((tm) => {
        tm.tabs= [
          ...newTabs.slice(0, start),
          ...newTabs.slice(start + 1, target + 1),
          newTabs[start],
          ...newTabs.slice(target + 1),
        ];
        return tm;
      });
    } else {
      tabManager.update((tm) => {
        tm.tabs = [
          ...newTabs.slice(0, target),
          newTabs[start],
          ...newTabs.slice(target, start),
          ...newTabs.slice(start + 1),
        ];
        return tm;
      });
    }
    if(tm.get().tabIndex === start) setTab(target);
    hovering = false
  }

  const dragstart = (event, index) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('text/plain', index);
  }


</script>


<aside bind:this={tabs} class="w-64 h-screen hover:w-64 group/tabs transition-all duration-300" aria-label="Sidebar" id="tab-side-bar"
       on:mouseover={onMouseOverTabs}
       on:focus={onMouseOverTabs}
       on:blur={onMouseLeaveTabs}
       on:mouseout={onMouseLeaveTabs}
>
  <div class="overflow-y-auto py-4 px-3 bg-gray-500 text-white rounded-r-md dark:bg-gray-800 h-full">
    <div class="w-full flex justify-end">
      <button bind:this={arrow} on:click={toggleOpen} class="px-3 py-0.25 rounded-xl bg-gray-600">{"<-"}</button>
    </div>
    <ul class="space-y-2" class:opacity-0={$tabsWidth < 6} class:opacity-100={mouseHover || isOpen}>
      {#each $tm.tabs as tab, index (tab.id)}
        <li class="cursor-pointer group relative" on:click={() => setTab(index)}
            draggable="true"
            animate:flip={{duration: 300}}
            on:dragstart={event => dragstart(event, index)}
            on:drop|preventDefault={event => drop(event, index)}
            on:dragover|preventDefault={() => false}
            on:dragenter={() => hovering = index}
            on:dragend={() => hovering = false}
            class:opacity-40={hovering === index}
            class:bg-gray-800={hovering === index}
            data-index="{index}"
        >
          {#if $tm.tabs.length > 1}
            <button
              on:click|stopPropagation={() => removeTab(index)}
              class="text-black dark:text-white absolute w-6 pr-6 pb-2.5 leading-6 bg-gray-300 group-hover:bg-gray-200 group-hover:hover:bg-gray-100 group-hover:text-black group-hover:dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-lg px-4 py-1 dark:bg-gray-800 dark:group-hover:bg-gray-800 dark:hover:group-hover:bg-gray-900 dark:focus:ring-blue-800 right-1 bottom-1 top-1 opacity-0 group-hover:opacity-100 z-20">
              -
            </button>
          {/if}
          <button
             class="flex max-w-full w-full items-center p-2 text-base font-normal rounded-lg dark:text-white group-hover:bg-gray-800 dark:group-hover:bg-gray-700 text-white truncate group-hover:text-white">
            <span class="ml-3 overflow-hidden">{tab.title}</span>
          </button>
        </li>
      {/each}
    </ul>
      <form class="flex justify-center w-full h-10 my-2 group-hover/tabs:block" class:hidden={!isOpen}>
        <button type="submit"
                on:click|preventDefault={addTab}
                bind:this={addTabButton}
                class="text-black dark:text-white w-full bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-lg px-4 py-1 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-blue-800">
          +
        </button>
      </form>
  </div>
</aside>
