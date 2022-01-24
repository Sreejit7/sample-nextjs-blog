import Image from "next/image";
import React from "react";
import moment from "moment";
import { Post } from "../../models/Post";

type Props = {
  post: Post;
};
const PostDetail = ({ post }: Props) => {
  return (
    <div>
      <article className="rounded-lg shadow-lg bg-white p-0 lg:p-8 pb-12 mb-8">
        <section className="relative shadow-md overflow-hidden mb-6 pb-80">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            layout="fill"
            className="object-top absolute h-full w-full object-cover shadow-lg rounded-t-lg rounded-lg"
          />
        </section>
        <section className="px-4 lg:px-0 ">
          <section className="flex items-center w-full mb-6 gap-8">
            <section className="flex items-center justify-center">
              <Image
                src={post.author.image.url}
                alt={post.author.name}
                height={30}
                width={30}
                className="align-middle rounded-full"
              />
              <p className="inline ml-2 align-middle text-lg text-gray-500">
                {post.author.name}
              </p>
            </section>
            <section className="font-medium text-gray-500">
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
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
            </section>
          </section>
          <h1 className="text-center font-bold text-3xl mb-8">{post.title}</h1>
          <section>{/* {Post Content} */}</section>
        </section>
      </article>
    </div>
  );
};

export default PostDetail;
