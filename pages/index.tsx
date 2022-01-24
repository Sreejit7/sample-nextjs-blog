import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Categories, PostCard, PostWidget } from "../components";
import { Category, Post } from "../models/Post";
import { fetchCategories, fetchPosts } from "../services";

type Props = {
  posts: { node: Post }[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Sample Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await fetchPosts()) || [];

  return {
    props: {
      posts,
    },
  };
};

export default Home;
