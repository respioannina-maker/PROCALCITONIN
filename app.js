// app.js – ΧΩΡΙΣ headers
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwF6kD2bRQc1IyVH6bOdX92M482ktdqo-1m6wBVq08zA7OlxiDeYqszLqEeZB1CWqbPYQ/exec";

document.getElementById("crfForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {};
  new FormData(form).forEach((v, k) => data[k] = v);

  const statusEl = document.getElementById("status");
  statusEl.textContent = "⏳ Αποστολή δεδομένων...";

  try {
    await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(data)   // ΧΩΡΙΣ headers
    });
    statusEl.textContent = "✅ Τα δεδομένα καταχωρήθηκαν επιτυχώς!";
    statusEl.style.color = "#16a34a";
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent = "⚠️ Σφάλμα σύνδεσης. Δοκίμασε ξανά.";
    statusEl.style.color = "#dc2626";
  }
});

// app.js – Αποστολή φόρμας CRF στο Google Sheet μέσω Apps Script

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxdld1S9KVeZuZ3pSxskMbXAJ8u3ozNafWeeZ9TjWyvsw4sqEWHvBx6rr6u9LyU6uUGag/exec"; 
// π.χ. "https://script.google.com/macros/s/AKfycbx123abcDEF456xyz/exec"

document.getElementById("crfForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {};
  new FormData(form).forEach((v, k) => data[k] = v);

  // Εμφάνισε ότι γίνεται αποστολή
  const statusEl = document.getElementById("status");
  statusEl.textContent = "⏳ Αποστολή δεδομένων...";

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (result.ok) {
      statusEl.textContent = "✅ Τα δεδομένα καταχωρήθηκαν επιτυχώς!";
      statusEl.style.color = "#16a34a";
      form.reset();
    } else {
      statusEl.textContent = "❌ Σφάλμα: " + (result.error || "Αποτυχία αποστολής");
      statusEl.style.color = "#dc2626";
    }

  } catch (err) {
    console.error(err);
    document.getElementById("status").textContent = "⚠️ Σφάλμα σύνδεσης. Δοκίμασε ξανά.";
  }
});
