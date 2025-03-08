// Hamburger Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

document.querySelectorAll('.footer-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = link.getAttribute('href').substring(1);
    openModal(modalId);
  });
});

document.querySelectorAll('.modal .close').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.closest('.modal').id;
    closeModal(modalId);
  });
});

window.onclick = (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
};

// Load Jobs
const jobFiles = [
'job1.json',
'job2.json',
'job3.json',
'job4.json',
'job5.json',
'job6.json',
'job7.json',
'job8.json',
'job9.json',
'job10.json',
'job11.json',
'job12.json',
'job13.json',
'job14.json',
'job15.json',
'job16.json',
'job17.json',
'job18.json',
'job19.json',
'job20.json',
'job21.json',
'job22.json',
'job23.json',
'job24.json',
'job25.json',
'job26.json',
'job27.json',
'job28.json',
'job29.json',
'job30.json',
'job31.json',
'job32.json',
'job33.json',
'job34.json',
'job35.json',
'job36.json',
'job37.json',
'job38.json',
'job39.json',
'job40.json',
'job41.json',
'job42.json',
'job43.json',
'job44.json',
'job45.json',
'job46.json',
'job47.json',
'job48.json',
'job49.json',
'job50.json',
'job51.json',
'job52.json',
'job53.json',
'job54.json',
'job55.json',
'job56.json',
'job57.json',
'job58.json',
'job59.json',
'job60.json',
'job61.json',
'job62.json',
'job63.json',
'job64.json',
'job65.json',
'job66.json',
'job67.json',
'job68.json',
'job69.json',
'job70.json',
'job71.json',
'job72.json',
'job73.json',
'job74.json',
'job75.json',
'job76.json',
'job77.json',
'job78.json',
'job79.json',
'job80.json',
'job81.json',
'job82.json',
'job83.json',
'job84.json',
'job85.json',
'job86.json',
'job87.json',
'job88.json',
'job89.json',
'job90.json',
'job91.json',
'job92.json',
'job93.json',
'job94.json',
'job95.json',
'job96.json',
'job97.json',
'job98.json',
'job99.json',
'job100.json'
];

async function loadJobs() {
  const jobListings = document.getElementById('job-listings');

  for (const file of jobFiles) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Gagal memuat file ${file}: ${response.statusText}`);
      }
      const data = await response.json();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.body.appendChild(script);

      const jobElement = document.createElement('div');
      jobElement.classList.add('job-card');
      jobElement.innerHTML = `
        <img src="${data.hiringOrganization.logo}" alt="${data.hiringOrganization.name}">
        <div class="job-details">
          <h2>${data.title}</h2>
          <div>${data.description}</div>
          <div class="location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>${data.jobLocation.address.streetAddress}, ${data.jobLocation.address.addressLocality}, ${data.jobLocation.address.addressRegion}, ${data.jobLocation.address.postalCode}, ${data.jobLocation.address.addressCountry}</span>
          </div>
          <div class="salary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>${data.baseSalary.value.value} ${data.baseSalary.currency} per ${data.baseSalary.value.unitText.toLowerCase()}</span>
          </div>
          <a href="${data.hiringOrganization.website}" class="apply-button" target="_blank">Lamar Sekarang</a>
        </div>
      `;
      jobListings.appendChild(jobElement);
    } catch (error) {
      console.error(error);
    }
  }
}

window.onload = loadJobs;

document.addEventListener('DOMContentLoaded', function () {
  // Cari schema JSON-LD di halaman
  const schemaScript = document.querySelector('script[type="application/ld+json"]');
  if (schemaScript) {
    try {
      // Parse JSON-LD
      const jsonLd = JSON.parse(schemaScript.textContent);

      // Buat entri baru dengan datePosted dan validThrough terbaru
      const newEntry = {
        datePosted: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
        validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 hari dari sekarang
      };

      // Tambahkan entri baru ke dalam schema JSON-LD
      jsonLd.newEntry = newEntry; // Menambahkan entri baru sebagai properti terpisah

      // Perbarui konten script dengan schema yang telah diubah
      schemaScript.textContent = JSON.stringify(jsonLd, null, 2);

      console.log('Entri baru ditambahkan ke schema JSON-LD:', newEntry);
      console.log('Schema JSON-LD diperbarui:', jsonLd);
    } catch (error) {
      console.error('Gagal memproses schema JSON-LD:', error);
    }
  } else {
    console.error('Schema JSON-LD tidak ditemukan di halaman.');
  }
});
