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

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: () => {},
  },
});

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
  let getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement;

  let component: RenderResult;
  beforeEach(() => {
    component = render(<PostDetail post={mockPost} />);
    getByTestId = component.getByTestId;

    // Mocks Next.js route
    mockNextUseRouter({
      asPath: "/post/[slug]",
    });
  });

  it("should render proper post details", () => {
    expect(getByTestId("post-title")).toHaveTextContent("Test Post");
    expect(getByTestId("post-author-name")).toHaveTextContent("Sreejit De");
    expect(getByTestId("post-createdAt")).toHaveTextContent("Jan 17, 2022");
  });

  it("should have proper functionality for 'Copy Link' button", () => {
    jest.spyOn(navigator.clipboard, "writeText");
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    // Initially, the button displays 'Copy Link'
    expect(getByTestId("copy-link-text")).toHaveTextContent("Copy Link");

    fireEvent.click(getByTestId("copy-link-btn"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    // On click, the button should display 'Link Copied'
    expect(getByTestId("copy-link-text")).toHaveTextContent("Link Copied!");
  });
});
