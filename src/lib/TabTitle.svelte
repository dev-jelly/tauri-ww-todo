<script lang="ts">
  import {tabManager} from "./store/todos";
  import {afterUpdate} from "svelte";
  export let tabIndex: number;

  $: tab =  $tabManager.tabs[tabIndex];
  $: inputTitle = tab.title
  let input;

  $: editMode = false;

  afterUpdate(() => {
    if (editMode) {
      input.focus();
    }
  });
  const onEditMode = () => {
    editMode = true;
  };


  const onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      applyTitle();
    }
  }

  const applyTitle = () => {
    if (inputTitle) {
      $tabManager.tabs[tabIndex].title = input.value;
    } else {
      inputTitle = $tabManager.tabs[tabIndex].title;
    }
    editMode = false;
  }
</script>

{#if editMode}
    <div class="w-2/3 p-8 w-full">
        <input class="w-full text-center bg-gray-900 rounded-md dark:bg-gray-900 text-3xl font-bold outline-none underline underline-offset-2"
               bind:this={input}
               value={inputTitle}
               on:keypress={onEnter} on:blur={applyTitle}/>
    </div>
{:else}
    <h1 class="text-3xl p-8 font-bold" on:click={onEditMode}>
        {inputTitle}
    </h1>
{/if}
