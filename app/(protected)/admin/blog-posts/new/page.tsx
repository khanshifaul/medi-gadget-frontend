import NewBlogPostForm from "@/components/protected/admin/create-blogpost-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New BlogPost",
};
const NewBlogPost = () => {
  return (
    <div>
      <NewBlogPostForm />
    </div>
  );
};

export default NewBlogPost;
