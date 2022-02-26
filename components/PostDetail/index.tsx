import Image from "next/image";
import React, { Fragment, useState } from "react";
import moment from "moment";
import { Post } from "../../models/Post";
import { useRouter } from "next/router";

type Props = {
  post: Post;
};

const hostName = process.env.HOST_NAME;

const PostDetail = ({ post }: Props) => {
  const router = useRouter();
  const [linkCopied, setLinkCopied] = useState(false);

  /**
   * @description For rendering the content section
   * @param object The current post section object
   * @param text Thet text inside the current object
   * @param index Index of the current object in parent section
   * @param type Type of the object
   * @returns Formatted content section
   */
  const getContentFragment = (
    object: any,
    text: any,
    index: number,
    type?: string
  ) => {
    let modifiedText = text;

    if (object) {
      if (object.bold) {
        modifiedText = <b key={index}>{text}</b>;
      } else if (object.italic) {
        modifiedText = <em key={index}>{text}</em>;
      } else if (object.underline) {
        modifiedText = <u key={index}>{text}</u>;
      } else if (object.href) {
        modifiedText = (
          <a
            key={index}
            href={object.href}
            target="_blank"
            rel="noreferrer"
            className="transition duration-700 underline hover:text-blue-600"
          >
            {object.children.map((item: any, i: number) => (
              <Fragment key={i}>{item.text}</Fragment>
            ))}
          </a>
        );
      }
    }

    // To-do: Add more possible types to render specific content for more types
    switch (type) {
      case "paragraph":
        return (
          <p key={index} className="mb-8 text-justify">
            {modifiedText.map((item: any, i: number) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </p>
        );
      case "heading-one":
        return (
          <h1 key={index} className="text-2xl font-bold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h1>
        );
      case "heading-two":
        return (
          <h2 key={index} className="text-xl font-bold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h2>
        );
      case "heading-three":
        return (
          <h3 key={index} className="text-lg font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h3>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-8">
            {modifiedText.map((item: any, i: number) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <Image
            key={index}
            src={object.src}
            alt={object.title}
            height={object.height}
            width={object.width}
            className="mb-4 rounded-sm"
          />
        );
      default:
        return modifiedText;
    }
  };

  const copyPostLink = () => {
    navigator.clipboard.writeText(`${hostName}${router.asPath}`);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  return (
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
        <section className="flex flex-col md:flex-row items-center w-full mb-6 gap-6 md:gap-8">
          <section className="flex items-center justify-center">
            <Image
              src={post.author.image.url}
              alt={post.author.name}
              height={30}
              width={30}
              className="align-middle rounded-full"
            />
            <p
              className="inline ml-2 align-middle text-lg text-gray-500"
              data-testid="post-author-name"
            >
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
            <span className="align-middle" data-testid="post-createdAt">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </section>
          <button
            className={`transition duration-500 button px-2 py-1 rounded-md 
                          shadow-md text-white hover:shadow-lg w-36
                          ${
                            linkCopied
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
            onClick={() => copyPostLink()}
            data-testid="copy-link-btn"
          >
            {linkCopied ? (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 inline text-white"
                stroke="currentColor"
              >
                <path
                  strokeWidth="1"
                  fill="currentColor"
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 inline text-white"
                stroke="currentColor"
              >
                <path
                  strokeWidth="1"
                  d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"
                ></path>
              </svg>
            )}
            <span data-testid="copy-link-text">
              {linkCopied ? "Link Copied!" : "Copy Link"}
            </span>
          </button>
        </section>
        <h1
          className="text-center font-bold text-3xl mb-8"
          data-testid="post-title"
        >
          {post.title}
        </h1>
        <section>
          {post.content?.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map(
              (item: any, itemIndex: number) =>
                getContentFragment(item, item.text, itemIndex)
            );

            return getContentFragment(typeObj, children, index, typeObj.type);
          })}
        </section>
      </section>
    </article>
  );
};

export default PostDetail;
