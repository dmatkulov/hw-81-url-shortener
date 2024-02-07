export interface Url {
  _id: string,
  shortUrl: string,
  originalUrl: string
}

export type UrlInput = Omit<Url, 'shortUrl' | '_id'>;