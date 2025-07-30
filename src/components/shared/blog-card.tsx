import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Image from "next/image";

interface Blog {
  _id: string;
  blogTitle: string;
  blogDescription: string;
  imageLink: string;
  createdAt: string;
}

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const truncateDescription = (text: string, maxLength = 120) => {
    if (!text) return ""; // Handle cases where text is null or undefined

    // First, remove HTML tags
    const cleanText = text.replace(/<[^>]*>?/gm, "");

    // Then, check the length and truncate
    if (cleanText.length <= maxLength) {
      return cleanText;
    }
    return cleanText.substring(0, maxLength) + "...";
  };
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={blog?.imageLink}
          alt={blog?.blogTitle}
          width={1000}
          height={1000}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(blog?.createdAt)}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {blog?.blogTitle}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {truncateDescription(blog?.blogDescription)}
        </p>

        <Link href={`/blogs/${blog?._id}`}>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-400 hover:text-white transition-colors duration-200"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
