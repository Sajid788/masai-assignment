import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import FormWithValidation from './components/FormWithValidation';
import StateLifting from './components/StateLifting';
import FragmentExample from './components/FragmentExample';
import MemoizedList from './components/MemoizedList';

function App() {
  const [activeComponent, setActiveComponent] = useState('Todo');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Todo':
        return <Todo />;
      case 'Form':
        return <FormWithValidation />;
      case 'StateLifting':
        return <StateLifting />;
      case 'Fragment':
        return <FragmentExample />;
      case 'MemoizedList':
        return <MemoizedList />;
      default:
        return <Todo />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Concepts Demo</h1>
      </header>
      
      <nav style={{ 
        margin: '20px 0', 
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <button onClick={() => setActiveComponent('Todo')}>Todo App</button>
        <button onClick={() => setActiveComponent('Form')}>Controlled Form</button>
        <button onClick={() => setActiveComponent('StateLifting')}>State Lifting</button>
        <button onClick={() => setActiveComponent('Fragment')}>Fragments</button>
        <button onClick={() => setActiveComponent('MemoizedList')}>Memoized List</button>
      </nav>
      
      <main style={{ margin: '20px', padding: '20px', border: '1px solid #ddd' }}>
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;
