<script lang="ts">
  import {tabManager} from "./store/todos";

  $: tm = tabManager.get();

</script>

<h1 class="text-3xl p-8 font-bold" title={tm.tabs[tm.tabIndex].title}>
  {#each $tabManager.tabs as tab, index (tab.id)}
    {#if $tabManager.tabIndex === index}
      {tab.title}
    {/if}
  {/each}
</h1>