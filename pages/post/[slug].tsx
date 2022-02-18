import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Author,
  Categories,
  Comments,
  PostDetail,
  PostWidget,
} from "../../components";
import CommentsForm from "../../components/Comments/CommentsForm";
import { Post } from "../../models/Post";
import { fetchPostDetails, fetchPostPaths } from "../../services";

type Props = {
  post: Post;
};

const PostDetails: NextPage<Props> = ({ post }) => {
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
        <title>{post.title}</title>
        <meta name="description" content={`${post.excerpt}`} />
      </Head>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="lg:col-span-8 col-span-1">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          {post.comments.length > 0 && <Comments comments={post.comments} />}
        </section>
        <section className="lg:col-span-4 col-span-1">
          <ul className="lg:sticky relative top-8">
            <PostWidget
              categories={post.categories.map((category) => category.slug)}
              slug={post.slug}
            />
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
  const post: Post = (await fetchPostDetails(params?.slug?.toString())) || {};
  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const limitedPaths: { node: { slug: string } }[] = await fetchPostPaths();

  const paths = limitedPaths.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default PostDetails;
