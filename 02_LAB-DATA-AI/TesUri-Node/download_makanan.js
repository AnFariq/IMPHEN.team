const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function processCSV() {
  // Buka dan baca file CSV
  const fileStream = fs.createReadStream('nutrition.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // Buat folder untuk menyimpan gambar kalau belum ada
  const downloadFolder = './gambar_makanan';
  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
  }

  let isHeader = true;
  let successCount = 0;
  let failCount = 0;
  
  // Variabel penampung untuk mencatat gambar yang di-skip atau gagal
  let errorLogs = []; 

  console.log('🚀 Memulai proses validasi dan download gambar...');

  for await (const line of rl) {
    // Lewati baris pertama (Header)
    if (isHeader) {
      isHeader = false;
      continue;
    }

    // Pecah data berdasarkan koma
    const columns = line.split(',');
    
    const rawName = columns[5];
    const imageUrl = columns[6];

    // Jika URL kosong atau bukan format http, skip dan catat!
    if (!imageUrl || !imageUrl.startsWith('http')) {
      console.log(`[SKIP] ${rawName} - URL tidak valid atau kosong.`);
      errorLogs.push(`${rawName} - Di-skip (Tidak ada gambar atau URL tidak valid)`);
      failCount++;
      continue;
    }

    // Bersihkan nama file biar rapi
    const safeName = rawName.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    
    // Ambil ekstensi asli dari URL
    let ext = 'jpg';
    const matchExt = imageUrl.match(/\.(png|jpg|jpeg|webp)/i);
    if (matchExt) ext = matchExt[1].toLowerCase();

    const fileName = `${safeName}.${ext}`;
    const filePath = path.join(downloadFolder, fileName);

    try {
      // Tembak URL untuk download
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error(`Status HTTP: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Simpan file ke folder
      fs.writeFileSync(filePath, buffer);
      
      console.log(`[SUKSES] ${rawName} -> disimpan sebagai ${fileName}`);
      successCount++;
    } catch (error) {
      // Catat error kalau gagal download
      console.log(`[GAGAL] ${rawName} - Alasan: ${error.message}`);
      errorLogs.push(`${rawName} - Gagal di-download (${error.message})`);
      failCount++;
    }

    // Kasih jeda 100ms antar request biar IP aman dari rate-limit
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Bikin file .txt berisi list angka kalau ada yang gagal
  if (errorLogs.length > 0) {
    let txtContent = "Daftar Makanan dengan Gambar Di-skip atau Gagal Download:\n\n";
    errorLogs.forEach((log, index) => {
      // Bikin list berformat "1. Nama - Alasan"
      txtContent += `${index + 1}. ${log}\n`;
    });
    
    fs.writeFileSync('catatan_gagal.txt', txtContent);
  }

  console.log(`\n=== 🎉 PROSES SELESAI 🎉 ===`);
  console.log(`✅ Gambar Berhasil Di-download : ${successCount}`);
  console.log(`❌ Gambar Gagal/Di-skip        : ${failCount}`);
  console.log(`Folder '${downloadFolder}' sudah siap!`);
  
  if (errorLogs.length > 0) {
    console.log(`📝 Catatan yang gagal sudah disimpan rapi dalam format list angka di file 'catatan_gagal.txt'.`);
  }
}

processCSV();