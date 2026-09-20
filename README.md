# Egreen Quanta

Static, browser-only prototype for **Egreen Quanta — Quantum-Inspired Adaptive Traffic Router**. It uses synthetic network and clearly marked demonstration values; no live traffic feed, scientific benchmark, quantum hardware, or backend optimizer is claimed.

## Run locally

No installation is required. Open `index.html` in a modern browser. For a local server, use the “Live Server” extension in VS Code, or run any static file server from this folder.

## Deploy

### GitHub Pages

1. Create a GitHub repository and upload `index.html`, `style.css`, `script.js`, and `README.md` at its root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. GitHub supplies the public URL after deployment.

### Netlify

1. Log in to Netlify and select **Add new site → Deploy manually**.
2. Drag this project folder (or a ZIP containing its files) into the deployment area.
3. Netlify immediately provides a public URL. No build command or dependencies are needed.

## Future Python backend connection

The frontend seam is `script.js`, especially the `run` button handler and the `renderMetrics()` function. Replace the demo calculation inside the `run` handler with a `fetch()` POST to a FastAPI endpoint such as `/api/optimize`.

Suggested request: `{ origin, destination, trafficIntensity, objective, engine, incident }`.

Suggested response: `{ routeCoordinates, travelTime, distance, congestionScore, candidateRoutes, constraints }`.

The API can construct a NetworkX weighted road graph, formulate the selected multi-objective/QUBO model, run its chosen classical or quantum-inspired solver, validate constraints, and return the selected route. Use real experimental data to populate Benchmark and Analytics before treating those displays as measurements.

## Demo flow (2–3 minutes)

1. Start at **Live Routing Console**, point out the green route and current demo metrics.
2. Change traffic intensity and optimization objective, then run the optimizer to show its visible staged workflow.
3. Trigger **Simulate traffic incident**; the affected road turns red and the system enters incident state.
4. Run optimization again; a new green route appears and the metrics show a rerouting estimate.
5. Briefly show the pipeline, illustrative benchmark label, and analytics. Explain that the UI is ready for a FastAPI optimization service but currently uses transparent browser-side simulation.
