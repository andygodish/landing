function updateYear() {
  const yearSpan = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}

async function fetchVersion() {
  try {
    const response = await fetch('./package.json');
    const data = await response.json();
    document.getElementById('app-version').textContent = `v${data.version}`;
  } catch (error) {
    console.error('Failed to load version information', error);
  }
}

document.addEventListener('DOMContentLoaded', updateYear);
document.addEventListener('DOMContentLoaded', fetchVersion);

// Export the functions for testing
module.exports = { updateYear, fetchVersion };
