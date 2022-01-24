import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "../../models/Post";
import { fetchRecentPosts, fetchRelatedPosts } from "../../services";

type Props = {
  categories?: string[];
  slug?: string;
};
const PostWidget = ({ categories, slug }: Props) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (slug && categories) {
      fetchRelatedPosts(slug, categories).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      fetchRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug, categories]);

  return (
    <ul className="bg-white rounded-lg px-4 py-2 shadow-lg">
      <header className="py-4 flex items-center text-gray-600 border-b w-full">
        <h2 className="">{slug ? "Related Posts" : "Recent Posts"}</h2>
      </header>
      {relatedPosts.map((post) => (
        <li key={post.slug} className="px-3 py-2 mt-4">
          <article className="flex items-center justify-space-between gap-5">
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              width={50}
              height={35}
              className="rounded-sm shadow-sm"
            />
            <section>
              <span className="text-gray-500 font-light text-sm">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
              <Link passHref href={`/post/${post.slug}`}>
                <h3 className="font-medium  cursor-pointer transition duration-700 hover:text-blue-500">
                  {post.title}
                </h3>
              </Link>
            </section>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default PostWidget;
