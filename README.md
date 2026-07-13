# 🏅 SPK Seleksi Paskibra - Metode TOPSIS (Kahoot Style SPA)

Sistem Pendukung Keputusan (SPK) berbasis web untuk seleksi penerimaan anggota Paskibra menggunakan metode **TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)**. Aplikasi ini dirancang murni di sisi klien (*pure client-side JavaScript*) sebagai **Single Page Application (SPA)** yang interaktif, responsif, dan dinamis dengan visual bertema *Kahoot Style*.

Aplikasi ini diimplementasikan menggunakan data ketentuan dari jurnal penelitian sebagai data awal bawaan (*default seeded data*).

---

## 🚀 Fitur Utama

*   **Pure Client-Side SPA:** Berjalan langsung di browser tanpa memerlukan backend database atau server konfigurasi rumit. Cukup buka `index.html`.
*   **Real-Time Inline Editing:** Mengubah nama kriteria, tipe kriteria (*benefit/cost*), bobot, nama alternatif (calon kandidat), hingga nilai matriks keputusan awal ($X$) langsung di dalam tabel tanpa *popup modal*. Semua kalkulasi akan ter-update secara otomatis.
*   **Smart Auto-Normalization:** Dilengkapi dengan fitur tombol *Normalize* pintar yang secara otomatis mendistribusikan ulang bobot kriteria secara proporsional agar totalnya pas $1.000$, mencegah *rounding error* berapapun jumlah kriterianya.
*   **Visualisasi Kahoot Style:** 
    *   Dashboard interaktif yang menampilkan ringkasan performa top 3 kandidat serta visualisasi *Donut Chart* (menggunakan Chart.js) untuk Top 10 nilai preferensi.
    *   Podium juara 3 besar ala permainan Kahoot yang interaktif dengan efek transisi *hover* yang halus.
*   **Print-Ready Report:** Fitur optimasi cetak laporan hasil pemeringkatan akhir yang bersih (otomatis menyembunyikan *sidebar* dan elemen navigasi saat dicetak).

---

## 📊 Parameter & Kriteria Awal (Berdasarkan Jurnal)

Sistem ini memuat data awal berupa 11 kriteria penilaian dan 15 data alternatif calon anggota Paskibra:

| Kode | Nama Kriteria | Tipe Parameter | Bobot Awal |
| :--- | :--- | :--- | :--- |
| **C1** | Tinggi Badan | Benefit | 0.13 |
| **C2** | Berat Badan | Benefit | 0.10 |
| **C3** | Usia | Benefit | 0.03 |
| **C4** | Buta Warna | Cost | 0.05 |
| **C5** | Lateral Kaki | Cost | 0.10 |
| **C6** | Penilaian Baris-Berbaris | Benefit | 0.20 |
| **C7** | Lari | Benefit | 0.06 |
| **C8** | Sit Up | Benefit | 0.06 |
| **C9** | Push Up | Benefit | 0.06 |
| **C10**| Shuttle Run | Cost | 0.06 |
| **C11**| Ujian | Benefit | 0.15 |

---

## 🛠️ Tech Stack & Arsitektur File

Proyek ini dibangun dengan arsitektur yang sangat minimalis namun memiliki performa tinggi (hanya menggunakan 3 file utama):

1.  `index.html` — Struktur antarmuka dasar komponen admin dashboard, view halaman SPA, dan kontainer podium.
2.  `style.css` — Kustomisasi desain modern, efek *glassmorphism*, skema warna *deep purple*, animasi *hover*, serta optimasi cetak `@media print`.
3.  `script.js` — Core state management, manajemen manipulasi DOM dinamis, rendering chart, dan seluruh logika matematika algoritma TOPSIS:
    *   *Langkah 1:* Normalisasi matriks keputusan awal ($X \rightarrow R$).
    *   *Langkah 2:* Pembuatan matriks normalisasi terbobot ($V$).
    *   *Langkah 3:* Menentukan solusi ideal positif ($A^+$) dan solusi ideal negatif ($A^-$).
    *   *Langkah 4:* Menghitung jarak kedekatan Euclidean ($D^+$ dan $D^-$).
    *   *Langkah 5:* Menghitung nilai preferensi kedekatan relatif ($V_i$) untuk perangkingan.

### Library Eksternal (via CDN):
*   [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework untuk UI modern.
*   [FontAwesome v6](https://fontawesome.com) — Set ikon navigasi dashboard.
*   [Chart.js](https://www.chartjs.org) — Library grafik untuk visualisasi *doughnut chart* di dashboard.

---

## 💻 Cara Menjalankan Proyek

1.  *Clone* atau unduh repositori ini ke komputer Anda:
    ```bash
    git clone [https://github.com/username-kamu/SPK-PASKIB.git](https://github.com/username-kamu/SPK-PASKIB.git)
    ```
2.  Masuk ke direktori proyek:
    ```bash
    cd SPK-PASKIB
    ```
3.  Buka file `index.html` langsung menggunakan browser pilihan Anda (Chrome, Edge, Firefox, atau Safari). 
4.  *Selesai!* Aplikasi siap digunakan tanpa perlu menjalankan perintah instalasi apa pun (`npm install`, dll).

---

## 📝 Catatan Penggunaan
Jika Anda melakukan banyak modifikasi data dan ingin mengembalikan kondisi matriks keputusan ke data asli bawaan jurnal penelitian, cukup klik tombol **"Reset Data Jurnal"** yang terletak di pojok kanan atas *header top bar*.
