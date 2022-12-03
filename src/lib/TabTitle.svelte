<script lang="ts">
  import {tabManager} from "./store/todos";

  $: todoTitle = $tabManager.tabs[$tabManager.tabIndex].title;
</script>

<h1 class="text-3xl p-8 font-bold">
  {todoTitle}
</h1>