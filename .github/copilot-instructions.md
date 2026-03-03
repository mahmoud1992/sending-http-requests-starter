# AI Coding Instructions for the PlacePicker Project

The repo contains a very small full‑stack example used in the "sending HTTP requests" workshop.
Knowledge of the architecture and conventions will help you make useful contributions.

---

## High‑level Architecture

* **Root**: a Vite‑powered React application.  All client code lives under `src/`.
  - `main.jsx` boots the app by rendering `<App />` into `#root`.
  - Components use `.jsx` files and are all functional hooks components (no classes).
  - Styling is in `src/index.css`; assets (images, logo) are under `src/assets`.
* **Backend**: a tiny Express/Node server in `backend/app.js`.  It uses ES modules (`"type": "module"`) and the `fs/promises` API to read/write JSON files.
  - Data files are in `backend/data/places.json` and `backend/data/user-places.json`.
  - The server listens on port **3000** and serves the `images/` folder statically.
  - CORS headers are set to allow all origins so front‑end (port 5173) can call it directly.

The UI fetches from the backend, but most of the scaffolding is unimplemented (see `AvailablePlaces.jsx`).

## Common Workflows

1. **Start backend**
   ```powershell
   cd backend
   npm install      # run once
   node app.js       # manually invoke; no `start` script defined
   ```
   (Keep this running on port 3000 while developing the UI.)

2. **Run frontend**
   ```powershell
   npm install       # at project root
   npm run dev       # starts Vite dev server (default http://localhost:5173)
   ```

3. **Build for production**
   ```powershell
   npm run build     # outputs to dist/
   npm run preview   # serve the production build locally
   ```

There are no automated tests.  Linting is configured via `npm run lint` (ESLint with React rules).

## Data / API Conventions

* `GET /places` returns `{ places: [...] }` from `places.json`.
* `GET /user-places` returns the current array from `user-places.json`.
* `PUT /user-places` expects `{ places: [...] }` and overwrites the file.
* When adding a new endpoint, mimic the asynchronous `fs.readFile`/`writeFile` pattern in `app.js` and update CORS or 404 handlers accordingly.
* The front end currently hardcodes URLs such as
  ```jsx
  <img src={`http://localhost:3000/${place.image.src}`} ... />
  ```
  – keep port 3000 or move the base URL into a shared constant.

## Frontend Patterns

* Components accept props that drive rendering and callbacks: e.g. `Places` takes
  `{ title, places, fallbackText, onSelectPlace }`.  `onSelectPlace` is
  invoked with the whole place object.
* State management is local (`useState`, `useRef`, `useCallback`).  The main
  App component keeps `userPlaces` and toggles a modal for deletions.
* The `AvailablePlaces` component is where you should add data fetching;
  it currently defines `availablePlaces` but passes an empty array to
  `Places` – update it with a `useEffect` and a call to `/places`.
* Assets (images) are referenced by backend path; do not import them through
  the bundler.
* Use `jsx` file extensions and `import`/`export default` for each component.

## Styling and Layout

* Global styles are in `src/index.css`.  There are no CSS modules or preprocessors.
* The markup relies on CSS grid for the place list and simple utility classes.

## Project‑specific Conventions

* The only allowable React version is 19 (as per package.json, though
  the code works with 18 semantics).
* No state management libraries or routers are used; keep it simple.
* The `loc.js` helper exports `sortPlacesByDistance` – front end components
  may import and use it to order places by geographical distance.

## Debugging Tips

* Client‑side console logs are already sprinkled (e.g. `console.log(places)` in
  `Places.jsx`).  Add more as needed.
* Run the backend with `node --enable-source-maps app.js` if you add
  TypeScript/transpilation later; currently it's plain JS.
* To inspect the JSON data, open the files under `backend/data` directly.

---

Let me know if any section is unclear or you want me to document additional
patterns (e.g. how the modal portal is implemented).