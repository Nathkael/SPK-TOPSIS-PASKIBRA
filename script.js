// STATE MANAGEMENT & DATA SEEDING (JURNAL DATA)
let kriteria = [];
let alternatif = [];
let barChartInstance = null; 

const DEFAULT_KRITERIA = [
    { id: 'C1', name: 'Tinggi Badan', type: 'benefit', weight: 0.13 },
    { id: 'C2', name: 'Berat Badan', type: 'benefit', weight: 0.10 },
    { id: 'C3', name: 'Usia', type: 'benefit', weight: 0.03 },
    { id: 'C4', name: 'Buta Warna', type: 'cost', weight: 0.05 },
    { id: 'C5', name: 'Lateral Kaki', type: 'cost', weight: 0.10 },
    { id: 'C6', name: 'Penilaian Baris-Berbaris', type: 'benefit', weight: 0.20 },
    { id: 'C7', name: 'Lari', type: 'benefit', weight: 0.06 },
    { id: 'C8', name: 'Sit Up', type: 'benefit', weight: 0.06 },
    { id: 'C9', name: 'Push Up', type: 'benefit', weight: 0.06 },
    { id: 'C10', name: 'Shuttle Run', type: 'cost', weight: 0.06 },
    { id: 'C11', name: 'Ujian', type: 'benefit', weight: 0.15 }
];

const DEFAULT_ALTERNATIF = [
    { id: 'A1', name: 'Alternatif 1', values: { C1:162, C2:48, C3:15, C4:0, C5:0, C6:72, C7:7, C8:23, C9:16, C10:20.33, C11:65 } },
    { id: 'A2', name: 'Alternatif 2', values: { C1:163, C2:52, C3:16, C4:0, C5:0, C6:75, C7:7, C8:23, C9:28, C10:21.04, C11:84 } },
    { id: 'A3', name: 'Alternatif 3', values: { C1:150, C2:44, C3:16, C4:0, C5:0, C6:73, C7:7, C8:33, C9:30, C10:20.81, C11:59 } },
    { id: 'A4', name: 'Alternatif 4', values: { C1:157, C2:46, C3:16, C4:0, C5:0, C6:65, C7:6, C8:25, C9:23, C10:22.34, C11:75 } },
    { id: 'A5', name: 'Alternatif 5', values: { C1:160, C2:50, C3:17, C4:0, C5:0, C6:80, C7:8, C8:27, C9:25, C10:23.95, C11:92 } },
    { id: 'A6', name: 'Alternatif 6', values: { C1:173, C2:67, C3:15, C4:0, C5:0, C6:75, C7:7, C8:25, C9:22, C10:20.74, C11:75 } },
    { id: 'A7', name: 'Alternatif 7', values: { C1:171, C2:70, C3:16, C4:0, C5:0, C6:78, C7:8, C8:26, C9:18, C10:19.34, C11:59 } },
    { id: 'A8', name: 'Alternatif 8', values: { C1:170, C2:62, C3:16, C4:0, C5:0, C6:82, C7:9, C8:30, C9:28, C10:20.74, C11:65 } },
    { id: 'A9', name: 'Alternatif 9', values: { C1:175, C2:61, C3:18, C4:2, C5:2, C6:70, C7:8, C8:23, C9:39, C10:20.97, C11:84 } },
    { id: 'A10', name: 'Alternatif 10', values: { C1:167, C2:54, C3:17, C4:4, C5:0, C6:67, C7:8, C8:28, C9:24, C10:24.81, C11:75 } },
    { id: 'A11', name: 'Alternatif 11', values: { C1:159, C2:52, C3:16, C4:5, C5:0, C6:95, C7:8, C8:34, C9:50, C10:20.44, C11:59 } },
    { id: 'A12', name: 'Alternatif 12', values: { C1:157, C2:45, C3:16, C4:0, C5:0, C6:75, C7:8, C8:42, C9:40, C10:21.26, C11:65 } },
    { id: 'A13', name: 'Alternatif 13', values: { C1:164, C2:45, C3:16, C4:0, C5:0, C6:65, C7:6, C8:30, C9:30, C10:20.45, C11:65 } },
    { id: 'A14', name: 'Alternatif 14', values: { C1:170, C2:74, C3:17, C4:3, C5:0, C6:78, C7:6, C8:34, C9:45, C10:18.53, C11:75 } },
    { id: 'A15', name: 'Alternatif 15', values: { C1:168, C2:46, C3:16, C4:0, C5:7, C6:75, C7:9, C8:35, C9:26, C10:19.00, C11:84 } }
];

// INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
    resetToDefaultData();
    switchView('dashboard');
});

function resetToDefaultData() {
    kriteria = JSON.parse(JSON.stringify(DEFAULT_KRITERIA));
    alternatif = JSON.parse(JSON.stringify(DEFAULT_ALTERNATIF));
    showAlert('Data berhasil di-reset ke nilai default jurnal penelitian!', 'success');
    renderAll();
}

function switchView(viewId) {
    document.querySelectorAll('.view-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`view-${viewId}`).classList.remove('hidden');
    
    const mainCard = document.getElementById('main-card-container');
    if (viewId === 'dashboard') {
        mainCard.classList.add('hidden');
    } else {
        mainCard.classList.remove('hidden');
    }

    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white', 'shadow-md');
        btn.classList.add('hover:bg-indigo-900/50', 'hover:text-white');
    });
    
    const activeBtn = document.getElementById(`nav-${viewId}`);
    if(activeBtn) {
        activeBtn.classList.add('bg-purple-600', 'text-white', 'shadow-md');
        activeBtn.classList.remove('hover:bg-indigo-900/50', 'hover:text-white');
    }

    const titles = {
        dashboard: "Dashboard",
        kriteria: "Pengaturan Variabel Kriteria",
        alternatif: "Daftar Calon Anggota (Alternatif)",
        penilaian: "Pengisian Nilai Matriks Keputusan Awal",
        perhitungan: "Penghitungan Metode TOPSIS",
        ranking: "Hasil Pemeringkatan Akhir Kompetensi"
    };
    document.getElementById('page-title').innerText = titles[viewId] || "Sistem SPK";
    
    renderAll();
}

// WEIGHT NORMALIZATION
function getNormalizedWeights() {
    let sum = kriteria.reduce((acc, curr) => acc + parseFloat(curr.weight), 0);
    return kriteria.map(c => ({
        id: c.id,
        normWeight: sum > 0 ? parseFloat(c.weight) / sum : 0
    }));
}

// TOPSIS MATHEMATICAL LOGIC
function hitungTOPSIS() {
    if (alternatif.length === 0 || kriteria.length === 0) return null;
    
    const normWeights = getNormalizedWeights();

    let pembagi = {};
    kriteria.forEach(c => {
        let sumSquare = 0;
        alternatif.forEach(a => {
            let val = a.values[c.id] || 0;
            sumSquare += val * val;
        });
        pembagi[c.id] = Math.sqrt(sumSquare);
    });

    let matriksR = alternatif.map(a => {
        let rowR = { id: a.id, name: a.name, values: {} };
        kriteria.forEach(c => {
            let val = a.values[c.id] || 0;
            rowR.values[c.id] = pembagi[c.id] > 0 ? val / pembagi[c.id] : 0;
        });
        return rowR;
    });

    let matriksV = matriksR.map(rowR => {
        let rowV = { id: rowR.id, name: rowR.name, values: {} };
        kriteria.forEach(c => {
            let w = normWeights.find(nw => nw.id === c.id).normWeight;
            rowV.values[c.id] = rowR.values[c.id] * w;
        });
        return rowV;
    });

    let idealPositif = {};
    let idealNegatif = {};

    kriteria.forEach(c => {
        let allValuesV = matriksV.map(row => row.values[c.id]);
        if (allValuesV.length === 0) {
            idealPositif[c.id] = 0; idealNegatif[c.id] = 0; return;
        }
        if (c.type === 'benefit') {
            idealPositif[c.id] = Math.max(...allValuesV);
            idealNegatif[c.id] = Math.min(...allValuesV);
        } else { 
            idealPositif[c.id] = Math.min(...allValuesV);
            idealNegatif[c.id] = Math.max(...allValuesV);
        }
    });

    let hasilAkhir = matriksV.map(row => {
        let dPos = 0; let dNeg = 0;
        kriteria.forEach(c => {
            let diffPos = row.values[c.id] - (idealPositif[c.id] || 0);
            let diffNeg = row.values[c.id] - (idealNegatif[c.id] || 0);
            dPos += diffPos * diffPos; dNeg += diffNeg * diffNeg;
        });
        dPos = Math.sqrt(dPos); dNeg = Math.sqrt(dNeg);
        let vValue = (dNeg + dPos) > 0 ? dNeg / (dNeg + dPos) : 0;

        return { id: row.id, name: row.name, dPos: dPos, dNeg: dNeg, v: vValue };
    });

    return { pembagi, matriksR, matriksV, idealPositif, idealNegatif, hasilAkhir };
}

function renderAll() {
    renderKriteriaTable();
    renderAlternatifTable();
    renderPenilaianTable();
    
    const hasilTopsis = hitungTOPSIS();
    updateProgressSystem(); // Update Progress Workflow
    
    if(hasilTopsis) {
        renderPerhitunganTable(hasilTopsis);
        renderRankingTable(hasilTopsis);
        updateDashboardPremiumPanel(hasilTopsis); 
    }
}

// PROGRESS WORKFLOW TRACKER INDICATORS
function updateProgressSystem() {
    const s1 = kriteria.length > 0;
    const s2 = alternatif.length > 0;
    
    let s3 = s2 && kriteria.every(c => alternatif.every(a => a.values[c.id] !== undefined && a.values[c.id] !== ""));
    const hasilTopsis = hitungTOPSIS();
    const s4 = hasilTopsis && hasilTopsis.hasilAkhir.length > 0 && kriteria.length > 0;

    const steps = [
        { id: 'prog-step-1', status: s1 },
        { id: 'prog-step-2', status: s2 },
        { id: 'prog-step-3', status: s3 },
        { id: 'prog-step-4', status: s4 }
    ];

    steps.forEach(st => {
        const el = document.getElementById(st.id);
        const ind = el.querySelector('.indicator-status');
        if(st.status) {
            el.className = "p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between";
            ind.className = "indicator-status text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700";
            ind.innerText = "Selesai";
        } else {
            el.className = "p-3 rounded-xl border border-rose-100 bg-rose-50/20 flex items-center justify-between";
            ind.className = "indicator-status text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700";
            ind.innerText = "Belum";
        }
    });
}

// PREMIUM DASHBOARD STATS, LEADERBOARD, & HORIZONTAL BAR CHART
function updateDashboardPremiumPanel(data) {
    if (!data || data.hasilAkhir.length === 0) return;
    let sorted = [...data.hasilAkhir].sort((a,b) => b.v - a.v);

    // 1. Set Info Utama Card
    document.getElementById('stat-kriteria').innerText = kriteria.length;
    document.getElementById('stat-alternatif').innerText = alternatif.length;
    document.getElementById('stat-kandidat-terbaik').innerText = `${sorted[0].id} (${sorted[0].name})`;
    document.getElementById('stat-preferensi-tinggi').innerText = sorted[0].v.toFixed(4);

    // 2. Render Leaderboard Desain Premium (Top 3) dengan Progress Bar & Badge
    const leadContainer = document.getElementById('dash-leaderboard-container');
    leadContainer.innerHTML = '';
    
    let limit = sorted.length > 3 ? 3 : sorted.length;
    for(let i = 0; i < limit; i++) {
        let item = sorted[i];
        let rankNum = i + 1;
        let icon = rankNum === 1 ? '🥇' : rankNum === 2 ? '🥈' : '🥉';
        
        // Penentuan Badge Kompetensi berdasarkan Nilai Preferensi V
        let badgeText = 'Good';
        let badgeClass = 'bg-blue-50 text-blue-600 border-blue-100';
        if(item.v >= 0.80) {
            badgeText = 'Excellent';
            badgeClass = 'bg-emerald-50 text-emerald-600 border-emerald-200';
        } else if(item.v >= 0.70) {
            badgeText = 'Very Good';
            badgeClass = 'bg-purple-50 text-purple-600 border-purple-200';
        }
        
        let barWidth = (item.v * 100).toFixed(0);

        leadContainer.innerHTML += `
            <div class="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 shadow-2xs hover:scale-[1.01] transition-all duration-200">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <span class="text-xl">${icon}</span>
                        <div>
                            <span class="text-xs font-bold text-slate-800">${item.id}</span>
                            <span class="text-[10px] text-slate-400 block -mt-0.5">${item.name}</span>
                        </div>
                    </div>
                    <span class="text-[9px] font-bold px-2 py-0.5 rounded-md border ${badgeClass}">${badgeText}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-purple-600 h-full rounded-full transition-all duration-500" style="width: ${barWidth}%"></div>
                    </div>
                    <span class="text-[10px] font-mono font-bold text-purple-600">${item.v.toFixed(4)}</span>
                </div>
            </div>
        `;
    }

    // 3. Render Horizontal Bar Chart (Top 10 Sebaran Nilai Preferensi)
    let limitChart = sorted.length > 10 ? 10 : sorted.length;
    let chartLabels = sorted.slice(0, limitChart).map(item => `${item.id}`);
    let chartDataValues = sorted.slice(0, limitChart).map(item => item.v);

    const ctx = document.getElementById('horizontalBarChartCanvas').getContext('2d');
    if (barChartInstance) barChartInstance.destroy();

    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Nilai Preferensi (Vi)',
                data: chartDataValues,
                backgroundColor: 'rgba(147, 51, 234, 0.75)',
                hoverBackgroundColor: 'rgba(147, 51, 234, 0.95)',
                borderRadius: 6,
                borderWidth: 0,
                barThickness: 14
            }]
        },
        options: {
            indexAxis: 'y', // Mengubah Orientasi menjadi Bar Chart Horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { max: 1, grid: { color: '#f1f5f9' }, ticks: { font: { size: 9, family: 'Quicksand' } } },
                y: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold', family: 'Quicksand' } } }
            }
        }
    });

    // 4. Update Panel Ringkasan Komparasi Statistik Matematika
    let totalKandidat = alternatif.length;
    let jumlahPenilaian = kriteria.length * alternatif.length;
    let minPref = Math.min(...sorted.map(x => x.v));
    let sumPref = sorted.reduce((acc, curr) => acc + curr.v, 0);
    let avgPref = sumPref / totalKandidat;

    document.getElementById('summary-total-kandidat').innerText = totalKandidat;
    document.getElementById('summary-jumlah-penilaian').innerText = jumlahPenilaian;
    document.getElementById('summary-pref-tertinggi').innerText = sorted[0].v.toFixed(4);
    document.getElementById('summary-pref-terendah').innerText = minPref.toFixed(4);
    document.getElementById('summary-pref-rata').innerText = avgPref.toFixed(4);
    document.getElementById('summary-status-hitung').innerText = kriteria.length > 0 ? "Calculated" : "Idle";
}

// INLINE EDITING: DATA KRITERIA
function renderKriteriaTable() {
    const tbody = document.getElementById('table-kriteria-body');
    const normWeights = getNormalizedWeights();
    tbody.innerHTML = '';
    
    kriteria.forEach(c => {
        let nw = normWeights.find(n => n.id === c.id).normWeight;
        tbody.innerHTML += `
            <tr class="border-b border-purple-50/60 hover:bg-purple-50/30">
                <td class="p-2 font-semibold text-slate-700">
                    <input type="text" value="${c.id}" 
                        onchange="updateKriteriaField('${c.id}', 'id', this.value)"
                        class="w-16 border border-purple-200 rounded-lg p-1 text-center font-mono font-semibold focus:ring-2 focus:ring-purple-400 outline-none">
                </td>
                <td class="p-2">
                    <input type="text" value="${c.name}" 
                        oninput="updateKriteriaField('${c.id}', 'name', this.value)"
                        class="w-full border border-purple-200 rounded-lg p-1 px-2 focus:ring-2 focus:ring-purple-400 outline-none">
                </td>
                <td class="p-2">
                    <select onchange="updateKriteriaField('${c.id}', 'type', this.value)"
                        class="w-full border border-purple-200 rounded-lg p-1 bg-white text-xs font-semibold focus:ring-2 focus:ring-purple-400 outline-none ${c.type === 'benefit' ? 'text-green-700 bg-green-50/20' : 'text-amber-700 bg-amber-50/20'}">
                        <option value="benefit" ${c.type === 'benefit'?'selected':''}>BENEFIT</option>
                        <option value="cost" ${c.type === 'cost'?'selected':''}>COST</option>
                    </select>
                </td>
                <td class="p-2">
                    <input type="number" step="0.01" value="${c.weight}" 
                        oninput="updateKriteriaField('${c.id}', 'weight', this.value)"
                        class="w-24 border border-purple-200 rounded-lg p-1 text-center font-mono focus:ring-2 focus:ring-purple-400 outline-none">
                </td>
                <td class="p-3 font-mono text-purple-700 font-bold tracking-wide bg-purple-50/30 text-center rounded-xl">${nw.toFixed(4)}</td>
                <td class="p-2 text-center">
                    <button onclick="deleteKriteria('${c.id}')" class="text-red-500 hover:text-red-700 p-1">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    updateKriteriaSummary();
}

function updateKriteriaField(id, field, value) {
    let idx = kriteria.findIndex(x => x.id === id);
    if (idx !== -1) {
        if (field === 'weight') {
            kriteria[idx][field] = parseFloat(value) || 0;
        } else if (field === 'id') {
            let newId = value.trim().toUpperCase();
            if(!newId || kriteria.some(x => x.id === newId && x !== kriteria[idx])) {
                showAlert('Kode kriteria tidak valid atau sudah digunakan!', 'error');
                renderKriteriaTable(); return;
            }
            alternatif.forEach(a => { a.values[newId] = a.values[id]; delete a.values[id]; });
            kriteria[idx].id = newId; renderAll(); return;
        } else {
            kriteria[idx][field] = value;
        }
        renderAll();
    }
}

function updateKriteriaSummary() {
    const summaryEl = document.getElementById('kriteria-summary-badge');
    let totalAsli = kriteria.reduce((acc, curr) => acc + parseFloat(curr.weight), 0);
    if (Math.abs(totalAsli - 1.0) < 0.0001) {
        summaryEl.className = "mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2 rounded-xl inline-block border border-emerald-200";
        summaryEl.innerHTML = `<i class="fas fa-check-circle mr-1"></i> Total bobot: ${totalAsli.toFixed(3)} ✓`;
    } else {
        summaryEl.className = "mt-2 text-xs font-semibold text-red-800 bg-red-50 p-2 rounded-xl inline-flex items-center space-x-3 border border-red-200 shadow-xs";
        summaryEl.innerHTML = `<span>Total bobot: ${totalAsli.toFixed(3)} — harus sama dengan 1.000</span><button onclick="eksekusiNormalisasiBobot()" class="bg-white hover:bg-red-100 text-red-700 border border-red-200 rounded-lg px-2.5 py-1 font-sans font-bold shadow-xs transition">Normalize</button>`;
    }
}

function eksekusiNormalisasiBobot() {
    let sum = kriteria.reduce((acc, curr) => acc + parseFloat(curr.weight), 0);
    if(sum <= 0) return;
    let totalDistribusi = 0;
    for (let i = 0; i < kriteria.length - 1; i++) {
        let bobotBaru = parseFloat((parseFloat(kriteria[i].weight) / sum).toFixed(4));
        kriteria[i].weight = bobotBaru; totalDistribusi += bobotBaru;
    }
    if (kriteria.length > 0) {
        let sisa = 1.0 - totalDistribusi; kriteria[kriteria.length - 1].weight = parseFloat(sisa.toFixed(4));
    }
    showAlert('Bobot kriteria berhasil dinormalisasi secara presisi!', 'success');
    renderAll();
}

function addNewKriteria() {
    let nextNum = kriteria.length + 1;
    let newId = `C${nextNum}`;
    while(kriteria.some(x => x.id === newId)) { nextNum++; newId = `C${nextNum}`; }
    kriteria.push({ id: newId, name: `Kriteria Baru ${nextNum}`, type: 'benefit', weight: 0.05 });
    alternatif.forEach(a => a.values[newId] = 0);
    renderAll();
}

function deleteKriteria(id) {
    kriteria = kriteria.filter(x => x.id !== id);
    alternatif.forEach(a => delete a.values[id]);
    renderAll();
}

// INLINE EDITING: DATA ALTERNATIF
function renderAlternatifTable() {
    const tbody = document.getElementById('table-alternatif-body');
    tbody.innerHTML = '';
    alternatif.forEach(a => {
        tbody.innerHTML += `
            <tr class="border-b border-purple-50/60 hover:bg-purple-50/30">
                <td class="p-2 font-semibold text-slate-700">
                    <input type="text" value="${a.id}" 
                        onchange="updateAlternatifField('${a.id}', 'id', this.value)"
                        class="w-16 border border-purple-200 rounded-lg p-1 text-center font-mono font-semibold focus:ring-2 focus:ring-purple-400 outline-none">
                </td>
                <td class="p-2">
                    <input type="text" value="${a.name}" 
                        oninput="updateAlternatifField('${a.id}', 'name', this.value)"
                        class="w-full border border-purple-200 rounded-lg p-1 px-2 focus:ring-2 focus:ring-purple-400 outline-none">
                </td>
                <td class="p-2 text-center">
                    <button onclick="deleteAlternatif('${a.id}')" class="text-red-500 hover:text-red-700 p-1">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

function updateAlternatifField(id, field, value) {
    let idx = alternatif.findIndex(x => x.id === id);
    if(idx !== -1) {
        if (field === 'id') {
            let newId = value.trim().toUpperCase();
            if(!newId || alternatif.some(x => x.id === newId && x !== alternatif[idx])) {
                showAlert('Kode alternatif tidak valid atau sudah terpakai!', 'error');
                renderAlternatifTable(); return;
            }
            alternatif[idx].id = newId; renderAll(); return;
        } else {
            alternatif[idx][field] = value;
        }
        renderAll();
    }
}

function addNewAlternatif() {
    let nextNum = alternatif.length + 1;
    let newId = `A${nextNum}`;
    while(alternatif.some(x => x.id === newId)) { nextNum++; newId = `A${nextNum}`; }
    let newValues = {}; kriteria.forEach(c => newValues[c.id] = 0);
    alternatif.push({ id: newId, name: `Kandidat Baru ${nextNum}`, values: newValues });
    renderAll();
}

function deleteAlternatif(id) {
    alternatif = alternatif.filter(x => x.id !== id);
    renderAll();
}

// INLINE EDITING: PENILAIAN MATRIKS
function renderPenilaianTable() {
    const head = document.getElementById('table-penilaian-head');
    const body = document.getElementById('table-penilaian-body');
    if (kriteria.length === 0) {
        head.innerHTML = '<th class="p-3 text-center text-gray-400">Tidak ada kriteria tersedia</th>';
        body.innerHTML = ''; return;
    }
    head.innerHTML = '<th class="p-3 font-semibold w-48 text-slate-700">Alternatif</th>';
    kriteria.forEach(c => { head.innerHTML += `<th class="p-3 font-semibold text-center w-24 text-slate-700">${c.id}</th>`; });
    
    body.innerHTML = '';
    alternatif.forEach(a => {
        let rowHtml = `<tr class="border-b border-purple-50/60 hover:bg-purple-50/20"><td class="p-3 font-bold text-indigo-950 bg-purple-50/10">${a.id} (${a.name})</td>`;
        kriteria.forEach(c => {
            let currentVal = a.values[c.id] !== undefined ? a.values[c.id] : 0;
            rowHtml += `<td class="p-1 text-center"><input type="number" step="0.01" value="${currentVal}" oninput="updateCellNilai('${a.id}', '${c.id}', this.value)" class="w-20 border border-purple-200 rounded-lg p-1 text-center focus:ring-2 focus:ring-purple-400 outline-none font-mono text-xs"></td>`;
        });
        rowHtml += '</tr>'; body.innerHTML += rowHtml;
    });
}

function updateCellNilai(altId, critId, value) {
    let altIndex = alternatif.findIndex(a => a.id === altId);
    if(altIndex !== -1) {
        alternatif[altIndex].values[critId] = parseFloat(value) || 0;
        renderAll();
    }
}

// RENDER PERHITUNGAN TABLES
function renderPerhitunganTable(data) {
    const rHead = document.getElementById('table-r-head');
    const rPembagi = document.getElementById('table-r-pembagi');
    const rBody = document.getElementById('table-r-body');
    const vHead = document.getElementById('table-v-head');
    const vBody = document.getElementById('table-v-body');
    
    if(!data || kriteria.length === 0) return;

    rHead.innerHTML = '<th class="p-3 font-semibold text-slate-700">PEMBAGI / ALTERNATIF</th>';
    rPembagi.innerHTML = '<td class="p-3 font-bold bg-purple-100 text-purple-950">NILAI PEMBAGI</td>';
    kriteria.forEach(c => { 
        rHead.innerHTML += `<th class="p-3 font-semibold text-center text-slate-700">${c.id}</th>`;
        rPembagi.innerHTML += `<td class="p-3 text-center text-indigo-950">${(data.pembagi[c.id] || 0).toFixed(3)}</td>`;
    });
    
    rBody.innerHTML = '';
    data.matriksR.forEach(row => {
        let rowHtml = `<tr class="border-b border-purple-50/40 hover:bg-purple-50/20"><td class="p-3 font-bold font-sans text-indigo-950">${row.id}</td>`;
        kriteria.forEach(c => { rowHtml += `<td class="p-3 text-center text-slate-600">${(row.values[c.id] || 0).toFixed(3)}</td>`; });
        rowHtml += '</tr>'; rBody.innerHTML += rowHtml;
    });

    vHead.innerHTML = '<th class="p-3 font-semibold text-slate-700">Alternatif</th>';
    kriteria.forEach(c => { vHead.innerHTML += `<th class="p-3 font-semibold text-center text-slate-700">${c.id}</th>`; });
    
    vBody.innerHTML = '';
    data.matriksV.forEach(row => {
        let rowHtml = `<tr class="border-b border-purple-50/40 hover:bg-purple-50/20 font-mono"><td class="p-3 font-bold font-sans text-indigo-950">${row.id}</td>`;
        kriteria.forEach(c => { rowHtml += `<td class="p-3 text-center text-slate-600">${(row.values[c.id] || 0).toFixed(4)}</td>`; });
        rowHtml += '</tr>'; vBody.innerHTML += rowHtml;
    });

    let txtPos = ""; let txtNeg = "";
    kriteria.forEach(c => {
        txtPos += `${c.id} (${c.type[0].toUpperCase()}): ${(data.idealPositif[c.id] || 0).toFixed(4)} | `;
        txtNeg += `${c.id} (${c.type[0].toUpperCase()}): ${(data.idealNegatif[c.id] || 0).toFixed(4)} | `;
    });
    document.getElementById('ideal-positif-output').innerText = txtPos || '-';
    document.getElementById('ideal-negatif-output').innerText = txtNeg || '-';

    const dBody = document.getElementById('table-jarak-body'); dBody.innerHTML = '';
    data.hasilAkhir.forEach(row => {
        dBody.innerHTML += `<tr class="border-b border-purple-50/40 hover:bg-purple-50/20"><td class="p-2.5 font-sans font-medium text-indigo-950">${row.id} - ${row.name}</td><td class="p-2.5 text-emerald-600 font-bold">${row.dPos.toFixed(5)}</td><td class="p-2.5 text-rose-600 font-bold">${row.dNeg.toFixed(5)}</td></tr>`;
    });
}

function renderRankingTable(data) {
    const tbody = document.getElementById('table-ranking-body'); tbody.innerHTML = '';
    if (!data || data.hasilAkhir.length === 0) return;
    let sorted = [...data.hasilAkhir].sort((a,b) => b.v - a.v);
    
    if (sorted[0]) document.getElementById('podium-name-1').innerText = `${sorted[0].id}\n(${sorted[0].name})`;
    if (sorted[1]) document.getElementById('podium-name-2').innerText = `${sorted[1].id}\n(${sorted[1].name})`;
    if (sorted[2]) document.getElementById('podium-name-3').innerText = `${sorted[2].id}\n(${sorted[2].name})`;
    for(let r=1; r<=3; r++) { if(sorted[r-1]) document.getElementById(`podium-value-${r}`).innerText = sorted[r-1].v.toFixed(6); }

    sorted.forEach((row, index) => {
        let rank = index + 1;
        let badgeColor = rank <= 5 ? 'bg-purple-100 text-purple-800 font-extrabold border border-purple-200' : 'bg-gray-100 text-gray-600';
        let recText = rank <= 5 ? 'Direkomendasikan (Top 5)' : 'Cadangan / Tidak Lolos';
        let rowBg = rank === 1 ? 'bg-amber-50/40 font-semibold' : rank === 2 ? 'bg-slate-50/60' : rank === 3 ? 'bg-orange-50/30' : '';
        
        tbody.innerHTML += `
            <tr class="border-b border-purple-100/60 hover:bg-purple-50/30 transition ${rowBg}">
                <td class="p-3 text-center font-black text-slate-700">${rank === 1 ? '🥇 1' : rank === 2 ? '🥈 2' : rank === 3 ? '🥉 3' : rank}</td>
                <td class="p-3 font-semibold text-slate-600 font-mono">${row.id}</td>
                <td class="p-3 font-medium text-slate-800">${row.name}</td>
                <td class="p-3 font-mono font-black text-purple-600 text-base">${row.v.toFixed(6)}</td>
                <td class="p-3 text-center"><span class="px-3 py-1 rounded-full text-xs ${badgeColor}">${recText}</span></td>
            </tr>
        `;
    });
}

function showAlert(message, type = 'info') {
    const container = document.getElementById('alert-container');
    const color = type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-purple-50 text-purple-900 border-purple-200';
    container.innerHTML = `<div class="mb-4 p-4 border rounded-xl text-sm font-medium flex justify-between items-center ${color} shadow-xs"><span><i class="fas fa-info-circle mr-2 text-purple-600"></i> ${message}</span><button onclick="this.parentElement.remove()" class="opacity-50 hover:opacity-100"><i class="fas fa-times"></i></button></div>`;
    setTimeout(() => { if (container.firstElementChild) container.firstElementChild.remove(); }, 4000);
}
