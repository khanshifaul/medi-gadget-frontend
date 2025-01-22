import BlogPostTable from "@/components/protected/admin/blogpost-table";
import PageTitle from "@/components/protected/admin/page-title";
import RefreshBtn from "@/components/protected/admin/refresh-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BlogPosts = async () => {
  return (
    <div>
      <PageTitle title="Products">
        <div className="flex gap-2">
          <RefreshBtn />
          <Button size={"sm"}>
            <Link href={"/admin/blog-posts/new"}>Add New BlogPost</Link>
          </Button>
        </div>
      </PageTitle>
      <BlogPostTable />
    </div>
  );
};

export default BlogPosts;
