import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Container, Typography, Box, MenuItem, TextField, Button } from "@mui/material";

export default function Billing() {
  const [variants, setVariants] = useState([]);
  const [form, setForm] = useState({ variantId: '', qty: '' });
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => { api.get("/api/clothVariant").then(r => setVariants(r.data)); }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/billing/invoice", null, {
        params: { variantId: form.variantId, qty: form.qty },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setPdfUrl(url);
    } catch {
      alert("Billing failed: Not enough stock or error.");
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={2}>Billing</Typography>
      <Box sx={{ maxWidth: 400 }} component="form" onSubmit={handleSubmit}>
        <TextField select label="Variant" name="variantId" required fullWidth value={form.variantId} onChange={handleChange} sx={{ mb: 1 }}>
          {variants.map(v => <MenuItem value={v.id} key={v.id}>{v.name} ({v.colour})</MenuItem>)}
        </TextField>
        <TextField label="Quantity" name="qty" required fullWidth value={form.qty} onChange={handleChange}/>
        <Button sx={{ mt: 2 }} variant="contained" type="submit">Generate Invoice</Button>
      </Box>
      {pdfUrl && (
        <Button sx={{ mt: 3 }} variant="outlined" onClick={() => window.open(pdfUrl)}>
          Download Invoice PDF
        </Button>
      )}
    </Container>
  );
}
