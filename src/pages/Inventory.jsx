import api from '../api/axios';
import { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, Box, Dialog } from '@mui/material';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ hsnCode: '', colour: '', name: '', uom: '' });

  useEffect(() => { api.get('/api/clothVariant').then(res => setItems(res.data)); }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => { setForm({ hsnCode: '', colour: '', name: '', uom: '' }); setOpen(false); };
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/api/clothVariant', form);
    setItems(await api.get('/api/clothVariant').then(r => r.data));
    handleClose();
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mt: 2 }}>Inventory</Typography>
      <Button sx={{ mt: 1, mb: 2 }} variant="contained" onClick={handleOpen}>Add New Variant</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>HSN</TableCell>
            <TableCell>Colour</TableCell>
            <TableCell>UOM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(i => (
            <TableRow key={i.id}>
              <TableCell>{i.name}</TableCell>
              <TableCell>{i.hsnCode}</TableCell>
              <TableCell>{i.colour}</TableCell>
              <TableCell>{i.uom}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <Box p={3} component="form" onSubmit={handleAdd}>
          <TextField label="HSN Code" name="hsnCode" fullWidth required sx={{ mb: 2 }} value={form.hsnCode} onChange={handleChange}/>
          <TextField label="Colour" name="colour" fullWidth required sx={{ mb: 2 }} value={form.colour} onChange={handleChange}/>
          <TextField label="Name" name="name" fullWidth required sx={{ mb: 2 }} value={form.name} onChange={handleChange}/>
          <TextField label="UOM" name="uom" fullWidth required sx={{ mb: 2 }} value={form.uom} onChange={handleChange}/>
          <Button variant="contained" type="submit" sx={{ mr: 1 }}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Dialog>
    </Container>
  );
}
