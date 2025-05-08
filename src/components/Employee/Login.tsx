import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
//   const [mobile, setmobile]=useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit} noValidate>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            style={{ ...styles.input, borderColor: errors.email ? '#e74c3c' : '#ccc' }}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          {/* //This is mobile input tag */}
          <input type="text" name="" id="" placeholder='Please Enter your Mobile Numner' style={{border:'Red'}} />
        
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            style={{ ...styles.input, borderColor: errors.password ? '#e74c3c' : '#ccc' }}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && <span style={styles.error}>{errors.password}</span>}
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: 600,
    maxWidth: 350,
    margin: '40px auto',
    padding: 20,
    boxSizing: 'border-box',
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 24,
    fontSize: 28,
    fontWeight: 700,
    color: '#2c3e50',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 6,
    color: '#34495e',
    fontSize: 14,
    fontWeight: 600,
  },
  input: {
    height: 40,
    padding: '0 10px',
    fontSize: 16,
    borderRadius: 6,
    border: '1.5px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: '#e74c3c',
  },
  button: {
    marginTop: 10,
    height: 44,
    backgroundColor: '#2980b9',
    border: 'none',
    borderRadius: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Login;
