import { useRouter } from "next/router";
import React, { useState } from "react";

const hostName = process.env.HOST_NAME;

const CopyLinkButton = () => {
  const router = useRouter();
  const [linkCopied, setLinkCopied] = useState(false);

  const copyPostLink = () => {
    navigator.clipboard.writeText(`${hostName}${router.asPath}`);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  return (
    <button
      className={`transition duration-500 button px-3 py-2 rounded-sm text-left
                          shadow-md text-white hover:shadow-lg w-full
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
  );
};

export default CopyLinkButton;
