# Tidy 5e Sheets Classic

The **Classic** character, NPC, vehicle, group, encounter, item and container sheets from
[Tidy 5e Sheets](https://github.com/kgar/foundry-vtt-tidy-5e-sheets), restored for
**Foundry VTT v14** and the **D&D 5e system 6.0**.

Tidy 5e Sheets 14.0 removed its Classic sheets. This module brings them back as a separate
module so that some players can keep using the Classic layout while others use the new
Tidy sheets from the official module.

## Compatibility

| | Version |
|---|---|
| Foundry VTT | 14 |
| D&D 5e system | 6.0.x |

## Installation

In Foundry's **Add-on Modules** → **Install Module**, paste this manifest URL:

```
https://github.com/Origamidnd/foundry-vtt-tidy-5e-sheet-classic/releases/latest/download/module.json
```

## Use alongside the official Tidy 5e Sheets

Both modules can be enabled in the same world.

- This module only registers the **Classic** sheets. Pick one per actor from the sheet
  configuration menu, or set the default for a document type in **Configure Sheets**.
- Settings, user preferences and sheet flags of this module are stored separately
  from the official module (under the module id `tidy5e-sheet-classic`), so nothing is
  shared or overwritten.
- Tidy's public hooks (`tidy5e-sheet.*`) are not re-emitted. This module uses its own
  `tidy5e-sheet-classic.*` prefix, so integrations that extend the official Tidy keep
  working with the official module only.

## Translations

The Russian translation is a copy of the one from the
[Russian Translation](https://github.com/phenomen/foundry-vtt-ru) package. Other
languages come from the files shipped with Tidy 5e Sheets. Strings without a
translation fall back to English.

## Known limitations

- The Classic sheets are the Tidy 5e Sheets 13.10.5 codebase adapted for Foundry 14 and dnd5e 6.
  Please report visual glitches or errors in the issue tracker.
- A few vehicle strings and the advancement configuration labels use new keys; some
  strings are English-only where no translation exists.

## Building from source

Requires Node.js.

```bash
npm ci
npx vite build
```

The build output is written to `dist/`. Copy its contents into a folder named
`tidy5e-sheet-classic` inside your Foundry `Data/modules` directory.

## Credits and license

This is a fork of [Tidy 5e Sheets](https://github.com/kgar/foundry-vtt-tidy-5e-sheets), created by
sdenec, maintained by p4535992 and then by kgar. All credit for the sheets goes to them and
to the contributors of the original project. This module is not affiliated with or endorsed by
the original authors.

Released under the MIT License, the same license as the original project. See `LICENSE.txt`.
