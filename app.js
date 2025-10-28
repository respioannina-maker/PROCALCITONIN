/* Frontend – μόνο κεντρική αποθήκευση στο Google Sheet */
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxFmXlhepcqnznGLs-xVre47MpDMcvF8GnBQwDf-2NrKanTebNe6oQw9u6S_NtYWvYfTQ/exec";

(function(){
  const sectionSel = document.getElementById('Section');
  const sections = Array.from(document.querySelectorAll('.section'));
  const form = document.getElementById('crfForm');
  const status = document.getElementById('status');

  function showSection(name){
    const key = (name||'').trim();
    sections.forEach(s => s.classList.toggle('show', s.dataset.section===key));
  }
  showSection(sectionSel ? sectionSel.value : '');
  sectionSel && sectionSel.addEventListener('change', e => showSection(e.target.value));

  function serializeForm(formEl){
    const fd = new FormData(formEl);
    const obj = {};
    fd.forEach((v,k)=>{ if (v!=='' && v!=null) obj[k]=v; });
    return obj;
  }

  form && form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const payload = serializeForm(form);
    if (!payload['NPS'] || !payload['Ονοματεπώνυμο'] || !payload['Section']){
      status.textContent = "Συμπληρώστε ΝΠΣ, Ονοματεπώνυμο και Ενότητα.";
      return;
    }
    payload['timestamp'] = new Date().toISOString();
    try{
      status.textContent = "⏳ Αποστολή...";
      await fetch(WEB_APP_URL, { method:'POST', body: JSON.stringify(payload) });
      status.textContent = "✅ Καταχωρήθηκε στο κεντρικό Google Sheet.";
      form.reset();
      sections.forEach(s=> s.classList.remove('show'));
    }catch(err){
      console.error(err);
      status.textContent = "⚠️ Πρόβλημα σύνδεσης. Δοκιμάστε ξανά.";
    }
  });
})();
