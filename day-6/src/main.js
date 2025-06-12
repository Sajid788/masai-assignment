import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card">
      <button id="process-data" type="button">Process Data</button>
      <div id="data-result"></div>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

// Example of optional chaining and nullish coalescing
const user = {
  profile: {
    name: 'John',
  },
};

// Optional chaining
const userName = user?.profile?.name;
// Nullish coalescing
const userAge = user?.profile?.age ?? 'Not specified';

console.log('User:', userName);
console.log('Age:', userAge);

// Demonstrate dynamic import
document.querySelector('#process-data').addEventListener('click', async () => {
  try {
    // Dynamic import of the utility module
    const utils = await import('./utils.js');
    
    // Sample data to process
    const sampleData = {
      user: {
        name: 'Jane Doe',
        profile: {
          age: 28,
        },
        contact: {
          email: 'jane@example.com',
        },
      },
    };
    
    // Process the data using the dynamically imported module
    const result = utils.processData(sampleData);
    
    // Display the result
    document.querySelector('#data-result').textContent = result.summary;
  } catch (error) {
    console.error('Error loading utils module:', error);
  }
});
