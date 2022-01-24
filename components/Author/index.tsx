import React from "react";
import { Author } from "../../models/Post";

type Props = {
  author: Author
}

const Author = ({ author }: Props) => {
  return (
    <div>
      <h2>Author</h2>
    </div>
  );
};

export default Author;
