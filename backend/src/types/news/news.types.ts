export interface INews {
  id: number;
  title: string;
  content: string | null;
  image: string | null;
  publication_date: string;
}

export type INewsWithoutId = Omit<INews, 'id'>;
export type INewsWithoutContent = Omit<INews, 'content'>;

export interface IComment {
  id: number;
  news_id: string;
  author: string;
  content: string;
}

export type ICommentWithoutId = Omit<IComment, 'id'>;
