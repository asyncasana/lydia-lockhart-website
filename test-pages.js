const { createClient } = require("@sanity/client");

const sanityClient = createClient({
  projectId: "rb1epwnp",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

async function testPageSystem() {
  try {
    console.log("🔍 Testing dynamic page system...\n");

    // Test getFooterPages function
    const footerPages = await sanityClient.fetch(`
      *[_type == "page" && isPublished == true && showInFooter == true] | order(footerOrder asc) {
        _id,
        title,
        slug,
        footerOrder
      }
    `);

    console.log("📄 Footer Pages:", footerPages.length);
    footerPages.forEach((page, index) => {
      console.log(
        `  ${index + 1}. ${page.title} -> /${page.slug.current} (order: ${
          page.footerOrder || 0
        })`
      );
    });

    // Test getPage function for one page if exists
    if (footerPages.length > 0) {
      const firstPage = footerPages[0];
      const pageData = await sanityClient.fetch(
        `
        *[_type == "page" && slug.current == $slug && isPublished == true][0] {
          _id,
          title,
          slug,
          content,
          metaDescription,
          isPublished,
          showInFooter,
          footerOrder
        }
      `,
        { slug: firstPage.slug.current }
      );

      console.log(`\n📋 Page Details for "${firstPage.title}":`);
      console.log(`  - Title: ${pageData?.title}`);
      console.log(`  - Slug: ${pageData?.slug?.current}`);
      console.log(
        `  - Has content: ${pageData?.content?.length > 0 ? "Yes" : "No"}`
      );
      console.log(
        `  - Meta description: ${pageData?.metaDescription || "None"}`
      );
      console.log(`  - Show in footer: ${pageData?.showInFooter}`);
    }

    // Check all published pages
    const allPages = await sanityClient.fetch(`
      *[_type == "page" && isPublished == true] {
        _id,
        title,
        slug,
        showInFooter,
        footerOrder
      }
    `);

    console.log(`\n📚 All Published Pages: ${allPages.length}`);
    allPages.forEach((page, index) => {
      console.log(
        `  ${index + 1}. ${page.title} -> /${page.slug.current}${
          page.showInFooter ? " (in footer)" : ""
        }`
      );
    });

    if (allPages.length === 0) {
      console.log("\n⚠️  No pages found! To test the system:");
      console.log(
        "   1. Go to Sanity Studio: https://lydia-lockhart-website.sanity.studio"
      );
      console.log('   2. Create a new "Static Pages" document');
      console.log(
        '   3. Add title, slug, content, and set "Published" to true'
      );
      console.log(
        '   4. Optionally set "Show in Footer" to true for footer links'
      );
    } else {
      console.log("\n✅ Pages system is working! You can now:");
      console.log(`   - Visit any page at: http://localhost:3000/{slug}`);
      console.log(
        '   - Footer links will show automatically for pages with "Show in Footer" enabled'
      );
      console.log(
        "   - Edit content in Sanity Studio and see changes instantly"
      );
    }
  } catch (error) {
    console.error("❌ Error testing page system:", error);
  }
}

testPageSystem();
