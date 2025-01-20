<script lang="ts">
  import {toggleAlwaysOnTop} from '../lib/store/windows'

  let alwaysOnTop = false
  async function toggle() {
    alwaysOnTop = !alwaysOnTop
    await toggleAlwaysOnTop()
  }
</script>

<button on:click={toggle}>
    {alwaysOnTop ? '항상 위에 표시 끄기' : '항상 위에 표시 켜기'}
</button>
