import { Box, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Garment Dashboard</Typography>
      <Typography>Welcome! Use the menu to manage inventory, processing, and billing.</Typography>
    </Box>
  );
}
