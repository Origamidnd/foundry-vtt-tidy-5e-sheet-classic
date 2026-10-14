<script lang="ts">
  import { CONSTANTS } from 'src/constants';
  import GroupMemberListItem from './GroupMemberListItem.svelte';
  import { getContext } from 'svelte';
  import type { GroupMemberSection } from 'src/types/group.types';
  import { FoundryAdapter } from 'src/foundry/foundry-adapter';
  import TidyTable from 'src/components/table/TidyTable.svelte';
  import TidyTableHeaderRow from 'src/components/table/TidyTableHeaderRow.svelte';
  import TidyTableHeaderCell from 'src/components/table/TidyTableHeaderCell.svelte';
  import HorizontalLineSeparator from 'src/components/layout/HorizontalLineSeparator.svelte';
  import { getGroupSheetClassicContext } from 'src/sheets/sheet-context.svelte';
  import { getSearchResultsContext } from 'src/features/search/search.svelte';

  interface Props {
    section: GroupMemberSection;
  }

  let { section }: Props = $props();

  const searchResults = getSearchResultsContext();

  const context = $derived(getGroupSheetClassicContext());

  const memberEntries = $derived(section.members.map((member) => ({ member })));

  const localize = FoundryAdapter.localize;

  const npcMembers = $derived(
    section.members.filter((actor) => actor.type === CONSTANTS.SHEET_TYPE_NPC),
  );

  // A quiet long rest for every NPC in the section: restores everything without dialogs or chat messages.
  async function refreshNpcs(event: Event) {
    event.stopPropagation();
    await Promise.all(
      npcMembers.map((actor) =>
        actor._rest({ type: 'long', dialog: false, chat: false, newDay: true }),
      ),
    );
    context.actor.sheet.render();
  }
</script>

<TidyTable key={section.key} data-custom-section={section.custom ? true : null}>
  {#snippet header()}
    <TidyTableHeaderRow>
      <TidyTableHeaderCell primary={true}>
        {localize(section.label)}
      </TidyTableHeaderCell>
      {#if context.isGM && npcMembers.length}
        <TidyTableHeaderCell
          baseWidth="2.25rem"
          title={localize('TIDY5E.NPC.Refresh.Group.label')}
        >
          <button
            type="button"
            class="inline-icon-button"
            aria-label={localize('TIDY5E.NPC.Refresh.Group.label')}
            onclick={refreshNpcs}
          >
            <i class="fa-solid fa-arrows-rotate"></i>
          </button>
        </TidyTableHeaderCell>
      {/if}
    </TidyTableHeaderRow>
  {/snippet}
  {#snippet body()}
    <div class="flex-column small-gap mt-2">
      {#each memberEntries as { member }, index (member.uuid)}
        {#if searchResults.show(member.uuid)}
          <GroupMemberListItem
            {member}
            ctx={context.memberContext[member.id]}
          />

          {#if section.members.length > 1 && index !== section.members.length - 1}
            <HorizontalLineSeparator class="mx-1" borderColor="separator" />
          {/if}
        {/if}
      {/each}
    </div>
  {/snippet}
</TidyTable>
