"use client";

import { DELETE_BLOGPOST } from "@/app/api/graphql/mutation";
import { GET_BLOGPOSTS } from "@/app/api/graphql/queries";
import DeleteDialog from "@/components/protected/admin/delete-dialog";
import EditDialog from "@/components/protected/admin/edit-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBlogPost } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import EditBlogPostForm from "./edit-blogpost-form";

const BlogPostTable = () => {
  const { data, loading, error, refetch } = useQuery(GET_BLOGPOSTS);
  const [deleteBlogPost] = useMutation(DELETE_BLOGPOST);

  const [blogPosts, setBlogPosts] = useState<IBlogPost[]>([]);

  // Update blogPosts state when data is fetched
  if (data && data.blogPosts && blogPosts.length === 0) {
    setBlogPosts(data.blogPosts);
  }

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
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b dark:border-gray-600 text-gray-900 dark:text-gray-100">
              <TableHead className="p-2">Sl.</TableHead>
              <TableHead className="p-2">Title</TableHead>
              <TableHead className="p-2">Created At</TableHead>
              <TableHead className="p-2">Edit</TableHead>
              <TableHead className="p-2">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post, index) => (
              <TableRow
                key={post.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-600 text-gray-900 dark:text-gray-100"
              >
                <TableCell className="p-2 text-center">{index + 1}</TableCell>
                <TableCell className="p-2">{post.title}</TableCell>
                <TableCell className="p-2 text-center">
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="p-2 text-center">
                  <EditDialog>
                    <div>
                      <EditBlogPostForm blogPost={post} />
                    </div>
                  </EditDialog>
                </TableCell>
                <TableCell className="p-2 text-center">
                  <DeleteDialog
                    Id={post.id}
                    item="Blog Post"
                    onDelete={handleDelete}
                    prefetchAction={prefetchAction}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BlogPostTable;
