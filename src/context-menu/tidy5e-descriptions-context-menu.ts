import { FoundryAdapter } from 'src/foundry/foundry-adapter';
import type { ContextMenuEntry } from 'src/foundry/foundry.types';

/**
 * Context menu for rich-text descriptions (ported from the official Tidy 5e Sheets 14.2).
 * The element (or an ancestor) carries `data-prop` with the document property path;
 * inside it, `.tidy-desc-edit` is the edit button and `[data-field]` holds the rendered text.
 */
export function configureDescriptionsContextMenu(element: HTMLElement, app: any) {
  const prop = element.closest<HTMLElement>('[data-prop]')?.dataset.prop;

  if (!prop) {
    return;
  }

  ui.context.menuItems = getDescriptionsContextOptions(app, prop);
}

function getDescriptionsContextOptions(app: any, prop: string): ContextMenuEntry[] {
  const container = (target: HTMLElement) =>
    target.closest<HTMLElement>('[data-prop]');

  return [
    {
      name: FoundryAdapter.localize('DND5E.DescriptionEdit', {
        description: FoundryAdapter.localize('DND5E.Description'),
      }),
      icon: '<i class="fa-solid fa-feather fa-fw"></i>',
      condition: (target: HTMLElement) =>
        app.isEditable &&
        !!container(target)?.querySelector<HTMLElement>('.tidy-desc-edit'),
      callback: (target: HTMLElement) => {
        container(target)?.querySelector<HTMLElement>('.tidy-desc-edit')?.click();
      },
    },
    {
      name: 'TIDY5E.COMMON.Action.CopyToClipboard',
      icon: '<i class="fa-solid fa-copy fa-fw"></i>',
      callback: () => {
        const value = FoundryAdapter.getProperty(app.document, prop)?.toString();
        if (!value) return;
        game.clipboard.copyPlainText(value);
        ui.notifications.info(
          FoundryAdapter.localize('TIDY5E.COMMON.CopiedData', {
            prop: `<b>${prop}</b>`,
          }),
          { console: false },
        );
      },
    },
    {
      name: 'TIDY5E.COMMON.Action.CopyWithoutFormatting',
      icon: '<i class="fa-solid fa-text-slash fa-fw"></i>',
      callback: (target: HTMLElement) => {
        const text = container(target)?.querySelector<HTMLElement>(
          '[data-field]',
        )?.innerText;
        if (!text) return;
        game.clipboard.copyPlainText(text);
        ui.notifications.info(
          FoundryAdapter.localize('TIDY5E.COMMON.CopiedWithoutFormatting'),
          { console: false },
        );
      },
    },
    {
      name: 'DND5E.DisplayCard',
      icon: '<i class="fa-solid fa-message-arrow-up-right fa-fw"></i>',
      callback: () => {
        const value = FoundryAdapter.getProperty(app.document, prop)?.toString();
        if (!value) return;
        ChatMessage.create({
          content: value,
          speaker: ChatMessage.getSpeaker({ alias: app.document.name }),
        });
      },
    },
  ];
}
