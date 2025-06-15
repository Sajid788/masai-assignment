import React, { useState, useCallback } from 'react';

// Individual list item component wrapped with React.memo
const ListItem: React.FC<{
  item: string;
  onRemove: (item: string) => void;
}> = React.memo(({ item, onRemove }) => {
  console.log(`Rendering ListItem: ${item}`); // Console log to demonstrate render optimization
  
  return (
    <li style={{ padding: '8px', marginBottom: '8px', border: '1px solid #ddd' }}>
      {item}
      <button 
        onClick={() => onRemove(item)}
        style={{ marginLeft: '10px' }}
      >
        Remove
      </button>
    </li>
  );
});

// List component wrapped with React.memo
const ItemList: React.FC<{
  items: string[];
  onRemoveItem: (item: string) => void;
}> = React.memo(({ items, onRemoveItem }) => {
  console.log('Rendering ItemList'); // Console log to demonstrate render optimization
  
  if (items.length === 0) {
    return <p>No items to display</p>;
  }
  
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <ListItem key={index} item={item} onRemove={onRemoveItem} />
      ))}
    </ul>
  );
});

const MemoizedList: React.FC = () => {
  const [items, setItems] = useState<string[]>([
    'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'
  ]);
  const [newItem, setNewItem] = useState('');
  const [count, setCount] = useState(0);
  
  // Using useCallback to memoize the function reference
  const handleRemoveItem = useCallback((itemToRemove: string) => {
    setItems(currentItems => currentItems.filter(item => item !== itemToRemove));
  }, []);
  
  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setItems(currentItems => [...currentItems, newItem]);
      setNewItem('');
    }
  };
  
  return (
    <div>
      <h2>Memoized List Example</h2>
      <p>
        This component demonstrates React.memo optimization. 
        Open your browser console to see render logs.
      </p>
      
      <div>
        <input 
          type="text" 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      
      <div>
        {/* This button increments a counter that doesn't affect the list */}
        <p>Counter: {count}</p>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{ marginBottom: '20px' }}
        >
          Increment Counter (Won't Re-render List)
        </button>
        <p>
          Click this button to see that the ItemList doesn't re-render 
          when unrelated state changes.
        </p>
      </div>
      
      <ItemList items={items} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default MemoizedList; 