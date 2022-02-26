import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FeaturedPostCard from "../../components/FeaturedPostCard";
import { Post } from "../../models/Post";
import { fetchFeaturedPosts } from "../../services";

const FeaturedPostsCarousel = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchFeaturedPosts().then((posts) => {
      const ftPosts = posts.map((post: { node: Post }) => post.node);
      setFeaturedPosts(ftPosts);
    });
  }, [featuredPosts]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1368 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1368, min: 1024 },
      items: 4,
    },
    laptop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={5000}
      keyBoardControl={true}
      containerClass="mb-8"
      itemClass="px-4"
    >
      {featuredPosts.map((post) => (
        <FeaturedPostCard key={post.slug} post={post} />
      ))}
    </Carousel>
  );
};

export default FeaturedPostsCarousel;
