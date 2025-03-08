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
  'job3.json'
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
