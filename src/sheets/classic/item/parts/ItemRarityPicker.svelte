<script lang="ts">
  import { FoundryAdapter } from 'src/foundry/foundry-adapter';

  interface Props {
    /** The item whose `system.rarities` set is edited. */
    document: any;
    /** Currently selected rarity keys (dnd5e 6 stores a set of rarities). */
    rarities: string[];
    appId: string;
    editable: boolean;
  }

  let { document, rarities, appId, editable }: Props = $props();

  const localize = FoundryAdapter.localize;

  const COLORS: Record<string, string> = {
    common: '#8a8a8a',
    uncommon: '#3c9a3c',
    rare: '#3a6fd1',
    veryRare: '#8b3cc4',
    legendary: '#d4801a',
    artifact: '#c0392b',
  };

  let options = $derived(
    Object.entries(CONFIG.DND5E.itemRarity as Record<string, string>).map(
      ([value, label]) => ({
        value,
        label,
        selected: rarities.includes(value),
      }),
    ),
  );

  let varies = $derived(rarities.length > 1);

  let gradient = $derived(
    varies
      ? `linear-gradient(90deg, ${rarities
          .map((r) => COLORS[r] ?? 'var(--t5e-primary-font-color)')
          .join(', ')})`
      : undefined,
  );

  let variesTitle = $derived(
    rarities
      .map((r) => (CONFIG.DND5E.itemRarity as Record<string, string>)[r] ?? r)
      .join(', '),
  );

  let open = $state(false);

  async function saveSingle(
    ev: Event & { currentTarget: EventTarget & HTMLSelectElement },
  ) {
    const value = ev.currentTarget.value;
    await document.update({ 'system.rarities': value ? [value] : [] });
  }

  async function toggle(key: string, checked: boolean) {
    const next = rarities.filter((r) => r !== key);
    if (checked) next.push(key);
    // Keep the configured order, so gradients read from low to high rarity.
    const order = Object.keys(CONFIG.DND5E.itemRarity);
    next.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    await document.update({ 'system.rarities': next });
  }
</script>

<div class="tidy-rarity-picker">
  {#if varies}
    <span
      class="rarity-varies"
      style:background-image={gradient}
      data-tooltip={variesTitle}
    >
      {localize('DND5E.ITEM.Rarity.Varies')}
    </span>
  {:else}
    <select
      id="{appId}-rarity"
      class="item-rarity"
      value={rarities[0] ?? ''}
      disabled={!editable}
      onchange={saveSingle}
    >
      <option value="">{localize('DND5E.Rarity')}</option>
      {#each options as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {/if}
  {#if editable}
    <button
      type="button"
      class="inline-icon-button rarity-multi-toggle"
      class:active={open}
      data-tooltip={localize('DND5E.Rarity')}
      onclick={() => (open = !open)}
    >
      <i class="fa-solid fa-list-check"></i>
    </button>
    {#if open}
      <div class="rarity-multi-popover">
        {#each options as option (option.value)}
          <label class="checkbox" for="{appId}-rarity-multi-{option.value}">
            <input
              type="checkbox"
              id="{appId}-rarity-multi-{option.value}"
              checked={option.selected}
              onchange={(ev) => toggle(option.value, ev.currentTarget.checked)}
            />
            <span style:color={COLORS[option.value]}>{option.label}</span>
          </label>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style lang="less">
  .tidy-rarity-picker {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }

  .rarity-varies {
    display: inline-block;
    padding: 0 0.25rem;
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: var(--form-field-height, 1.625rem);
    background-color: transparent !important;
    background-clip: text !important;
    -webkit-background-clip: text !important;
    color: transparent !important;
    -webkit-text-fill-color: transparent;
    cursor: help;
  }

  .rarity-multi-toggle {
    font-size: 0.75rem;
    opacity: 0.6;

    &.active,
    &:hover {
      opacity: 1;
    }
  }

  .rarity-multi-popover {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    padding: 0.375rem 0.5rem;
    border-radius: 0.3125rem;
    background: var(--t5e-context-menu-background, var(--t5e-background));
    border: 1px solid var(--t5e-light-color, #9994);
    box-shadow: 0 0.25rem 0.75rem #0005;
    white-space: nowrap;

    label {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.8125rem;
    }
  }
</style>
