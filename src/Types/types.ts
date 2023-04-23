export type TArticle = {
    "id"?: string,
    "title": string,
    "link": string,
    "keywords": string | null,
    "creator": string[],
    "video_url": string | null,
    "description": string,
    "content": string,
    "pubDate": string,
    "image_url": string | null,
    "source_id": string,
    "category": string[],
    "country": string[],
    "language": string,
  }

export type TAppState = {
    isLoading: boolean;
    news: {
      world: TArticle[],
      economy: TArticle[],
      technology: TArticle[]
    }
  }

export type TSubject = 'economy' | 'technology' | 'world'