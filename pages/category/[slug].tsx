import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Categories, PostCard, PostWidget } from "../../components";
import { Category, Post } from "../../models/Post";
import {
  fetchCategories,
  fetchCategoryNameBySlug,
  fetchCategoryPosts,
} from "../../services";

type Props = {
  posts: { node: Post }[];
  categoryName: string;
};

const CategoryPage: NextPage<Props> = ({ posts, categoryName }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <main className="page loading">
        <h1>Loading, please wait ...</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-10 mb-8">
      <Head>
        <title>{categoryName}</title>
      </Head>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <ul className="lg:col-span-8 col-span-1">
          {posts.map((post, idx) => (
            <li key={idx}>
              <PostCard {...post} />
            </li>
          ))}
        </ul>
        <section className="lg:col-span-4 col-span-1">
          <ul className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </ul>
        </section>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: GetStaticPropsContext) => {
  const posts: { node: Post }[] =
    (await fetchCategoryPosts(params?.slug?.toString())) || [];

  // Fetch category name using slug or use a default name
  const category = (await fetchCategoryNameBySlug(
    params?.slug?.toString()
  )) || { name: "Category Page" };

  return {
    props: {
      posts,
      categoryName: category.name,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TO-DO: Add a query for fetching only limited categories to generate limited paths
  const limitedPaths: { node: Category }[] = (await fetchCategories()) || [];
  const paths = limitedPaths.map((path) => ({
    params: { slug: path.node.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default CategoryPage;
