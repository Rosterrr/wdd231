// weather.js — OpenWeatherMap (uses your API key), Celsius output

const API_KEY = "a1ef2e2fd02131c68f248b7947b7fc06"; // ← your key
const UNITS = "metric"; // "metric" = °C, use "imperial" for °F
const DEFAULT_COORDS = { lat: 13.6929, lon: -89.2182, label: "San Salvador" }; // fallback

function getCoords() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(DEFAULT_COORDS);
    const opts = { enableHighAccuracy: false, timeout: 6000, maximumAge: 300000 };
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve(DEFAULT_COORDS),
      opts
    );
  });
}

async function fetchCurrent(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}&lang=en`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Current HTTP ${res.status}`);
  return res.json();
}

async function fetchForecast(lat, lon) {
  // 5 day / 3 hour forecast — we’ll summarize into next 3 days
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}&lang=en`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Forecast HTTP ${res.status}`);
  return res.json();
}

function renderCurrent(data) {
  const tempEl = document.getElementById("current-temp");
  const descEl = document.getElementById("weather-desc");
  if (!tempEl || !descEl) return;

  const t = Math.round(data.main?.temp ?? 0);
  const desc = data.weather?.[0]?.description ?? "—";
  tempEl.textContent = `${t}°${UNITS === "metric" ? "C" : "F"}`;
  descEl.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

function summarizeThreeDays(list) {
  // Group by YYYY-MM-DD, skip today, take next 3 dates
  const byDate = new Map();
  const todayStr = new Date().toISOString().slice(0, 10);

  for (const item of list) {
    const dateStr = item.dt_txt.slice(0, 10);
    if (dateStr === todayStr) continue;
    if (!byDate.has(dateStr)) byDate.set(dateStr, []);
    byDate.get(dateStr).push(item);
  }

  const dates = Array.from(byDate.keys()).sort().slice(0, 3);
  return dates.map((d) => {
    const entries = byDate.get(d);
    // Prefer the 12:00 forecast for description; fallback to first
    const noon = entries.find((e) => e.dt_txt.endsWith("12:00:00")) || entries[0];
    const max = Math.max(...entries.map((e) => e.main.temp_max));
    const min = Math.min(...entries.map((e) => e.main.temp_min));
    const desc = noon?.weather?.[0]?.description ?? "—";
    const dayName = new Date(d).toLocaleDateString(undefined, { weekday: "short" });
    return { dayName, max: Math.round(max), min: Math.round(min), desc };
  });
}

function renderForecast(data) {
  const rows = document.querySelectorAll("#forecast .forecast-day");
  if (!rows.length || !data?.list?.length) return;
  const days = summarizeThreeDays(data.list);
  days.forEach((d, i) => {
    if (rows[i]) rows[i].textContent = `${d.dayName} — ${d.max}°/${d.min}° ${d.desc}`;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const tempEl = document.getElementById("current-temp");
  const descEl = document.getElementById("weather-desc");
  try {
    const { lat, lon } = await getCoords();
    const [current, forecast] = await Promise.all([fetchCurrent(lat, lon), fetchForecast(lat, lon)]);
    renderCurrent(current);
    renderForecast(forecast);
  } catch (err) {
    console.error("Weather error:", err);
    if (tempEl) tempEl.textContent = "—";
    if (descEl) descEl.textContent = "Unavailable";
  }
});

