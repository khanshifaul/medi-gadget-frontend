"use client";

import { UPDATE_BLOGPOST } from "@/app/api/graphql/mutation";
import { IBlogPost } from "@/types";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
interface EditBlogPostFormProps {
  blogPost: IBlogPost;
}

const EditBlogPostForm = ({ blogPost }: EditBlogPostFormProps) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  const [updateBlogPost, { loading, error }] = useMutation(UPDATE_BLOGPOST);

  useEffect(() => {
    if (blogPost) {
      setTitle(blogPost.title);
      setMarkdownContent(blogPost.content);
      setThumbnail(blogPost.thumbnail);
    }
  }, [blogPost]);

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
      await updateBlogPost({
        variables: {
          updateBlogPostId: blogPost.id,
          title,
          content: markdownContent,
          thumbnail,
        },
      });
      toast.success("Blog post updated successfully!");
    } catch (err) {
      console.error("Error updating blog post:", err);
    }
  };

  return (
    <div className="w-full mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row justify-between gap-4"
      >
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Title</h2>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 light:bg-white dark:bg-gray-800"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter the title of your blog post"
          />
          <h2 className="text-xl font-semibold mb-2">Thumbnail URL</h2>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 light:bg-white dark:bg-gray-800"
            value={thumbnail}
            onChange={handleThumbnailChange}
            placeholder="Enter the thumbnail URL"
          />
          <h2 className="text-xl font-semibold mb-2">Edit in Markdown</h2>
          <textarea
            className="w-full min-h-[50vh] max-h-[70vh] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 light:bg-white dark:bg-gray-800"
            value={markdownContent}
            onChange={handleInputChange}
            placeholder="Edit your blog post in markdown..."
          />
          <div className="col-span-full">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
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

export default EditBlogPostForm;
