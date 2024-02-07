export interface Url {
  _id: string,
  shortUrl: string,
  originalUrl: string
}

export type UrlWithoutId = Omit<Url, '_id'>;
