"use client";

import { ADD_BLOGPOST } from "@/app/api/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const NewBlogPostForm = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  const [addBlogPost, { loading, error }] = useMutation(ADD_BLOGPOST);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setThumbnail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addBlogPost({
        variables: {
          title,
          content: markdownContent,
          thumbnail,
        },
      });
      // Optionally reset the form
      setTitle("");
      setMarkdownContent("");
      setThumbnail("");
    } catch (err) {
      console.error("Error adding blog post:", err);
    }
  };

  return (
    <div className="w-full mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">Create a Blog Post</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row justify-between gap-4"
      >
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Title</h2>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter the title of your blog post"
          />
          <h2 className="text-xl font-semibold mb-2">Thumbnail URL</h2>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={thumbnail}
            onChange={handleThumbnailChange}
            placeholder="Enter the thumbnail URL"
          />
          <h2 className="text-xl font-semibold mb-2">Write in Markdown</h2>
          <textarea
            className="w-full min-h-[50vh] max-h-[70vh] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={markdownContent}
            onChange={handleInputChange}
            placeholder="Write your blog post in markdown..."
          />
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            {error && (
              <p className="text-red-500 mt-2">Error: {error.message}</p>
            )}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div className="w-full max-h-[75vh] border p-2 rounded-md overflow-auto">
            <ReactMarkdown className="prose leading-relaxed w-full dark:prose-invert prose-headings:underline max-w-none">
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewBlogPostForm;
