import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
}

const BlogCard = ({ id, title, excerpt }: BlogCardProps) => {
  return (
    <div className="w-full border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{excerpt}</p>
      <Link href={`/blog/${id}`} className="text-blue-500 hover:underline">
        Read more
      </Link>
    </div>
  );
};

export default BlogCard;
