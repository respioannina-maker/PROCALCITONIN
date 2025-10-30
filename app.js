// 🔴 Αντικατάστησε το URL με το δικό σου από το Google Apps Script (πρέπει να τελειώνει σε /exec)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzrW6YBhJiI0HQXv4fxfFhweykJBCX-A-O1QMentqTZ_QCBgXwwC5ElwdtFi7hhrWonvg/exec";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("crfForm");
  const statusDiv = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusDiv.innerHTML = "⏳ Αποστολή δεδομένων...";

    // Συλλογή όλων των πεδίων σε αντικείμενο
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // για αποφυγή CORS error
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      // Εμφάνιση αποτελέσματος (το "no-cors" δεν επιτρέπει ανάγνωση response, αλλά λειτουργεί)
      statusDiv.innerHTML = "✅ Τα δεδομένα αποθηκεύτηκαν επιτυχώς!";
      form.reset();

    } catch (error) {
      console.error("Σφάλμα:", error);
      statusDiv.innerHTML = "❌ Παρουσιάστηκε σφάλμα κατά την αποθήκευση.";
    }
  });
});

   
