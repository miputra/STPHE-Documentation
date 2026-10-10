# Maintaining feature screenshots

Every section in `guide-content.json` requires a `screenshot` array: PNG filename, a caption describing visible controls, pixel width, and pixel height. The builder places this screenshot before the section’s instructions. Use real application captures; do not replace them with illustrated instructions.

The `screen-*.png` assets were captured from STPHE v3.4.0 running in SillyTavern 1.18.0 on 2026-10-09. They use temporary sample prompts (Rain ambience, Thunder, Tavern dialogue, and Main instructions). The existing tag-editor and automation-timing captures are retained where they show the exact controls being explained. Theme colors can vary.

To refresh captures, run `node scripts/capture-docs.cjs` with Playwright installed and Microsoft Edge available. `ST_URL` defaults to `http://localhost:8000`; set `PLAYWRIGHT_MODULE` to an absolute package path if Playwright is not locally resolvable. The extension must be available at `/scripts/extensions/third-party/prompt-folders/`.

The script uses a fresh browser session, replaces prompt data only in that session’s memory, and blocks save/delete/import/upload/rename/generation API requests. It opens installation and conflict dialogs without confirming them. The capture session sets the host HTML root to viewport height to avoid headless clipping of fixed dialogs. Captures are cropped to the relevant UI; no chat content is included. It also updates image dimensions in the guide source. Run against a local development instance, then visually check each capture and caption, especially after a SillyTavern update.

Run `python scripts/build-docs.py` followed by `python scripts/check-docs.py`. The checker verifies a PNG screenshot in each feature section, actual image dimensions, links, anchors, and search coverage. Review desktop and narrow mobile layouts before publishing. Reuse a screenshot only when it visibly contains the controls explained by both sections.
