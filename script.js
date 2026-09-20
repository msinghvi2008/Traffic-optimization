const state = { traffic: 38, incident: false };
const $ = (id) => document.getElementById(id);
const slider = $('traffic-slider');
const values = {
  qubo: { time: 24.6, distance: 11.8, congestion: 31, candidates: 2480 },
  anneal: { time: 25.1, distance: 11.7, congestion: 34, candidates: 2210 },
  ga: { time: 25.9, distance: 11.6, congestion: 38, candidates: 1860 },
  dijkstra: { time: 29.4, distance: 10.9, congestion: 57, candidates: 184 },
  astar: { time: 27.8, distance: 11.0, congestion: 51, candidates: 416 }
};
function renderMetrics() {
  const base = values[$('engine').value];
  const trafficEffect = (state.traffic - 38) * .075;
  const incidentEffect = state.incident ? 3.8 : 0;
  const objective = $('objective').value;
  let time = base.time + trafficEffect + incidentEffect;
  let distance = base.distance + (state.incident ? .7 : 0);
  let congestion = base.congestion + Math.round((state.traffic - 38) * .42) + (state.incident ? 14 : 0);
  if (objective === 'fastest') { time -= .8; congestion += 4; }
  if (objective === 'low') { time += .9; distance += .4; congestion -= 7; }
  if (objective === 'fleet') { time += .5; congestion -= 3; }
  $('travel-time').innerHTML = `${Math.max(14, time).toFixed(1)} <small>min</small>`;
  $('distance').innerHTML = `${distance.toFixed(1)} <small>km</small>`;
  $('congestion').textContent = Math.max(12, congestion);
  $('candidates').textContent = Math.round(base.candidates * (1 + state.traffic / 260)).toLocaleString();
  $('time-change').textContent = state.incident ? 'Rerouted around incident' : 'Demo estimate vs baseline';
  $('congestion-change').textContent = state.incident ? 'Incident pressure active' : 'Low network pressure';
}
slider.addEventListener('input', () => { state.traffic = +slider.value; $('traffic-value').textContent = `${state.traffic}%`; renderMetrics(); });
$('incident').addEventListener('click', () => {
  state.incident = true; state.traffic = Math.max(72, state.traffic); slider.value = state.traffic; $('traffic-value').textContent = `${state.traffic}%`;
  $('incident-road').style.stroke = '#ff5872'; $('incident-marker').classList.remove('hidden'); $('route-status').textContent = 'Traffic incident active';
  $('incident').textContent = 'Traffic incident active'; $('incident').disabled = true; renderMetrics();
});
$('reset').addEventListener('click', () => {
  state.incident = false; state.traffic = 38; slider.value = 38; $('traffic-value').textContent = '38%'; $('incident-road').style.stroke = '#766f75';
  $('incident-marker').classList.add('hidden'); $('route-normal').classList.remove('hidden'); $('route-reroute').classList.add('hidden'); $('route-status').textContent = 'Route ready'; $('incident').textContent = 'Simulate traffic incident'; $('incident').disabled = false; renderMetrics();
});
$('run').addEventListener('click', async () => {
  const progress = $('progress'); const words = ['Building weighted graph...', 'Evaluating candidate routes...', 'Applying optimization...', 'Checking constraints...', 'Selecting optimized route...'];
  progress.classList.remove('hidden'); $('run').disabled = true;
  for (const word of words) { $('progress-text').textContent = word; await new Promise(resolve => setTimeout(resolve, 270)); }
  if (state.incident) { $('route-normal').classList.add('hidden'); $('route-reroute').classList.remove('hidden'); $('route-status').textContent = 'Dynamic route selected'; }
  else $('route-status').textContent = 'Optimization complete';
  renderMetrics(); $('progress-text').textContent = 'Optimization complete.'; await new Promise(resolve => setTimeout(resolve, 450)); progress.classList.add('hidden'); $('run').disabled = false;
});
$('engine').addEventListener('change', renderMetrics); $('objective').addEventListener('change', renderMetrics); renderMetrics();
