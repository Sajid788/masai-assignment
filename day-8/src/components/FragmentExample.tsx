import React from 'react';

// Component using Fragment with explicit syntax
const TableRowComponent: React.FC<{ id: number; name: string; role: string }> = ({ id, name, role }) => {
  return (
    <React.Fragment>
      <td>{id}</td>
      <td>{name}</td>
      <td>{role}</td>
    </React.Fragment>
  );
};

// Component using Fragment with shorthand syntax
const ListItems: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </>
  );
};

const FragmentExample: React.FC = () => {
  const users = [
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer' },
    { id: 3, name: 'Mike Johnson', role: 'Manager' }
  ];

  const skills = ['React', 'TypeScript', 'CSS', 'HTML', 'Node.js'];

  return (
    <>
      <h2>Fragment Examples</h2>
      
      <div>
        <h3>Table Example (Explicit Fragment Syntax)</h3>
        <p>This table demonstrates using explicit React.Fragment syntax:</p>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <TableRowComponent id={user.id} name={user.name} role={user.role} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>List Example (Shorthand Fragment Syntax)</h3>
        <p>This list demonstrates using shorthand fragment syntax (&lt;&gt;...&lt;/&gt;):</p>
        <ul>
          <ListItems items={skills} />
        </ul>
      </div>
      
      <p>
        Fragments let you group elements without adding extra nodes to the DOM.
        This is useful for:
      </p>
      <>
        <li>Returning multiple elements from a component</li>
        <li>Creating table rows and lists</li>
        <li>Wrapping elements without creating unnecessary divs</li>
      </>
    </>
  );
};

export default FragmentExample; 