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

async function fetchBitcoinPrice() {
  try {
    const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/sell');
    const data = await response.json();
    // Updated to round to the nearest dollar
    const price = `${parseFloat(data.data.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    document.getElementById('bitcoin-price').textContent = price;
  } catch (error) {
    console.error('Failed to fetch Bitcoin price', error);
  }
}

function initialize() {
  updateYear();
  fetchVersion();
  fetchBitcoinPrice(); // Add this line to fetch the price when the page loads
}

document.addEventListener('DOMContentLoaded', initialize);

// Export the functions for testing
module.exports = { updateYear, fetchVersion, fetchBitcoinPrice };
