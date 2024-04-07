export type BlogPost = {
  id: string;
  title: string;
  body: string;
  date: string;
  likes?: number;
};

export type NewBlogPost = {
  title: string;
  body: string;
};
