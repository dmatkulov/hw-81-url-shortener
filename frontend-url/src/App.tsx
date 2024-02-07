import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import React, {useState} from 'react';
import {UrlInput} from './types';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {shortenUrl} from './store/urlThunks';
import {selectIsCreating, selectIsLoaded, selectShorUrl} from './store/urlSlice';
import {apiURL} from './constants';

function App() {
  const dispatch = useAppDispatch();
  const shortUrl = useAppSelector(selectShorUrl);
  const isCreating = useAppSelector(selectIsCreating);
  const isLoaded = useAppSelector(selectIsLoaded);
  
  const [urlData, setUrlData] = useState<UrlInput>({
    originalUrl: ''
  });
  
  const fullUrl = `${apiURL}/${shortUrl.shortUrl}`;
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    
    setUrlData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(shortenUrl(urlData));
    setUrlData({
      originalUrl: ''
    });
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
        <Box
          component="form"
          onSubmit={handleSubmit}>
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
                  <InsertLinkIcon fontSize="small"/>
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
            disabled={isCreating}
          >
            Shorten
          </Button>
        </Box>
        {isCreating && <CircularProgress/>}
        {isLoaded && (
          <Stack spacing={3} direction="column" py={3}>
            <Divider/>
            <Typography variant="h6"
            >
              Your link now looks like this:
            </Typography>
            <Box p={1} borderRadius={2} bgcolor="white">
              <Button
                href={shortUrl.originalUrl}
                target="_blank"
                key={shortUrl._id}
                size="small"
              >
                {fullUrl}
              </Button>
            </Box>
          </Stack>
        )}
      </Container>
    
    </>
  );
}

export default App;
