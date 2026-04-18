const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function scrapeGoogleImages() {
  const txtPath = 'catatan_gagal.txt';
  const downloadFolder = './gambar_makanan_hilang';

  if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder);
    console.log(`📁 Folder '${downloadFolder}' berhasil dibuat!`);
  }

  if (!fs.existsSync(txtPath)) {
    console.log('File catatan_gagal.txt tidak ditemukan. Aman bos!');
    return;
  }

  const textData = fs.readFileSync(txtPath, 'utf-8');
  const lines = textData.split('\n');
  
  const foodsToSearch = [];
  lines.forEach(line => {
    const match = line.match(/^\d+\.\s*(.*?)\s*-/);
    if (match && match[1]) {
      foodsToSearch.push(match[1].trim());
    }
  });

  if (foodsToSearch.length === 0) {
    console.log('Tidak ada nama makanan yang perlu dicari.');
    return;
  }

  console.log(`🚀 Siap mencari ${foodsToSearch.length} gambar yang hilang di Google...`);

  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'] 
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  let successCount = 0;
  
  // VARIABEL BARU: Buat nyimpen daftar yang MASIH gagal di Google
  let stillFailed = []; 

  for (let i = 0; i < foodsToSearch.length; i++) {
    const rawName = foodsToSearch[i];
    const safeName = rawName.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filePath = path.join(downloadFolder, `${safeName}.jpg`);

    console.log(`🔍 Mencari gambar: ${rawName}...`);

    try {
      const query = encodeURIComponent(`${rawName} makanan indonesia`);
      
      await page.goto(`https://www.google.com/search?tbm=isch&q=${query}`, { 
        waitUntil: 'domcontentloaded', 
        timeout: 10000 
      });

      await new Promise(r => setTimeout(r, 1000));

      const imgSrc = await page.evaluate(() => {
        const imgs = document.querySelectorAll('img');
        for (let img of imgs) {
          const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-iurl') || '';
          
          if (src.includes('encrypted-tbn0.gstatic.com/images') || (src.startsWith('data:image/') && src.length > 500)) {
            return src;
          }
        }
        return null;
      });

      if (!imgSrc) {
        console.log(`   ❌ [GAGAL] URL gambar tidak ditemukan di halaman Google.`);
        stillFailed.push(`${rawName} - Tidak ada foto yang pas di Google`); // Catat yang gagal!
        continue;
      }

      if (imgSrc.startsWith('data:image')) {
        const base64Data = imgSrc.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filePath, buffer);
        console.log(`   ✅ [SUKSES] ${safeName}.jpg (Tersimpan ke gambar_makanan_hilang)`);
        successCount++;
      } else if (imgSrc.startsWith('http')) {
        const res = await fetch(imgSrc);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filePath, buffer);
        console.log(`   ✅ [SUKSES] ${safeName}.jpg (Tersimpan ke gambar_makanan_hilang)`);
        successCount++;
      }

    } catch (error) {
      console.log(`   ❌ [GAGAL] Error saat request: ${error.message}`);
      stillFailed.push(`${rawName} - Gagal ditarik (${error.message})`); // Catat yang error!
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await browser.close();
  
  // PROSES BARU: Bikin file gambar_rusak_part2.txt kalau ada yang masuk list stillFailed
  if (stillFailed.length > 0) {
    let txtContent = "Daftar Makanan yang MASIH GAGAL ditarik dari Google:\n\n";
    stillFailed.forEach((log, index) => {
      txtContent += `${index + 1}. ${log}\n`;
    });
    fs.writeFileSync('gambar_rusak_part2.txt', txtContent);
  }

  console.log(`\n=== 🎉 PENGECEKAN GOOGLE SELESAI 🎉 ===`);
  console.log(`Berhasil dapet: ${successCount} gambar.`);
  
  if (stillFailed.length > 0) {
    console.log(`❌ Masih ada ${stillFailed.length} gambar yang super bandel. Udah dicatat di 'gambar_rusak_part2.txt'.`);
  } else {
    console.log(`✅ LENGKAP 100%! Nggak ada yang masuk part 2. Silakan cek folder '${downloadFolder}', brok!`);
  }
}

scrapeGoogleImages();