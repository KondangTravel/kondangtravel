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

        <button class="btn-booking" onclick="kirimWA('pesawat')">
          Kirim Booking Pesawat
        </button>
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

        <button class="btn-booking" onclick="kirimWA('kapal')">
          Kirim Booking Kapal Laut
        </button>
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
            <label>Tanggal Keberangkatan</label>
            <input id="tanggal" type="date" min="${minDate}">
          </div>

          ${input("No. HP", "hp")}
        </div>

        <button class="btn-booking" onclick="kirimWA('bus')">
          Kirim Booking Bus
        </button>
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
            <label>Tanggal Keberangkatan</label>
            <input id="tanggal" type="date" min="${minDate}">
          </div>

          <div class="form-group">
            <label>Jam Keberangkatan</label>
            <input id="jam" type="time" step="60">
          </div>

          ${input("Jumlah Orang", "jumlah")}
          ${input("No. HP", "hp")}
        </div>

        <button class="btn-booking" onclick="kirimWA('travel')">
          Kirim Booking Travel
        </button>
      </div>
    `;
  }

  if (type === "paket") {
    html = `
      <div class="form-box">
        <div class="form-title">Booking Paket</div>

        <div class="form-grid">
          ${input("Nama Pengirim", "pengirim")}
          ${input("Nama Penerima", "penerima")}
        </div>

        <button class="btn-booking" onclick="kirimWA('paket')">
          Kirim Booking Paket
        </button>
      </div>
    `;
  }

  document.getElementById("formArea").innerHTML = html;
}

/* WHATSAPP */
function kirimWA(type) {
  const nomor = "6281225209666";
  let pesan = "";

  if (type === "pesawat") {
    pesan = `PESAWAT\nKota Asal: ${get("dari")}\nTujuan: ${get("ke")}\nTanggal: ${get("tanggal")}`;
  }

  if (type === "kapal") {
    pesan = `KAPAL LAUT\nKota Asal: ${get("dari")}\nTujuan: ${get("ke")}\nTanggal: ${get("tanggal")}`;
  }

  if (type === "bus") {
    pesan = `BUS\nDari: ${get("dari")}\nTujuan: ${get("ke")}\nKelas: ${get("kelas")}\nTanggal: ${get("tanggal")}\nNo HP: ${get("hp")}`;
  }

  if (type === "travel") {
    pesan = `TRAVEL
Dari: ${get("dari")}
Tujuan: ${get("ke")}
Tanggal: ${get("tanggal")}
Jam: ${get("jam")}
Jumlah Penumpang: ${get("jumlah")}
No HP: ${get("hp")}`;
  }

  if (type === "paket") {
    pesan = `PAKET\nPengirim: ${get("pengirim")}\nPenerima: ${get("penerima")}`;
  }

  window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`);
}

function get(id) {
  return document.getElementById(id).value;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}
