import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => setValues(v => ({
    ...v, [e.target.name]: e.target.value
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', values);
      login(res.data.token, { username: values.username });
      navigate('/');
    } catch {
      setError("Username or password incorrect");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, p:2, border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="h5" align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            margin="normal"
            required fullWidth
            onChange={handleChange}
            value={values.username}
          />
          <TextField
            label="Password"
            name="password"
            margin="normal"
            type="password"
            required fullWidth
            onChange={handleChange}
            value={values.password}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
          {error && <Typography color="error" align="center">{error}</Typography>}
        </form>
      </Box>
    </Container>
  );
}
