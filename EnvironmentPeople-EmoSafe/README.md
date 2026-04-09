# Local Prototype Setup

This project can run in two ways:

- `npm run dev` for live editing
- static HTML export for showcase mode

## One-click launchers (Windows)

- Double-click `run-showcase.bat` to install, export, and run the static showcase at `http://localhost:4173` (self-contained launcher, no `scripts/` dependency).
- Double-click `run-dev.bat` to install and run the dev server at `http://localhost:3000`.
- If Windows shows a security prompt, choose **More info** -> **Run anyway**.

## 1) Install dependencies

```bash
npm install
```

## 2) Build static HTML output

```bash
npm run export
```

This generates the demo in `out/` (including `out/index.html`).

## 3) Run local static preview

```bash
npm run preview:static
```

Open `http://localhost:4173`.

## Optional: Next dev mode

```bash
npm run dev
```

Open `http://localhost:3000`.
