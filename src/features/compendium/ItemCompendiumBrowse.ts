import { CONSTANTS } from 'src/constants';
import { FoundryAdapter } from 'src/foundry/foundry-adapter';
import type { Actor5e } from 'src/types/types';

export class ItemCompendiumBrowse {
  /** Compendium item types, `undefined` = any */
  private static browsableCompendiumTypes: (string[] | undefined)[] | null =
    null;

  /**
   * Find all compendiums the browser would search (`CompendiumBrowser.fetch`).
   * The result is kept for the current tick so that a tab with many sections
   * does not repeat the lookup for every section.
   */
  private static getBrowsableCompendiumTypes(): (string[] | undefined)[] {
    if (this.browsableCompendiumTypes) {
      return this.browsableCompendiumTypes;
    }

    const sources =
      dnd5e.applications.settings.CompendiumBrowserSettingsConfig.collateSources();

    this.browsableCompendiumTypes = game.packs
      .filter(
        (pack: any) =>
          pack.metadata.type === CONSTANTS.DOCUMENT_NAME_ITEM &&
          pack.visible &&
          sources.has(pack.collection),
      )
      .map((pack: any) => pack.metadata.flags.dnd5e?.types);

    setTimeout(() => (this.browsableCompendiumTypes = null));

    return this.browsableCompendiumTypes!;
  }

  /**
   * Check if any available compendium can contain these types, so that the
   * button is not offered when the search would be empty.
   */
  static canBrowse(types: string[]): boolean {
    if (!types.length) {
      return false;
    }

    return this.getBrowsableCompendiumTypes().some(
      (packTypes) =>
        !packTypes || types.some((type) => packTypes.includes(type)),
    );
  }

  /** "Add Item from Compendium" unless the section has a single item type. */
  static getLabel(types: string[]): string {
    const name =
      types.length === 1
        ? FoundryAdapter.localize(CONFIG.Item.typeLabels[types[0]])
        : FoundryAdapter.localize('DOCUMENT.Item');

    return FoundryAdapter.localize('TIDY5E.CLASSIC.AddFromCompendium', {
      name,
    });
  }

  /**
   * The item types that can be added to an actor from a section. A section
   * that already holds its only allowed item (species, background) cannot
   * browse for another one.
   */
  static getTypes(actor: Actor5e, sectionTypes: string[]): string[] {
    return sectionTypes.filter(
      (type) =>
        !!CONFIG.Item.dataModels[type] &&
        (!CONFIG.Item.dataModels[type].metadata?.singleton ||
          !actor.itemTypes[type]?.length),
    );
  }

  /** Open the compendium browser locked to the item types. Resolves to the chosen UUID. */
  static selectOne(
    types: string[],
    detachOptions: Record<string, any>,
  ): Promise<string | null> {
    return dnd5e.applications.CompendiumBrowser.selectOne(
      {
        filters: {
          locked: {
            documentClass: CONSTANTS.DOCUMENT_NAME_ITEM,
            types: new Set(types),
          },
        },
      },
      detachOptions,
    );
  }

  /**
   * Let the user pick an item in the compendium browser and add it to the
   * actor in the given section. Only the section's `flags.*` data is applied
   * to the new item (custom section, advancement origin), the rest, like a
   * spell section's level, would overwrite the data of the chosen item.
   */
  static async addToActor(
    actor: Actor5e,
    types: string[],
    sectionData: Record<string, any> | undefined,
    event: Event,
  ) {
    if (!actor.isOwner) {
      return;
    }

    const uuid = await this.selectOne(types, actor.sheet._detachOptions());
    const item = uuid ? await fromUuid(uuid) : null;

    if (!item) {
      return;
    }

    const sectionFlags = Object.fromEntries(
      Object.entries(sectionData ?? {}).filter(([key]) =>
        key.startsWith('flags.'),
      ),
    );

    // Pass the document itself so that container contents are not lost.
    const itemData = foundry.utils.isEmpty(sectionFlags)
      ? item
      : foundry.utils.mergeObject(
          game.items.fromCompendium(item, { keepId: true }),
          foundry.utils.expandObject(sectionFlags),
        );

    return actor.sheet._onDropItemCreate(itemData, event, 'copy');
  }
}
