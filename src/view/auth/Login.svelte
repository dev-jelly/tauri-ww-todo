<script lang="ts">
  import { auth } from '../../lib/store/auth';
  import { api } from '../../lib/api';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let email = '';
  let password = '';
  let isRegister = false;
  let error: string | null = null;

  const submit = async () => {
    error = null;
    try {
      const path = isRegister ? '/auth/register' : '/auth/login';
      const res = await api<{ token: string }>(path, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      auth.login(res.token);
      dispatch('loggedin');
    } catch (e: any) {
      error = e?.message || 'Error';
    }
  };
</script>

<div class="flex flex-col items-center justify-center h-screen gap-4">
  <h1 class="text-2xl font-bold">{isRegister ? 'Register' : 'Login'}</h1>
  {#if error}
    <p class="text-red-500">{error}</p>
  {/if}
  <input class="border p-2 rounded w-64" placeholder="Email" bind:value={email} />
  <input type="password" class="border p-2 rounded w-64" placeholder="Password" bind:value={password} />
  <button class="bg-blue-600 text-white px-4 py-2 rounded" on:click={submit}>
    {isRegister ? 'Register' : 'Login'}
  </button>
  <button class="text-sm text-gray-600 underline" on:click={() => isRegister = !isRegister}>
    {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
  </button>
</div>
