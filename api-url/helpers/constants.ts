export const generateShortUrl = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let shortUrl = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    shortUrl += alphabet[randomIndex];
  }
  return shortUrl;
};



