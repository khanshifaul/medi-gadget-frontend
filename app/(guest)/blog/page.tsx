"use client";
import { GET_BLOGPOSTS } from "@/app/api/graphql/queries";
import BlogCard from "@/components/common/blog/blog-card";
import PageBanner from "@/components/common/page-banner";
import { IBlogPost } from "@/types";
import { useQuery } from "@apollo/client";

const BlogPage = () => {
  // Use the useQuery hook to fetch blog posts
  const { data, loading, error } = useQuery(GET_BLOGPOSTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Extract blog posts from the data
  const blogs: IBlogPost[] = data?.blogPosts || [];

  // Function to create an excerpt from content
  const createExcerpt = (content: string, length: number = 100) => {
    return content.length > length
      ? content.substring(0, length) + "..."
      : content;
  };

  return (
    <div className="md:container mx-auto px-4">
      <PageBanner title="Blog" />
      <div className="flex flex-col gap-4 py-4">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            excerpt={createExcerpt(blog.content)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
