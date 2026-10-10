# STPHE Documentation

User guides and screenshots for [STPHE](https://github.com/miputra/STPHE), maintained independently from the installed extension.

**[Read the documentation](https://miputra.github.io/STPHE-Documentation/)**

## Edit and verify

Edit `docs/guide-content.json` for feature guides. `docs/credits.html` and `docs/reference.md` are maintained directly. Screenshots and shared styles live in `docs/assets/`.

From this repository's root, run:

```sh
python scripts/build-docs.py
python scripts/check-docs.py
python -m http.server 8001 --directory docs
```

Open http://localhost:8001 to preview. The build and checker use only Python's standard library. To also verify the implementation paths listed in the coverage inventory, run `python scripts/check-docs.py --program-root "PATH/TO/STPHE"` against a separate program checkout. See [screenshot maintenance](docs/screenshot-guide.md) for optional browser capture requirements.

## Publish

Push this repository to `miputra/STPHE-Documentation`. In **Settings → Pages → Build and deployment**, select **GitHub Actions**. The included workflow validates and publishes `docs/` after documentation changes on `main` or `master`, or when run manually.

The program's installation URL remains `https://github.com/miputra/STPHE`. Documentation changes belong here; they do not require a program version bump or a commit to the program repository.

The documentation was copied from program commit `1ac125d` without importing its Git history. `docs/TEST_REPORT.md` is the historical verification report referenced by the guides; program tests run in the program checkout.
