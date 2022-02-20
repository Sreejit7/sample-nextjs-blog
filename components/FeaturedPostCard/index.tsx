import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../models/Post";

type Props = {
  post: Post;
};
const FeaturedPostCard = ({ post }: Props) => {
  return (
    <article className="relative h-72">
      <div
        className="absolute rounded-lg h-72 w-full bg-cover bg-no-repeat bg-center shadow-md inline-block"
        style={{ backgroundImage: `url(${`${post.featuredImage.url}`})` }}
      />
      <div className="absolute rounded-lg h-72 w-full bg-center bg-gradient-to-b opacity-50 from-gray-500 via-gray-700 to-black" />
      <div className="absolute rounded-lg h-72 w-full backdrop-blur-sm" />
      <Link href={`/post/${post.slug}`} passHref>
        <article className="flex flex-col absolute w-full h-full rounded-lg items-center justify-center text-white px-4 text-center cursor-pointer">
          <span className="font-semibold text-xs text-shadow mb-2">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
          <h2 className="font-bold text-2xl text-shadow">{post.title}</h2>
          <footer className="flex items-center absolute bottom-5 justify-center gap-3 w-full">
            <Image
              unoptimized
              src={post.author.image.url}
              alt={post.author.name}
              height={30}
              width={30}
              className="rounded-full shadow-lg"
            />
            <span className="font-medium text-shadow">{post.author.name}</span>
          </footer>
        </article>
      </Link>
    </article>
  );
};

export default FeaturedPostCard;
