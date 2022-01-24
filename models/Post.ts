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
  content?: { children: any[] };
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
