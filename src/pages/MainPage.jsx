import React, { useState, useEffect } from 'react';

const MainPage = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', salary: 50000, hours: 40 },
    { id: 2, name: 'Jane Smith', salary: 60000, hours: 38 },
    { id: 3, name: 'Bob Johnson', salary: 55000, hours: 42 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [formData, setFormData] = useState({ id: null, name: '', salary: '', hours: '' });
  const [isEditing, setIsEditing] = useState(false);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleAdd = () => {
    if (!formData.name || !formData.salary || !formData.hours) return;

    const newEmp = {
      id: Date.now(),
      name: formData.name,
      salary: Number(formData.salary),
      hours: Number(formData.hours),
    };
    setEmployees([...employees, newEmp]);
    setFormData({ id: null, name: '', salary: '', hours: '' });
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setEmployees(employees.map(emp => (emp.id === formData.id ? formData : emp)));
    setFormData({ id: null, name: '', salary: '', hours: '' });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Employee Details</h2>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Working Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.salary}</td>
              <td>{emp.hours}</td>
              <td>
                <button onClick={() => handleEdit(emp)} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(emp.id)} style={{ ...styles.button, backgroundColor: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === index + 1 ? 'blue' : 'turquoise'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Working Hours"
          value={formData.hours}
          onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
          style={styles.input}
        />
        {isEditing ? (
          <button onClick={handleUpdate} style={styles.button}>Update</button>
        ) : (
          <button onClick={handleAdd} style={styles.button}>Add</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid',
    borderRadius: '10px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  input: {
    padding: '8px',
    margin: '5px',
    fontSize: '14px',
    width: '100%',
  },
  form: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  pagination: {
    marginTop: '15px',
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
  },
  pageButton: {
    padding: '6px 10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
  }
};

export default MainPage;
