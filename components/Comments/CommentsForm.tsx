import React, { FormEvent, useState } from "react";
import { submitComment } from "../../services";

type Props = {
  slug: string;
};

const CommentsForm = ({ slug }: Props) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCommentSubmission = () => {
    setError(false);

    if (!name || !email || !comment) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    // API for posting comment
    submitComment(commentObj)
      .then((res) => {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .finally(() => {
        setName("");
        setEmail("");
        setComment("");
      });
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-8 pb-12 mb-8">
      <h3 className="text-xl border-b font-semibold text-gray-700 pb-4 mb-6">
        Add a comment
      </h3>
      <form>
        <div className="grid grid-cols-1 gap-1 mb-4">
          <label className="mb-2 text-gray-600 font-medium" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="w-full rounded-lg bg-gray-100 p-4 outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
            name="comment"
            id="comment"
            placeholder="Wow, that was a great read!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-1 mb-4">
          <label className="mb-2 text-gray-600 font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded-lg bg-gray-100 px-4 py-2 outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
            placeholder="Tony Stark"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div className="grid grid-cols-1 gap-1 mb-4">
          <label className="mb-2 text-gray-600 font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-lg bg-gray-100 px-4 py-2 outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
            placeholder="iron.man@avengers.com"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        {error && (
          <span className="text-center text-red-700 text-xs py-2 mb-4">
            Please fill all the details!
          </span>
        )}
        <footer className="flex flex-col items-center justify-center pt-4">
          <button
            className="cursor-pointer transition duration-500 ease hover:bg-blue-600 hover:shadow-lg inline-block bg-blue-500 rounded-full text-white text-lg px-6 py-2 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={submitted}
            type="button"
            onClick={() => handleCommentSubmission()}
          >
            Post Comment
          </button>
          {submitted && (
            <span className="text-center text-green-700 float-right text-xs py-2 mt-2">
              Comment submitted for review!
            </span>
          )}
        </footer>
      </form>
    </section>
  );
};

export default CommentsForm;
