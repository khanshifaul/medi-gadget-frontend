"use client";
import { GET_BLOGPOST } from "@/app/api/graphql/queries";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const BlogDetailPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_BLOGPOST, {
    variables: { blogPostId: id },
    skip: typeof id !== "string",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const blog = data?.blogPost;

  if (!blog) {
    return <div>Blog post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{blog.title}</h1>
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        width={800}
        height={400}
        className="w-full h-auto mb-4 rounded-md"
      />
      <ReactMarkdown className="prose leading-relaxed w-full dark:prose-invert prose-headings:underline max-w-none">
        {blog.content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogDetailPage;
