import { settings } from 'src/settings/settings.svelte';

export class SpellScroll {
  /**
   * Builds a spell scroll from dropped spell data. When the spell came from a
   * compendium, the scroll is built from the compendium spell so that it gets
   * its Cast activity and additional spell.
   */
  static async create(
    itemData: any,
    compendiumUuid?: string,
  ): Promise<any | undefined> {
    const creationOptions: Record<string, unknown> = {};

    if (settings.value.includeFlagsInSpellScrollCreation) {
      creationOptions.flags = itemData.flags;
    }

    return compendiumUuid
      ? await Item.implementation.createScrollFromCompendiumSpell(
          compendiumUuid,
          creationOptions,
        )
      : await Item.implementation.createScrollFromSpell(
          itemData,
          creationOptions,
        );
  }
}
