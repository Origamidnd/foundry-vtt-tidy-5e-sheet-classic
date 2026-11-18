<script lang="ts">
  import { FoundryAdapter } from 'src/foundry/foundry-adapter';

  const localize = FoundryAdapter.localize;

  // The system's own status label is translated by the dnd5e language packs.
  const label =
    CONFIG.statusEffects?.find?.((s: any) => s.id === 'antimagic')?.name ??
    'TIDY5E.SHEET.Antimagic.label';
</script>

<div
  class="tidy-antimagic-notice"
  role="note"
  data-tooltip={localize('TIDY5E.SHEET.Antimagic.warning')}
>
  <svg
    class="antimagic-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M2.925 2.933a1.793 1.793 0 0 1 2.543 0L9.375 6.84A7.22 7.22 0 0 1 14.4 4.8h22.8a3.6 3.6 0 0 1 3.6 3.6V30a3.61 3.61 0 0 1-2.4 3.398v2.467l6.675 6.675a1.793 1.793 0 0 1 0 2.543 1.8 1.8 0 0 1-2.542 0L2.925 5.483a1.793 1.793 0 0 1 0-2.543zm15.57 8.107-.007-.007-.885 1.77-1.508.757 3.96 3.96.758-1.507 1.77-.885a.8.8 0 0 0 0-1.433l-1.77-.885-.885-1.77a.8.8 0 0 0-1.433 0M7.2 36V14.835L25.965 33.6H14.4A2.397 2.397 0 0 0 12 36c0 1.328 1.073 2.4 2.4 2.4h16.365l4.8 4.8H14.4A7.2 7.2 0 0 1 7.2 36m20.94-20.055-1.5 3.495-3.262 1.403 2.662 2.662.6.255.255.6 2.663 2.663 1.402-3.263 3.495-1.5a.716.716 0 0 0 0-1.32l-3.495-1.5-1.5-3.495a.716.716 0 0 0-1.32 0"
    />
  </svg>
  <span class="label">{localize(label)}</span>
  <span class="warning">{localize('TIDY5E.SHEET.Antimagic.warning')}</span>
</div>

<style lang="less">
  .tidy-antimagic-notice {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin: 0.25rem 0;
    padding: 0.25rem 0.5rem;
    border-radius: 0.3125rem;
    border: 1px solid #c8871a;
    background: rgba(212, 128, 26, 0.15);
    color: #b06a10;
    font-size: 0.8125rem;
    cursor: help;

    .antimagic-icon {
      flex-shrink: 0;
      width: 1.125rem;
      height: 1.125rem;
    }

    .label {
      font-weight: 700;
    }

    .warning {
      opacity: 0.85;
      font-style: italic;
    }
  }

  :global(.tidy-antimagic-dim) {
    filter: grayscale(0.85);
    opacity: 0.6;
  }
</style>
