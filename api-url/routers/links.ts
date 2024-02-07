import {Router} from 'express';
import {UrlWithoutId} from '../types';
import {generateShortUrl} from '../helpers/constants';
import Link from '../models/Link';

const linksRouter = Router();
linksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const shortUrl = req.params.shortUrl;
    
    const url = await Link.findOne({shortUrl});
    
    if (!url) {
      return res.status(404).json({error: 'Link not found'});
    }
    res.redirect(url.originalUrl);
  } catch (e) {
    return next(e);
  }
});
linksRouter.post('/links', async (req, res, next) => {
  try {
    const originalUrl = req.body.originalUrl;
    const shortUrl = generateShortUrl();
    
    const existingShortUrl = await Link.findOne({shortUrl});
    
    if (existingShortUrl) {
      return res.status(500).json({error: 'Short URL already exists'});
    }
    
    const urlData: UrlWithoutId = {
      shortUrl,
      originalUrl
    };
    
    const url = new Link(urlData);
    await url.save();
    
    res.send(url);
  } catch (e) {
    return next(e);
  }
});
export default linksRouter;