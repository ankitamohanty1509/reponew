import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [users, setUsers] = useState([]);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

  const fetchUsers = async () => {
    const res = await fetch(`${BACKEND_URL}/api/users`);
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async () => {
    if (!name || !hobbies) return;
    await fetch(`${BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, hobbies })
    });
    setName('');
    setHobbies('');
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', background: '#f0f8ff' }}>
      <h1>User Hobby Tracker 🌟</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Hobbies" value={hobbies} onChange={e => setHobbies(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
      <hr />
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name} likes {u.hobbies}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
