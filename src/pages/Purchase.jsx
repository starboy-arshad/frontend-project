import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Container, Typography, TextField, Button, MenuItem, Box } from "@mui/material";

export default function Purchase() {
  const [variants, setVariants] = useState([]);
  const [form, setForm] = useState({ variantId: '', qty: '', cost: '' });

  useEffect(() => {
    api.get("/api/clothVariant").then(res => setVariants(res.data));
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/api/purchase", {
      variantId: form.variantId,
      qty: form.qty,
      cost: form.cost
    });
    alert("Purchase recorded!");
    setForm({ variantId: '', qty: '', cost: '' });
  };

  return (
    <Container>
      <Typography variant="h5" mt={2}>Add Purchase</Typography>
      <Box component="form" sx={{ maxWidth: 400 }} onSubmit={handleSubmit}>
        <TextField select margin="normal" label="Variant" name="variantId" fullWidth required value={form.variantId} onChange={handleChange}>
          {variants.map(v => <MenuItem key={v.id} value={v.id}>{v.name} ({v.colour})</MenuItem>)}
        </TextField>
        <TextField margin="normal" label="Quantity" name="qty" required fullWidth value={form.qty} onChange={handleChange}/>
        <TextField margin="normal" label="Cost" name="cost" required fullWidth value={form.cost} onChange={handleChange}/>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save</Button>
      </Box>
    </Container>
  );
}
