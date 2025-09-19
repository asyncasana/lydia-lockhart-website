// Force dynamic rendering for instant Sanity content updates
export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  getBlogPosts,
  getNavigationData,
  getFooterData,
  getFooterPages,
} from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blog | Lydia Lockhart",
  description:
    "Read the latest insights and tips from Lydia Lockhart on child development, family coaching, and helping little minds grow.",
};

export default async function BlogPage() {
  // Fetch data from Sanity
  const [posts, navigationData, footerData, footerPages] = await Promise.all([
    getBlogPosts(),
    getNavigationData(),
    getFooterData(),
    getFooterPages(),
  ]);

  return (
    <>
      <Header navigationData={navigationData || undefined} />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Insights and tips for helping little minds grow and thrive.
            </p>

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  No blog posts yet
                </h2>
                <p className="text-gray-600">
                  Check back soon for new content, or create your first blog
                  post in Sanity Studio.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:gap-12">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="border-b border-gray-200 pb-12 last:border-b-0"
                  >
                    <div className="grid md:grid-cols-3 gap-8">
                      {post.featuredImage && (
                        <div className="md:col-span-1">
                          <Link href={`/blog/${post.slug.current}`}>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg hover:opacity-90 transition-opacity">
                              <Image
                                src={post.featuredImage.asset.url}
                                alt={post.featuredImage.alt || post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                        </div>
                      )}
                      <div
                        className={
                          post.featuredImage ? "md:col-span-2" : "md:col-span-3"
                        }
                      >
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-GB",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          <Link
                            href={`/blog/${post.slug.current}`}
                            className="hover:text-blue-gray transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        {post.excerpt && (
                          <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {post.excerpt}
                          </p>
                        )}
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="inline-flex items-center text-blue-gray font-semibold hover:text-powder-blue transition-colors"
                        >
                          Read more
                          <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer
        footerData={footerData || undefined}
        footerPages={footerPages || undefined}
      />
    </>
  );
}
