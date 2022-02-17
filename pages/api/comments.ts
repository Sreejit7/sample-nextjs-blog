// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function commentsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (graphqlUrl) {
    const graphQLClient = new GraphQLClient(graphqlUrl, {
      headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
      },
    });

    const query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            post: { connect: { slug: $slug } }
          }
        ) {
          id
        }
      }
    `;

    try {
      const result = await graphQLClient.request(query, req.body);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }
}
