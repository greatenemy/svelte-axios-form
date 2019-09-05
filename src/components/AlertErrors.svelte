{#if form.errors.any()}
  <div class="alert alert-danger alert-dismissible" role="alert">
    {#if dismissible}
    <button type="button" class="close" aria-label="Close" on:click={() => form.clear()}>
      <span aria-hidden="true">&times;</span>
    </button>
    {/if}

    {#if message}
      {@html message}
    {/if}

    <ul>
      {#each form.errors.flatten() as error}
      <li v-for="error in form.errors.flatten()">
        {@html error}
      </li>
      {/each}
    </ul>
  </div>
{/if}

<script>
export let form
export let dismissible = true;
export let message = 'There were some problems with your input.';
</script>
