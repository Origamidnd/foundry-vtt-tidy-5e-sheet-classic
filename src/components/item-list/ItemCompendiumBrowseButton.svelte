<script lang="ts">
  import { CONSTANTS } from 'src/constants';
  import { ItemCompendiumBrowse } from 'src/features/compendium/ItemCompendiumBrowse';
  import { settings } from 'src/settings/settings.svelte';
  import type { Actor5e } from 'src/types/types';

  interface Props {
    actor: Actor5e;
    /** The item types the section accepts. */
    sectionTypes: string[];
    /** The section's creation data. */
    dataset?: Record<string, any>;
  }

  let { actor, sectionTypes, dataset }: Props = $props();

  let types = $derived(ItemCompendiumBrowse.getTypes(actor, sectionTypes));
  let canBrowse = $derived(
    actor.isOwner && ItemCompendiumBrowse.canBrowse(types),
  );
  let label = $derived(ItemCompendiumBrowse.getLabel(types));
</script>

{#if canBrowse}
  <button
    type="button"
    class="item-list-footer-button compendium-browse-button"
    onclick={(event) =>
      ItemCompendiumBrowse.addToActor(actor, types, dataset, event)}
    title={label}
    aria-label={label}
    data-tidy-sheet-part={CONSTANTS.SHEET_PARTS.ITEM_CREATE_COMMAND}
    tabindex={settings.value.useAccessibleKeyboardSupport ? 0 : -1}
  >
    <i class="fa-solid fa-book-atlas"></i>
  </button>
{/if}

<style lang="less">
  .compendium-browse-button {
    min-width: 0;
    padding: 0.125rem 0.75rem 0;
    margin-left: 0.25rem;
  }
</style>
