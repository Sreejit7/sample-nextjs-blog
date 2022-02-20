import { request, gql } from "graphql-request";
import { Comment } from "../models/Post";

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const fetchPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          node {
            author {
              name
              image {
                url
              }
              desc
            }
            categories {
              name
              slug
            }
            excerpt
            title
            slug
            createdAt
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  if (graphqlUrl) {
    const result = await request(graphqlUrl, query);
    return result.postsConnection.edges;
  }
};

export const fetchCategories = async () => {
  const query = gql`
    query MyQuery {
      categoriesConnection {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `;

  if (graphqlUrl) {
    const result = await request(graphqlUrl, query);
    return result.categoriesConnection.edges;
  }
};

export const fetchRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_DESC,
        first: 3
      ){
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  if (graphqlUrl) {
    const result = await request(graphqlUrl, query);
    return result.posts;
  }
};

export const fetchRelatedPosts = async (slug: string, categories: string[]) => {
  const query = gql`
    query GetSimilarPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        orderBy: createdAt_DESC
        first: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  if (graphqlUrl) {
    const result = await request(graphqlUrl, query, { slug, categories });
    return result.posts;
  }
};

export const fetchPostDetails = async (slug?: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          desc
          image {
            url
          }
          name
        }
        categories {
          name
          slug
        }
        comments(orderBy: createdAt_DESC, first: 3) {
          name
          email
          comment
          createdAt
        }
        content {
          raw
        }
        createdAt
        featuredImage {
          url
        }
        slug
        title
      }
    }
  `;

  if (graphqlUrl) {
    const result = await request(graphqlUrl, query, { slug });
    return result.post;
  }
};

export const fetchPostPaths = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(first: 10) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `;

  if (graphqlUrl) {
    const result = await request(graphqlUrl, query);
    return result.postsConnection.edges;
  }
};

export const submitComment = async (commentObj: Comment) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(commentObj),
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  return result.json();
};

export const fetchAllComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }, orderBy: createdAt_DESC) {
        name
        createdAt
        comment
      }
    }
  `;

  if (graphqlUrl) {
    const result = await request(graphqlUrl, query, { slug });
    return result.comments;
  }
};

export const fetchFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts {
      postsConnection(
        where: { featuredPost: true }
        orderBy: createdAt_DESC
        first: 10
      ) {
        edges {
          node {
            author {
              image {
                url
              }
              name
            }
            featuredImage {
              url
            }
            createdAt
            title
            slug
          }
        }
      }
    }
  `;

  if (graphqlUrl) {
    const result = await request(graphqlUrl, query);
    return result.postsConnection.edges;
  }
};
