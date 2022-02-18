export type Post = {
  author: Author;
  categories: Category[];
  createdAt: string;
  excerpt: string;
  title: string;
  slug: string;
  featuredImage: {
    url: string;
  };
  content?: { raw: { children: any[] } };
  comments: Comment[];
};

export type Author = {
  name: string;
  desc: string;
  image: {
    url: string;
  };
};

export type Category = {
  name: string;
  slug: string;
};

export type Comment = {
  name: string;
  email: string;
  comment: string;
  slug?: string;
  createdAt?: string;
};
