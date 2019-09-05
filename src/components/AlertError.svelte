{#if form.errors.any()}
  <div class="alert alert-danger alert-dismissible" role="alert">
    {#if dismissible}
    <button type="button" class="close" aria-label="Close" on:click={() => form.clear()}>
      <span aria-hidden="true">&times;</span>
    </button>
    {/if}

    <slot>
      {#if form.errors.has('error')}
        {@html form.errors.get('error')}
      {:else}
        {@html message}
      {/if}
    </slot>
  </div>
{/if}

<script>
export let form
export let dismissible = true;
export let message = 'There were some problems with your input.';
</script>
