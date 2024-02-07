import {Button, CircularProgress, Container, InputAdornment, TextField, Typography} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import React, {useState} from 'react';
import {Url, UrlInput} from './types';
import axiosApi from './axiosApi';

function App() {
  const [urlData, setUrlData] = useState<UrlInput>({
    originalUrl: ''
  });
  
  const [urlResponse, setUrlResponse] = useState<Url>({
    _id: '',
    shortUrl: '',
    originalUrl: ''
  });
  
  const [isCreating, setIsCreating] = useState(false);
  
  const shortenUrl = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!urlData.originalUrl.trim()) {
      return;
    }
    
    try {
      setIsCreating(true);
      
      const responseData = await axiosApi.post('/links', urlData);
      const response = responseData.data;

      if (!response) {
        return;
      }
      
      setIsCreating(false);
      
      const newUrl: Url = {
        _id: response._id,
        shortUrl: response.shortUrl,
        originalUrl: response.originalUrl
      }
      
      setUrlResponse(newUrl);
    } finally {
      setIsCreating(false);
    }
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setUrlData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <>
      <Container maxWidth="sm"
                 sx={{
                   backgroundColor: '#f5f2f0',
                   borderRadius: 2,
                   padding: 3,
                   marginTop: 5,
                   textAlign: 'center'
      }}>
        <Typography
          component="h1"
          variant="h4"
          mb={4}
        >
          Shorten your url link!
        </Typography>
          <form onSubmit={shortenUrl}>
            <TextField
              required
              size="small"
              type="text"
              name="originalUrl"
              id="originalUrl"
              placeholder="Place your link"
              fullWidth
              InputProps={{
                startAdornment:
                  <InputAdornment
                    position="start">
                    <ContentCutIcon fontSize="small"/>
                  </InputAdornment>
              }}
              onChange={handleChange}
              value={urlData.originalUrl}
            />
            <Button
              variant="contained"
              startIcon={<ArrowForwardIcon/>}
              disableRipple
              disableElevation
              sx={{maxWidth: '116px', mt: 4}}
              type="submit"
            >
              Shorten
            </Button>
          </form>
        {isCreating && <CircularProgress/>}
      </Container>
    
    </>
  );
}

export default App;
