"use client";

import { DELETE_BLOGPOST } from "@/app/api/graphql/mutation";
import { GET_BLOGPOSTS } from "@/app/api/graphql/queries";
import DeleteDialog from "@/components/protected/admin/delete-dialog";
import EditDialog from "@/components/protected/admin/edit-dialog";
import { IBlogPost } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const BlogPostTable = () => {
  const { data, loading, error, refetch } = useQuery(GET_BLOGPOSTS);
  const [deleteBlogPost] = useMutation(DELETE_BLOGPOST);

  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);

  // Update blogPosts state when data is fetched
  if (data && data.blogPosts && blogPosts.length === 0) {
    setBlogPosts(data.blogPosts);
  }

  const handleEdit = (id: string) => {
    console.log(`Editing blog post with id: ${id}`);
    // Implement the logic to edit the blog post with the given id
  };

  const handleDelete = async (id: string) => {
    console.log(`Deleting blog post with id: ${id}`);
    try {
      await deleteBlogPost({ variables: { id } });
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const prefetchAction = () => {
    console.log("Prefetching data...");
    refetch();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full mx-auto">
      {blogPosts.length === 0 ? (
        <p className="p-4 text-center">No blog posts found.</p>
      ) : (
        <table className="my-4 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="border-b dark:border-gray-600 text-gray-900 dark:text-gray-100">
              <th className="p-2">Sl.</th>
              <th className="p-2">Title</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post, index) => (
              <tr
                key={post.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-600 text-gray-900 dark:text-gray-100"
              >
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2">{post.title}</td>
                <td className="p-2 text-center">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 text-center">
                  <EditDialog
                    Id={post.id}
                    item="Blog Post"
                    onEdit={handleEdit}
                    prefetchAction={prefetchAction}
                    EditForm={<div>Edit Form</div>}
                  />
                </td>
                <td className="p-2 text-center">
                  <DeleteDialog
                    Id={post.id}
                    item="Blog Post"
                    onDelete={handleDelete}
                    prefetchAction={prefetchAction}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BlogPostTable;
