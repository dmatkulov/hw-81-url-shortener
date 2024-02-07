import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider, IconButton,
  InputAdornment,
  Stack,
  TextField, Tooltip,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {useAppDispatch, useAppSelector} from './app/hooks';
import {shortenUrl} from './store/urlThunks';
import {selectIsCreating, selectIsLoaded, selectShorUrl} from './store/urlSlice';
import {apiURL} from './constants';
import {UrlInput} from './types';

function App() {
  const dispatch = useAppDispatch();
  const shortUrl = useAppSelector(selectShorUrl);
  const isCreating = useAppSelector(selectIsCreating);
  const isLoaded = useAppSelector(selectIsLoaded);
  
  const [urlData, setUrlData] = useState<UrlInput>({
    originalUrl: ''
  });
  
  const [fullUrl, setFullUrl] = useState<string>('');
  
  useEffect(() => {
    if (shortUrl) {
      setFullUrl(apiURL + '/' + shortUrl.shortUrl);
    } else {
      setFullUrl('');
    }
  }, [shortUrl]);
  
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
  
  const handleCopyToClipboard = () => {
    if (shortUrl) {
      void navigator.clipboard.writeText(fullUrl);
    }
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
            type="submit"
            variant="contained"
            startIcon={<ArrowForwardIcon/>}
            disableRipple
            disableElevation
            disabled={isCreating}
            sx={{maxWidth: '116px', mt: 4}}
          >
            Shorten
          </Button>
        </Box>
        {isCreating && <CircularProgress/>}
        {isLoaded && shortUrl && (
          <Stack spacing={3} direction="column" py={3}>
            <Divider/>
            <Typography variant="h6"
            >
              Your link now looks like this:
            </Typography>
            <Stack
              px={2}
              py={1}
              borderRadius={2}
              bgcolor="white"
              spacing={2}
              direction="row"
              divider={<Divider orientation="vertical" flexItem/>}
            >
              <Button
                href={shortUrl.originalUrl}
                key={shortUrl._id}
                target="_blank"
                variant="text"
                size="small"
                fullWidth
                sx={{textTransform: 'none'}}
              >
                {fullUrl}
              </Button>
              
              <Tooltip title="Copy" arrow>
                <IconButton
                  onClick={handleCopyToClipboard}
                >
                  <ContentCopyIcon/>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        )}
      </Container>
    
    </>
  );
}

export default App;
