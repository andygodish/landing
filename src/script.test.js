const { updateYear, fetchVersion } = require('./script'); // Adjust the path

beforeEach(() => {
  document.body.innerHTML = `
    <span id="current-year"></span>
    <span id="app-version"></span>
  `;
  jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ version: '1.0.0' }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('updates the year in the DOM', () => {
  updateYear();
  expect(document.getElementById('current-year').textContent).toBe(new Date().getFullYear().toString());
});

test('fetches and displays project version', async () => {
  await fetchVersion();
  expect(document.getElementById('app-version').textContent).toBe('1.0.0');
  expect(fetch).toHaveBeenCalledWith('../package.json');
});

test('handles fetch error for version', async () => {
  global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

  await fetchVersion();
  expect(console.error).toHaveBeenCalledWith('Failed to load version information', 'API is down');
});