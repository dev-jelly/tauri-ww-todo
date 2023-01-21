<script  lang="ts">
  $: defaultFontSize = 16;

  const zoomIn = () => {
    defaultFontSize += 2;
  }

  const zoomOut = () => {
    defaultFontSize -= 2;
  }

</script>

<div class="fixed bottom-4 right-4 w-24 h-10 border rounded-md overflow-hidden flex justify-center items-center z-10  dark:bg-gray-600 opacity-50 hover:opacity-100 dark:border-gray-400 border-gray-600">
  <button class="rounded-rl-md dark:hover:bg-gray-400 h-full w-full flex items-center justify-center group cursor-pointer hover:bg-white" on:click={zoomOut}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-6 h-6 group-hover:stroke-black">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"/>
    </svg>
  </button>
  <button class="rounded-rl-md dark:hover:bg-gray-400 h-full w-full flex items-center justify-center group cursor-pointer hover:bg-white" on:click={zoomIn}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-6 h-6 group-hover:stroke-black">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"/>
    </svg>
  </button>
</div>

<style global>

</style>