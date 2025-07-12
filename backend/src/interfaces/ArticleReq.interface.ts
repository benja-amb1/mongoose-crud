import { Request } from "express";

/*
This is very important to do, this will allow us to make the Requests without problems.
*/

interface Article {
  title: string;
  subtitle: string;
  content: string;
  images: string[];
}

export interface ArticleRequest extends Request {
  article?: Article
}
