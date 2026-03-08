export interface INews {
  id: number;
  title: string;
  content: string | null;
  image: string | null;
  publication_date: string;
}

export interface INewsMutation {
  title: string;
  content: string | null;
  image: File | null;
}

export interface INewsWithoutContent {
  id: number;
  title: string;
  image: string | null;
  publication_date: string;
}

export interface IComment {
  id: number;
  news_id: string;
  author: string;
  content: string;
}

export type ICommentMutation = Omit<IComment, 'id'>;
