import { request, gql } from "graphql-request";
import { Category } from "../models/Post";

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const fetchPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
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
        last: 3
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
        last: 3
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
