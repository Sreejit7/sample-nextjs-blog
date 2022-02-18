import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../models/Post";

type Props = {
  node: Post;
};
const PostCard = (post: Props) => {
  const { node: postItem } = post;
  return (
    <article className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="overflow-hidden relative shadow-md pb-80 mb-6">
        <Image
          src={postItem.featuredImage.url}
          alt={postItem.title}
          layout="fill"
          className="object-top absolute object-cover shadow-lg rounded-t-lg rounded-lg"
        />
      </div>
      <h1
        className="transition duration-700 
        text-center mb-8 cursor-pointer hover:text-blue-600 
        text-3xl font-semibold
      "
      >
        <Link href={`/post/${postItem.slug}`}>{postItem.title}</Link>
      </h1>
      <section className="w-full flex items-center">
        <section className="block lg:flex items-center justify-center gap-4 w-full mb-8">
          <section className="flex items-center justify-center mb-4 lg:mb-0">
            <Image
              src={postItem.author.image.url}
              alt={postItem.author.name}
              height={30}
              width={30}
              className="align-middle rounded-full"
            />
            <p className="inline ml-2 align-middle text-lg text-gray-500">
              {postItem.author.name}
            </p>
          </section>
          <section className="flex items-center justify-center font-medium text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              {moment(postItem.createdAt).format("MMM DD, YYYY")}
            </span>
          </section>
        </section>
      </section>
      <p className="text-center text-lg text-gray-700 font-normal px-8 lg:px-16 mb-8">
        {postItem.excerpt}
      </p>
      <section className="text-center">
        <Link passHref href={`/post/${postItem.slug}`}>
          <button className="cursor-pointer transition duration-500 transform hover:-translate-y-1 hover:shadow-lg inline-block bg-blue-500 rounded-full text-white text-lg px-6 py-2">
            Continue Reading
          </button>
        </Link>
      </section>
    </article>
  );
};

export default PostCard;
