# Feature documentation coverage

Audited against the v3.4.0 source on 2026-10-09. Every guide section includes a focused screenshot of the relevant application controls. Screenshots use temporary sample data; captions identify the controls to inspect.

Edit `guide-content.json`, then run `python scripts/build-docs.py`. Run `python scripts/check-docs.py` to validate local links, anchors, images, coverage, and search entries.

| Feature | Implementation | Guide | Focused image |
|---|---|---|---|
| Choose your first workflow | `src/panel.js; src/render.js; src/bootstrap.js` | [Overview & feature directory](./index.html#start) | [Screenshot](./assets/screen-panel.png) |
| All features at a glance | `src/panel.js; src/render.js; src/bootstrap.js` | [Overview & feature directory](./index.html#features) | [Screenshot](./assets/screen-toolbar.png) |
| How the parts fit together | `src/panel.js; src/render.js; src/bootstrap.js` | [Overview & feature directory](./index.html#concepts) | [Screenshot](./assets/screen-hierarchy.png) |
| Search, examples & release notes | `src/panel.js; src/render.js; src/bootstrap.js` | [Overview & feature directory](./index.html#docs) | [Screenshot](./assets/screen-panel.png) |
| Install or update | `src/panel.js; src/bootstrap.js; src/native.js` | [Getting started & panel](./getting-started.html#install) | [Screenshot](./assets/screen-install.png) |
| Create your first folder | `src/panel.js; src/bootstrap.js; src/native.js` | [Getting started & panel](./getting-started.html#first-folder) | [Screenshot](./assets/screen-folder-menu.png) |
| Toolbar & status | `src/panel.js; src/bootstrap.js; src/native.js` | [Getting started & panel](./getting-started.html#toolbar) | [Screenshot](./assets/screen-toolbar.png) |
| Search names & identifiers | `src/panel.js; src/bootstrap.js; src/native.js` | [Getting started & panel](./getting-started.html#search-prompts) | [Screenshot](./assets/screen-search.png) |
| Move, resize & minimize | `src/panel.js; src/bootstrap.js; src/native.js` | [Getting started & panel](./getting-started.html#layout) | [Screenshot](./assets/screen-panel.png) |
| Native Prompt Manager integration | `src/panel.js; src/bootstrap.js; src/native.js` | [Getting started & panel](./getting-started.html#compatibility) | [Screenshot](./assets/screen-panel.png) |
| Create, nest, rename & collapse | `src/folders.js; src/render.js; src/dnd.js` | [Folders & ordering](./folders.html#hierarchy) | [Screenshot](./assets/screen-hierarchy.png) |
| Master mute & restore | `src/folders.js; src/render.js; src/dnd.js` | [Folders & ordering](./folders.html#mute) | [Screenshot](./assets/screen-muted.png) |
| Enable ALL & Disable ALL | `src/folders.js; src/render.js; src/dnd.js` | [Folders & ordering](./folders.html#force-all) | [Screenshot](./assets/screen-hierarchy.png) |
| Read mixed & suppressed states | `src/folders.js; src/render.js; src/dnd.js` | [Folders & ordering](./folders.html#indicators) | [Screenshot](./assets/screen-hierarchy.png) |
| Move & reorder with drag and drop | `src/folders.js; src/render.js; src/dnd.js` | [Folders & ordering](./folders.html#move) | [Screenshot](./assets/screen-prompt-controls.png) |
| Move several items together | `src/folders.js; src/render.js; src/dnd.js` | [Folders & ordering](./folders.html#multi-select) | [Screenshot](./assets/screen-selection.png) |
| Protect prompts from filters | `src/folders.js; src/render.js; src/dnd.js` | [Folders & ordering](./folders.html#exclusions) | [Screenshot](./assets/screen-prompt-controls.png) |
| Folder menu, export & deletion | `src/folders.js; src/render.js; src/dnd.js` | [Folders & ordering](./folders.html#actions) | [Screenshot](./assets/screen-folder-menu.png) |
| Create & insert prompts | `src/native.js; src/prompt-tags.js; src/render.js` | [Prompts & tags](./prompts.html#create) | [Screenshot](./assets/screen-prompt-menu.png) |
| Edit, rename & enable | `src/native.js; src/prompt-tags.js; src/render.js` | [Prompts & tags](./prompts.html#edit) | [Screenshot](./assets/screen-editor.png) |
| Add & remove multiple tags | `src/native.js; src/prompt-tags.js; src/render.js` | [Prompts & tags](./prompts.html#tags) | [Screenshot](./assets/prompt-tags-editor.png) |
| Use tags to filter & automate | `src/native.js; src/prompt-tags.js; src/render.js` | [Prompts & tags](./prompts.html#tag-workflows) | [Screenshot](./assets/screen-filter-tag.png) |
| View content & tags read-only | `src/native.js; src/prompt-tags.js; src/render.js` | [Prompts & tags](./prompts.html#view) | [Screenshot](./assets/screen-prompt-view.png) |
| Preview all enabled prompts | `src/native.js; src/prompt-tags.js; src/render.js` | [Prompts & tags](./prompts.html#preview) | [Screenshot](./assets/screen-preview.png) |
| Move, export, import beside & remove | `src/native.js; src/prompt-tags.js; src/render.js` | [Prompts & tags](./prompts.html#row-actions) | [Screenshot](./assets/screen-prompt-menu.png) |
| Open, match, inspect, then act | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#workflow) | [Screenshot](./assets/screen-filter-word.png) |
| Global & folder-scoped matching | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#scope) | [Screenshot](./assets/screen-filter-scope.png) |
| Word matching & case sensitivity | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#word) | [Screenshot](./assets/screen-filter-word.png) |
| Regex matching | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#regex) | [Screenshot](./assets/screen-filter-regex.png) |
| XML tags & parameters | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#xml) | [Screenshot](./assets/screen-filter-xml.png) |
| Regex: list matched values | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#regex-values) | [Screenshot](./assets/screen-filter-regexValues.png) |
| Prompt tag matching | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#tags) | [Screenshot](./assets/screen-filter-tag.png) |
| Prompt & containing-folder targets | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#targets) | [Screenshot](./assets/screen-filter-tag.png) |
| Manual filter exclusions | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#exclusions) | [Screenshot](./assets/screen-prompt-controls.png) |
| Check recent chat manually | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#chat) | [Screenshot](./assets/screen-chat-filter.png) |
| XML-derived values in chat | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#chat-xml) | [Screenshot](./assets/screen-chat-xml.png) |
| Choose what a Chat action affects | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#chat-effect) | [Screenshot](./assets/screen-chat-effect.png) |
| Save a reusable action | `src/bulk-match.js; src/auto-filter.js; src/prompt-tags.js` | [Manual Filter](./filters.html#save) | [Screenshot](./assets/screen-presets.png) |
| Save & run a preset | `src/bulk-match.js; src/filter-groups.js; src/preset-import-export.js` | [Filter presets](./presets.html#save) | [Screenshot](./assets/screen-presets.png) |
| Content presets & Chat presets | `src/bulk-match.js; src/filter-groups.js; src/preset-import-export.js` | [Filter presets](./presets.html#chat-presets) | [Screenshot](./assets/screen-chat-presets.png) |
| Locks & group switches | `src/bulk-match.js; src/filter-groups.js; src/preset-import-export.js` | [Filter presets](./presets.html#locks) | [Screenshot](./assets/screen-presets.png) |
| Create, nest & manage groups | `src/bulk-match.js; src/filter-groups.js; src/preset-import-export.js` | [Filter presets](./presets.html#groups) | [Screenshot](./assets/screen-presets.png) |
| Export one preset or import a collection | `src/bulk-match.js; src/filter-groups.js; src/preset-import-export.js` | [Filter presets](./presets.html#transfer) | [Screenshot](./assets/screen-presets.png) |
| Remove presets without removing prompts | `src/bulk-match.js; src/filter-groups.js; src/preset-import-export.js` | [Filter presets](./presets.html#delete) | [Screenshot](./assets/screen-presets.png) |
| Create your first rule | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#first-rule) | [Screenshot](./assets/screen-auto-rule.png) |
| Conditions & message depth | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#conditions) | [Screenshot](./assets/screen-auto-rule.png) |
| Use XML values as chat vocabulary | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#xml) | [Screenshot](./assets/screen-auto-xml.png) |
| Choose effect prompts & folders | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#effects) | [Screenshot](./assets/screen-auto-manual.png) |
| Enable/Disable & the opposite outcome | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#actions) | [Screenshot](./assets/screen-auto-rule.png) |
| When rules run | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#timing) | [Screenshot](./assets/auto-timing.png) |
| Execution order & conflicting rules | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#order) | [Screenshot](./assets/screen-auto-list.png) |
| Edit, pause, delete & group rules | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#manage) | [Screenshot](./assets/screen-auto-list.png) |
| Auto Filter exclusions | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#exclusions) | [Screenshot](./assets/screen-prompt-controls.png) |
| Import & export rules | `src/auto-filter.js; src/filter-groups.js; src/bulk-match.js` | [Auto Filter](./auto-filter.html#transfer) | [Screenshot](./assets/screen-auto-list.png) |
| Export the full prompt list | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#export) | [Screenshot](./assets/screen-transfer-menu.png) |
| Export one prompt or folder | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#scoped-export) | [Screenshot](./assets/screen-folder-menu.png) |
| Choose a prompt-list import mode | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#import-modes) | [Screenshot](./assets/screen-transfer-menu.png) |
| How matching & duplicates work | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#matching) | [Screenshot](./assets/screen-conflicts.png) |
| What happens to tags | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#tags) | [Screenshot](./assets/prompt-tags-editor.png) |
| Native & older file compatibility | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#compatibility) | [Screenshot](./assets/screen-transfer-menu.png) |
| Import append after a row | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#scoped-import) | [Screenshot](./assets/screen-prompt-menu.png) |
| Transfer preset & rule collections | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#preset-files) | [Screenshot](./assets/screen-presets.png) |
| Unlist versus permanent deletion | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#deletion) | [Screenshot](./assets/screen-delete.png) |
| Remove all: choose the affected scope | `src/import-export.js; src/prompt-list-import.js; src/preset-import-export.js; src/render.js` | [Import, export & removal](./backups.html#remove-all) | [Screenshot](./assets/screen-remove-all.png) |
| Panel or prompt list is missing | `src/native.js; src/bulk-match.js; src/auto-filter.js; src/prompt-list-import.js` | [Troubleshooting](./troubleshooting.html#missing) | [Screenshot](./assets/screen-toolbar.png) |
| A toggle looks on but the prompt is absent | `src/native.js; src/bulk-match.js; src/auto-filter.js; src/prompt-list-import.js` | [Troubleshooting](./troubleshooting.html#states) | [Screenshot](./assets/screen-muted.png) |
| Filter finds no matches or too many | `src/native.js; src/bulk-match.js; src/auto-filter.js; src/prompt-list-import.js` | [Troubleshooting](./troubleshooting.html#no-matches) | [Screenshot](./assets/screen-filter-scope.png) |
| Auto Filter behaves unexpectedly | `src/native.js; src/bulk-match.js; src/auto-filter.js; src/prompt-list-import.js` | [Troubleshooting](./troubleshooting.html#automation) | [Screenshot](./assets/auto-timing.png) |
| Import errors or missing metadata | `src/native.js; src/bulk-match.js; src/auto-filter.js; src/prompt-list-import.js` | [Troubleshooting](./troubleshooting.html#imports) | [Screenshot](./assets/screen-transfer-menu.png) |
| Slow scans, busy state & content previews | `src/native.js; src/bulk-match.js; src/auto-filter.js; src/prompt-list-import.js` | [Troubleshooting](./troubleshooting.html#performance) | [Screenshot](./assets/screen-search.png) |
| Report a reproducible problem | `src/native.js; src/bulk-match.js; src/auto-filter.js; src/prompt-list-import.js` | [Troubleshooting](./troubleshooting.html#report) | [Screenshot](./assets/screen-panel.png) |
