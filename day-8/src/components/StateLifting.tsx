import React, { useState } from 'react';

// Child component that receives and displays data
const DisplayComponent: React.FC<{
  count: number;
  incrementCount: () => void;
}> = ({ count, incrementCount }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Display Component</h3>
      <p>Count value: {count}</p>
      <button onClick={incrementCount}>Increment from Display</button>
    </div>
  );
};

// Child component that can modify data
const ControlComponent: React.FC<{
  count: number;
  incrementCount: () => void;
  decrementCount: () => void;
  resetCount: () => void;
}> = ({ count, incrementCount, decrementCount, resetCount }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Control Component</h3>
      <p>Current count: {count}</p>
      <div>
        <button onClick={incrementCount}>Increment</button>
        <button onClick={decrementCount}>Decrement</button>
        <button onClick={resetCount}>Reset</button>
      </div>
    </div>
  );
};

// Parent component that manages state
const StateLifting: React.FC = () => {
  // Shared state lifted to the parent component
  const [count, setCount] = useState(0);
  
  // Handler functions to modify state
  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count - 1);
  const resetCount = () => setCount(0);
  
  return (
    <div>
      <h2>State Lifting Example</h2>
      <p>This example demonstrates lifting state up to a common parent component.</p>
      
      {/* Pass state and handler functions to child components */}
      <DisplayComponent 
        count={count} 
        incrementCount={incrementCount} 
      />
      
      <ControlComponent 
        count={count} 
        incrementCount={incrementCount}
        decrementCount={decrementCount}
        resetCount={resetCount}
      />
    </div>
  );
};

export default StateLifting; 