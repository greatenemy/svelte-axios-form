{#if form.successful}
  <div v-if="form.successful" class="alert alert-success alert-dismissible" role="alert">
    {#if dismissible}
    <button type="button" class="close" aria-label="Close" on:click={() => form.clear()}>
      <span aria-hidden="true">&times;</span>
    </button>
    {/if}

    <slot>
      {@html message}
    </slot>
  </div>
{/if}

<script>
export let form
export let dismissible = true;
export let message = '';
</script>
