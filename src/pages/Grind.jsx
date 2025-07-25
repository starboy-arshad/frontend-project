import { useState, useEffect } from "react";
import api from "../api/axios";
import { Container, Typography, Button, MenuItem, TextField, Box } from "@mui/material";

export default function Grind() {
  const [variants, setVariants] = useState([]);
  const [form, setForm] = useState({
    rawVariantId: "", finishedVariantId: "", qtyIn: "", qtyOut: "", lossPct: ""
  });

  useEffect(() => { api.get("/api/clothVariant").then(r => setVariants(r.data)) }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/api/grind", {
      rawVariantId: form.rawVariantId,
      finishedVariantId: form.finishedVariantId,
      qtyIn: form.qtyIn,
      qtyOut: form.qtyOut,
      lossPct: form.lossPct
    });
    alert("Grind processed!");
    setForm({ rawVariantId: "", finishedVariantId: "", qtyIn: "", qtyOut: "", lossPct: "" });
  };

  return (
    <Container>
      <Typography variant="h5" mt={2}>Grind Operation</Typography>
      <Box sx={{ maxWidth: 400 }} component="form" onSubmit={handleSubmit}>
        <TextField
          select label="Raw variant" name="rawVariantId" fullWidth required value={form.rawVariantId} onChange={handleChange} sx={{ mb: 1 }}
        >{variants.map(v => <MenuItem key={v.id} value={v.id}>{v.name} ({v.colour})</MenuItem>)}</TextField>
        <TextField
          select label="Finished variant" name="finishedVariantId" fullWidth required value={form.finishedVariantId} onChange={handleChange} sx={{ mb: 1 }}
        >{variants.map(v => <MenuItem key={v.id} value={v.id}>{v.name} ({v.colour})</MenuItem>)}</TextField>
        <TextField label="Qty In (kg/m)" required fullWidth name="qtyIn" value={form.qtyIn} onChange={handleChange} sx={{ mb: 1 }}/>
        <TextField label="Qty Out (kg/m)" required fullWidth name="qtyOut" value={form.qtyOut} onChange={handleChange} sx={{ mb: 1 }}/>
        <TextField label="Loss (%)" required fullWidth name="lossPct" value={form.lossPct} onChange={handleChange}/>
        <Button variant="contained" sx={{ mt: 2 }} type="submit">Submit</Button>
      </Box>
    </Container>
  );
}
