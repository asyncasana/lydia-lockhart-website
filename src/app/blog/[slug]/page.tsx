import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import {
  getBlogPost,
  getNavigationData,
  getFooterData,
  getFooterPages,
  PortableText,
} from "@/lib/sanity";
import { portableTextComponents } from "@/components/PortableTextComponents";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Lydia Lockhart",
    };
  }

  return {
    title: `${post.title} | Lydia Lockhart Blog`,
    description:
      post.excerpt || `Read "${post.title}" on the Lydia Lockhart blog`,
    openGraph: {
      title: post.title,
      description:
        post.excerpt || `Read "${post.title}" on the Lydia Lockhart blog`,
      images: post.featuredImage ? [post.featuredImage.asset.url] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch data from Sanity
  const [post, navigationData, footerData, footerPages] = await Promise.all([
    getBlogPost(slug),
    getNavigationData(),
    getFooterData(),
    getFooterPages(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header navigationData={navigationData || undefined} />
      <main className="min-h-screen bg-white">
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-blue-gray">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blog" className="hover:text-blue-gray">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900">{post.title}</li>
              </ol>
            </nav>

            {/* Post Header */}
            <header className="mb-12">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                {post.title}
              </h1>

              {post.featuredImage && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-8">
                  <Image
                    src={post.featuredImage.asset.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              {post.content && post.content.length > 0 ? (
                <PortableText
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={post.content as any}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  components={portableTextComponents as any}
                />
              ) : (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                  <p className="text-blue-800">
                    <strong>Note:</strong> This blog post doesn&apos;t have
                    content yet. Add content to this post in your Sanity Studio
                    to see it rendered here.
                  </p>
                </div>
              )}
            </div>

            {/* Back to Blog */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-gray font-semibold hover:text-powder-blue transition-colors"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer
        footerData={footerData || undefined}
        footerPages={footerPages || undefined}
      />
    </>
  );
}
