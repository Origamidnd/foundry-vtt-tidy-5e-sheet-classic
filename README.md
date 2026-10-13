# Tidy 5e Sheets Classic

**Русский** | [English](#english)

---

## Русский

**Классические** листы персонажа, NPC, транспорта, группы, энкаунтера, предметов и контейнеров из
[Tidy 5e Sheets](https://github.com/kgar/foundry-vtt-tidy-5e-sheets), возвращённые для
**Foundry VTT v14** и **системы D&D 5e 6.0**.

В Tidy 5e Sheets 14.0 классические листы убрали. Этот модуль возвращает их отдельным модулем, чтобы часть игроков
могла пользоваться классическим оформлением, а остальные - новыми листами официального Tidy.

### Совместимость

| | Версия |
|---|---|
| Foundry VTT | 14 |
| Система D&D 5e | 6.0.x |

### Установка

В Foundry откройте **Add-on Modules** → **Install Module** и вставьте ссылку на манифест:

```
https://github.com/Origamidnd/foundry-vtt-tidy-5e-sheet-classic/releases/latest/download/module.json
```

### Работа вместе с официальным Tidy 5e Sheets

Оба модуля можно включить в одном мире.

- Этот модуль регистрирует только **классические** листы. Выбрать лист для актёра можно в меню настройки листа
  (три точки в заголовке), а лист по умолчанию для типа документов задаётся в **Configure Sheets**.
  В списке лист называется "Tidy 5e Классический бланк персонажа" (для остальных типов аналогично).
- Настройки, пользовательские параметры и флаги листов этого модуля хранятся отдельно от официального модуля
  (под идентификатором модуля `tidy5e-sheet-classic`), поэтому ничего не пересекается и не перезаписывается.
- Публичные хуки Tidy (`tidy5e-sheet.*`) здесь не вызываются. Модуль использует собственный префикс
  `tidy5e-sheet-classic.*`, поэтому интеграции, расширяющие официальный Tidy, продолжают работать только с официальным модулем.

### Интеграции с другими модулями

Встроенные интеграции Tidy сохранены и работают, когда соответствующий модуль включён: Popout, Custom Character
Sheet Sections, Drakkenheim (три модуля), MCDM Class Bundle, D&D Tasha's Cauldron, а также выбор цвета (Coloris) и секции
на стандартном листе предмета.

Сторонние модули, которые подключаются к официальному Tidy по имени модуля (`game.modules.get("tidy5e-sheet")`),
по хукам `tidy5e-sheet.*`, по CSS-классу `tidy5e-sheet` или по флагам `flags.tidy5e-sheet.*`, на классических листах свои
надстройки не применяют. Основная механика (броски, применение предметов и эффектов) идёт через систему dnd5e
и от Tidy не зависит. Примеры такой привязки к официальному Tidy, замеченные в реальном мире: Midi-QOL, DAE,
Auto-Animations, Plutonium (CSS-заплатка), CAT, Quick Insert, Tokenizer, а также модули, которые меняют внешний вид
листов по классу `tidy5e-sheet` (например, скрытие спасбросков смерти), и автоматическая группировка предметов по секциям
Tidy у Chris's Premades. На классических листах эти надстройки могут не появляться.

### Переводы

Русский перевод скопирован из пакета [Russian Translation](https://github.com/phenomen/foundry-vtt-ru). Остальные языки
берутся из файлов, поставляемых с Tidy 5e Sheets. Строки без перевода показываются на английском.

### Известные ограничения

- Классические листы - это кодовая база Tidy 5e Sheets 13.10.5, адаптированная под Foundry 14 и dnd5e 6. О визуальных
  огрехах и ошибках пишите в разделе issues.
- Несколько строк листа транспорта и подписи режима настройки улучшений используют новые ключи; часть строк остаётся
  на английском, где перевода нет.
- Интеграции других модулей с официальным Tidy на классических листах не работают (см. выше).

### Сборка из исходников

Нужен Node.js.

```bash
npm ci
npx vite build
```

Результат сборки появится в `dist/`. Скопируйте его содержимое в папку `tidy5e-sheet-classic` внутри каталога
`Data/modules` вашего Foundry.

### Авторы и лицензия

Это ответвление [Tidy 5e Sheets](https://github.com/kgar/foundry-vtt-tidy-5e-sheets). Классические листы создал
sdenec, затем их поддерживали p4535992 и kgar. Вся заслуга за сами листы принадлежит им и участникам оригинального
проекта. Этот модуль не связан с авторами оригинала и ими не одобрен.

Распространяется по лицензии MIT, как и оригинал. См. `LICENSE.txt`.

---

<a id="english"></a>

## English

The **Classic** character, NPC, vehicle, group, encounter, item and container sheets from
[Tidy 5e Sheets](https://github.com/kgar/foundry-vtt-tidy-5e-sheets), restored for
**Foundry VTT v14** and the **D&D 5e system 6.0**.

Tidy 5e Sheets 14.0 removed its Classic sheets. This module brings them back as a separate
module so that some players can keep using the Classic layout while others use the new
Tidy sheets from the official module.

### Compatibility

| | Version |
|---|---|
| Foundry VTT | 14 |
| D&D 5e system | 6.0.x |

### Installation

In Foundry's **Add-on Modules** → **Install Module**, paste this manifest URL:

```
https://github.com/Origamidnd/foundry-vtt-tidy-5e-sheet-classic/releases/latest/download/module.json
```

### Use alongside the official Tidy 5e Sheets

Both modules can be enabled in the same world.

- This module only registers the **Classic** sheets. Pick one per actor from the sheet
  configuration menu (the three dots in the sheet header), or set the default for a document type in
  **Configure Sheets**.
- Settings, user preferences and sheet flags of this module are stored separately
  from the official module (under the module id `tidy5e-sheet-classic`), so nothing is
  shared or overwritten.
- Tidy's public hooks (`tidy5e-sheet.*`) are not re-emitted. This module uses its own
  `tidy5e-sheet-classic.*` prefix, so integrations that extend the official Tidy keep
  working with the official module only.

### Integrations with other modules

Tidy's built-in integrations are kept and work when the matching module is enabled: Popout, Custom Character Sheet
Sections, Drakkenheim (three modules), MCDM Class Bundle, D&D Tasha's Cauldron, the Coloris color picker and
custom sections on the default item sheet.

Third-party modules that attach to the official Tidy by module id (`game.modules.get("tidy5e-sheet")`), by the
`tidy5e-sheet.*` hooks, by the `tidy5e-sheet` CSS class or by `flags.tidy5e-sheet.*` flags do not apply their
add-ons on the Classic sheets. Core mechanics (rolls, using items, applying effects) go through the dnd5e system
and do not depend on Tidy. Examples of such ties to the official Tidy seen in a real world: Midi-QOL, DAE,
Auto-Animations, Plutonium (CSS patch), CAT, Quick Insert, Tokenizer, modules that restyle sheets by the
`tidy5e-sheet` class (for example, hiding death saves) and the automatic grouping of items into Tidy sections by
Chris's Premades. These add-ons may not show up on the Classic sheets.

### Translations

The Russian translation is a copy of the one from the
[Russian Translation](https://github.com/phenomen/foundry-vtt-ru) package. Other
languages come from the files shipped with Tidy 5e Sheets. Strings without a
translation fall back to English.

### Known limitations

- The Classic sheets are the Tidy 5e Sheets 13.10.5 codebase adapted for Foundry 14 and dnd5e 6.
  Please report visual glitches or errors in the issue tracker.
- A few vehicle strings and the advancement configuration labels use new keys; some
  strings are English-only where no translation exists.
- Integrations of other modules with the official Tidy do not work on the Classic sheets (see above).

### Building from source

Requires Node.js.

```bash
npm ci
npx vite build
```

The build output is written to `dist/`. Copy its contents into a folder named
`tidy5e-sheet-classic` inside your Foundry `Data/modules` directory.

### Credits and license

This is a fork of [Tidy 5e Sheets](https://github.com/kgar/foundry-vtt-tidy-5e-sheets), created by
sdenec, maintained by p4535992 and then by kgar. All credit for the sheets goes to them and
to the contributors of the original project. This module is not affiliated with or endorsed by
the original authors.

Released under the MIT License, the same license as the original project. See `LICENSE.txt`.
