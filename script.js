function openForm(type) {
  let html = "";
  const minDate = getToday();

  function input(label, id, typeInput = "text") {
    return `
      <div class="form-group">
        <label>${label}</label>
        <input id="${id}" type="${typeInput}">
      </div>
    `;
  }

  if (type === "pesawat") {
    html = `
      <div class="form-box">
        <div class="form-title">Booking Pesawat</div>
        <div class="form-grid">
          ${input("Kota Asal", "dari")}
          ${input("Tujuan", "ke")}
          <div class="form-group">
            <label>Tanggal Keberangkatan</label>
            <input id="tanggal" type="date" min="${minDate}">
          </div>
        </div>
        <button class="btn-booking" onclick="kirimWA('pesawat')">Kirim Booking Pesawat</button>
      </div>
    `;
  }

  if (type === "kapal") {
    html = `
      <div class="form-box">
        <div class="form-title">Booking Kapal Laut</div>
        <div class="form-grid">
          ${input("Kota Asal", "dari")}
          ${input("Tujuan", "ke")}
          <div class="form-group">
            <label>Tanggal Keberangkatan</label>
            <input id="tanggal" type="date" min="${minDate}">
          </div>
        </div>
        <button class="btn-booking" onclick="kirimWA('kapal')">Kirim Booking Kapal</button>
      </div>
    `;
  }

  if (type === "bus") {
    html = `
      <div class="form-box">
        <div class="form-title">Booking Bus</div>
        <div class="form-grid">
          ${input("Dari", "dari")}
          ${input("Tujuan", "ke")}

          <div class="form-group">
            <label>Kelas Bus</label>
            <select id="kelas">
              <option>Executive Class</option>
              <option>Sleeper Class</option>
            </select>
          </div>

          <div class="form-group">
            <label>Tanggal</label>
            <input id="tanggal" type="date" min="${minDate}">
          </div>

          ${input("No HP", "hp")}
        </div>

        <button class="btn-booking" onclick="kirimWA('bus')">Kirim Booking Bus</button>
      </div>
    `;
  }

  if (type === "travel") {
    html = `
      <div class="form-box">
        <div class="form-title">Booking Travel</div>
        <div class="form-grid">
          ${input("Dari", "dari")}
          ${input("Tujuan", "ke")}
          <div class="form-group">
            <label>Tanggal</label>
            <input id="tanggal" type="date" min="${minDate}">
          </div>
          <div class="form-group">
            <label>Jam</label>
            <input id="jam" type="time">
          </div>
          ${input("Jumlah Penumpang", "jumlah")}
          ${input("No HP", "hp")}
        </div>
        <button class="btn-booking" onclick="kirimWA('travel')">Kirim Booking Travel</button>
      </div>
    `;
  }

  if (type === "paket") {
    html = `
      <div class="form-box">
        <div class="form-title">Booking Paket</div>
        <div class="form-grid">
          ${input("Pengirim", "pengirim")}
          ${input("Penerima", "penerima")}
        </div>
        <button class="btn-booking" onclick="kirimWA('paket')">Kirim Booking Paket</button>
      </div>
    `;
  }

  document.getElementById("formArea").innerHTML = html;
}

/* ================= VALIDASI ================= */

function setError(id, msg){
  const el = document.getElementById(id);
  if(!el) return;

  el.classList.add("input-error");

  let err = document.getElementById(id+"_err");
  if(!err){
    err = document.createElement("div");
    err.id = id+"_err";
    err.className = "error-text";
    el.parentNode.appendChild(err);
  }

  err.innerText = msg;
}

function clearError(id){
  const el = document.getElementById(id);
  if(!el) return;

  el.classList.remove("input-error");

  const err = document.getElementById(id+"_err");
  if(err) err.remove();
}

function validate(ids){
  let firstError = null;

  ids.forEach(id=>{
    clearError(id);

    const el = document.getElementById(id);
    const val = el ? el.value : "";

    if(!val){
      setError(id,"Wajib diisi");
      if(!firstError) firstError = id;
    }
  });

  return firstError;
}

/* ================= WHATSAPP ================= */

function kirimWA(type){
  const nomor = "6281225209666";
  let pesan = "";

  let fields = [];

  if(type === "pesawat") fields = ["dari","ke","tanggal"];
  if(type === "kapal") fields = ["dari","ke","tanggal"];
  if(type === "bus") fields = ["dari","ke","kelas","tanggal","hp"];
  if(type === "travel") fields = ["dari","ke","tanggal","jam","jumlah","hp"];
  if(type === "paket") fields = ["pengirim","penerima"];

  const firstError = validate(fields);
  if(firstError){
    document.getElementById(firstError).scrollIntoView({
      behavior:"smooth",
      block:"center"
    });
    return;
  }

  if(type === "pesawat"){
    pesan = `PESAWAT\nDari:${get("dari")}\nKe:${get("ke")}\nTanggal:${get("tanggal")}`;
  }

  if(type === "kapal"){
    pesan = `KAPAL LAUT\nDari:${get("dari")}\nKe:${get("ke")}\nTanggal:${get("tanggal")}`;
  }

  if(type === "bus"){
    pesan = `BUS\nDari:${get("dari")}\nKe:${get("ke")}\nKelas:${get("kelas")}\nTanggal:${get("tanggal")}\nHP:${get("hp")}`;
  }

  if(type === "travel"){
    pesan = `TRAVEL\nDari:${get("dari")}\nKe:${get("ke")}\nTanggal:${get("tanggal")}\nJam:${get("jam")}\nJumlah:${get("jumlah")}\nHP:${get("hp")}`;
  }

  if(type === "paket"){
    pesan = `PAKET\nPengirim:${get("pengirim")}\nPenerima:${get("penerima")}`;
  }

  window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`);
}

function get(id){
  const el = document.getElementById(id);
  if(!el) return "";
  return el.value || "";
}

function getToday(){
  return new Date().toISOString().split("T")[0];
}
