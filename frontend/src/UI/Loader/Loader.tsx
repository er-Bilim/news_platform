import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', color: [grey[900]] }}>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loader;
