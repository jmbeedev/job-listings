// Daftar file JSON yang akan dibaca
const jobFiles = [
  'jobs/job1.json',
  'jobs/job2.json',
  'jobs/job3.json' // Tambahkan file baru di sini
];

// Fungsi untuk memuat dan menampilkan lowongan
async function loadJobs() {
  const jobListings = document.getElementById('job-listings');

  for (const file of jobFiles) {
    try {
      // Ambil data dari file JSON
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Gagal memuat file ${file}: ${response.statusText}`);
      }
      const data = await response.json();

      // Buat elemen script untuk JSON-LD
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);

      // Tambahkan elemen script ke dalam body
      document.body.appendChild(script);

      // Buat elemen HTML untuk menampilkan informasi lowongan
      const jobElement = document.createElement('div');
      jobElement.innerHTML = `
        <h2>${data.title}</h2>
        <div>${data.description}</div>
        <p><strong>Lokasi:</strong> ${data.jobLocation.address.streetAddress}, ${data.jobLocation.address.addressLocality}, ${data.jobLocation.address.addressRegion}, ${data.jobLocation.address.postalCode}, ${data.jobLocation.address.addressCountry}</p>
        <p><strong>Gaji:</strong> ${data.baseSalary.value.value} ${data.baseSalary.currency} per ${data.baseSalary.value.unitText.toLowerCase()}</p>
        <hr>
      `;

      // Tambahkan elemen lowongan ke dalam daftar
      jobListings.appendChild(jobElement);
    } catch (error) {
      console.error(error);
    }
  }
}

// Jalankan fungsi loadJobs saat halaman selesai dimuat
window.onload = loadJobs;