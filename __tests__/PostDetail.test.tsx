import {
  Matcher,
  MatcherOptions,
  render,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { PostDetail } from "../components";
import { Post } from "../models/Post";
import { ModalContextProvider } from "../contexts/useModalContext";

// Mocks useRouter
const useRouter = jest.spyOn(require("next/router"), "useRouter");

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export function mockNextUseRouter(props: { asPath: string }) {
  useRouter.mockImplementationOnce(() => ({
    asPath: props.asPath,
  }));
}

const mockPost: Post = {
  author: {
    name: "Sreejit De",
    desc: "Software Engineer",
    image: { url: "/author.png" },
  },
  categories: [],
  comments: [],
  createdAt: "2022-01-17T18:21:01.130946+00:00",
  excerpt: "This is a test post excerpt",
  featuredImage: { url: "/featuredImage.png" },
  slug: "test-post",
  title: "Test Post",
};

describe("PostDetail", () => {
  // let getByTestId: (
  //   id: Matcher,
  //   options?: MatcherOptions | undefined
  // ) => HTMLElement;

  let component: RenderResult;
  beforeEach(() => {
    component = render(
      <ModalContextProvider>
        <PostDetail post={mockPost} />
      </ModalContextProvider>
    );

    // Mocks Next.js route
    mockNextUseRouter({
      asPath: "/post/[slug]",
    });
  });

  it("should render proper post details", () => {
    const { getByTestId } = component;

    expect(getByTestId("post-title")).toHaveTextContent("Test Post");
    expect(getByTestId("post-author-name")).toHaveTextContent("Sreejit De");
    expect(getByTestId("post-createdAt")).toHaveTextContent("Jan 17, 2022");
  });

});
