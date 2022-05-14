import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useState, MouseEvent } from "react";
import moment from "moment";
import { FaLinkedin, FaShareAlt, FaTwitter } from "react-icons/fa";
import { LinkedinShareButton, TwitterShareButton } from "react-share";
import FocusTrap from "focus-trap-react";
import { Post } from "../../models/Post";
import {
  ModalActionTypes,
  useModalContext,
} from "../../contexts/useModalContext";
import ShareWidget from "../ShareWidget";
import CopyLinkButton from "../CopyLinkButton";

type Props = {
  post: Post;
};

const hostName = process.env.HOST_NAME;

const PostDetail = ({ post }: Props) => {
  const router = useRouter();
  const { dispatch } = useModalContext();
  const postUrl = `${hostName}${router.asPath}`;
  const postTitle = `${post.title} by ${post.author.name}`;

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

  const handleShareTooltip = (e: MouseEvent<HTMLElement>) => {
    const { bottom, left, right } = e.currentTarget.getBoundingClientRect();

    dispatch({
      type: ModalActionTypes.CREATE_MODAL,
      children: (
        // Trap the focus inside the modal when it's mounted
        <FocusTrap>
          <ul className="flex flex-col gap-1">
            {shareWidgets.map((widget, idx) => (
              <React.Fragment key={idx}>{widget.item}</React.Fragment>
            ))}
          </ul>
        </FocusTrap>
      ),
      location: {
        top: bottom + 5,
        center: (left + right) / 2,
      },
    });
  };

  const shareWidgets: { item: React.ReactNode }[] = [
    {
      item: (
        <TwitterShareButton title={postTitle} url={postUrl}>
          <ShareWidget icon={<FaTwitter color="#1D9BF0" />} text="Tweet" />
        </TwitterShareButton>
      ),
    },
    {
      item: (
        <LinkedinShareButton url={postUrl} title={postTitle}>
          <ShareWidget icon={<FaLinkedin color="#0A66C2" />} text="Post" />
        </LinkedinShareButton>
      ),
    },
    {
      item: <CopyLinkButton />,
    },
  ];

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
            className="py-1 px-2 rounded-md flex items-center gap-2 text-gray-500 transition duration-600 hover:bg-gray-200 hover:text-gray-700"
            onClick={(e) => handleShareTooltip(e)}
          >
            <FaShareAlt color="#2b25b0" />
            Share
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
