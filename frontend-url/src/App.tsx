import {Box, Button, Container, Stack, TextField} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function App() {
  return (
    <>
      <Container maxWidth="sm" sx={{backgroundColor: '#eee', borderRadius: 2, padding: 3, marginTop: 5}}>
        App
        
        <Box
          component="form"
        >
          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              fullWidth
            >
            
            </TextField>
            <Button
              variant="contained"
              startIcon={<ArrowForwardIcon/>}
              disableRipple
              disableElevation
            >
              Shorten
            </Button>
          </Stack>
          
        </Box>
      </Container>
      
    </>
  );
}

export default App;
