import Image from "next/image";
import React from "react";
import { Author } from "../../models/Post";

type Props = {
  author: Author;
};

const Author = ({ author }: Props) => {
  return (
    <article className="rounded-lg bg-black/20 p-12 text-center mt-20 mb-8 relative">
      <div className="absolute left-0 right-0 -top-12 mb-4">
        <Image
          src={author.image.url}
          alt={author.name}
          height={100}
          width={100}
          className="align-middle rounded-full"
        />
      </div>
      <section className="flex flex-col items-center mt-4">
        <h2 className="text-2xl font-bold text-white mb-4 align-middle">
          {author.name}
        </h2>
        <p className="text-white align-middle">{author.desc}</p>
      </section>
    </article>
  );
};

export default Author;
