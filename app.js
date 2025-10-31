// 🔴 Βάλε εδώ το δικό σου Google Apps Script Web App URL (τελειώνει σε /exec)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzrW6YBhJiI0HQXv4fxfFhweykJBCX-A-O1QMentqTZ_QCBgXwwC5ElwdtFi7hhrWonvg/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("crfForm");
  const statusDiv = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusDiv.textContent = "⏳ Αποστολή δεδομένων...";

    const fd = new FormData(form);
    const data = {};
    fd.forEach((v,k)=>{ data[k] = v; });

    try {
      // κρατάμε ΧΩΡΙΣ headers για να αποφύγουμε CORS προέλεγχο
      await fetch(WEB_APP_URL, { method: "POST", body: JSON.stringify(data) });

      statusDiv.textContent = "✅ Καταχωρήθηκε στο κεντρικό Google Sheet.";
      statusDiv.style.color = "#16a34a";
      form.reset();
    } catch (err) {
      console.error(err);
      statusDiv.textContent = "❌ Σφάλμα σύνδεσης. Έλεγξε το /exec URL και τα δικαιώματα Web App.";
      statusDiv.style.color = "#dc2626";
    }
  });
});
