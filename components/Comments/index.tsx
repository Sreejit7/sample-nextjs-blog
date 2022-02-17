import React, { useState } from "react";
import parse from 'html-react-parser';
import { Comment } from "../../models/Post";

type Props = {
  comments: Comment[];
};

const Comments = ({ comments }: Props) => {
  const [allCommentsLoaded, setAllCommentsLoaded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 pb-12 mb-8">
      <h3 className="text-xl border-b font-semibold text-gray-700 pb-4 mb-6">
        Recent Comments
      </h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="mb-4">
            <p className="flex items-end mb-2 gap-1 text-md">
              <span className="text-gray-700 font-medium">{comment.name}</span>{" "}
              {comment.createdAt && (
                <p className="text-gray-400 font -light">
                  commented on{" "}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              )}
            </p>
            <p className="text-gray-600 text-sm w-full">{parse(comment.comment)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
