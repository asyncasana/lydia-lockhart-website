# Lydia Lockhart Website - Sanity CMS Integration

This document outlines the recent updates to integrate Sanity CMS for content management, including blog and FAQ functionality.

## 🎯 Features Added

### 1. Enhanced Hero Section

- **URL field for media management**: Added support for both video URLs and images in the hero section
- **Conditional media display**: Editors can choose between video or image backgrounds
- **Schema location**: `studio-lydia-lockhart-/schemas/hero.ts`

### 2. Blog System

- **Complete blog functionality**: Blog posts with rich text content, featured images, and categorization
- **Published/unpublished states**: Control which posts appear on the website
- **SEO-friendly URLs**: Automatic slug generation from titles
- **Schema location**: `studio-lydia-lockhart-/schemas/blog.ts`
- **Frontend pages**:
  - `/src/app/blog/page.tsx` - Blog listing page
  - `/src/app/blog/[slug]/page.tsx` - Individual blog post pages

### 3. FAQ System

- **Categorized FAQs**: Group questions by category (General, Services, Pricing, Process)
- **Rich text answers**: Support for formatted text, links, and basic styling
- **Show/hide functionality**: Control which FAQs are visible
- **Order management**: Custom ordering within categories
- **Schema location**: `studio-lydia-lockhart-/schemas/faq.ts`
- **Frontend page**: `/src/app/faq/page.tsx`

### 4. Navigation Management

- **Dynamic menu items**: Manage navigation links through Sanity
- **Conditional blog/FAQ links**: Show or hide blog and FAQ links in navigation
- **CTA button management**: Control header call-to-action button
- **Logo management**: Upload and manage site logo
- **Schema location**: `studio-lydia-lockhart-/schemas/navigation.ts`

### 5. Footer Management

- **Social media links**: Manage social platforms (Facebook, Twitter, Instagram, LinkedIn, YouTube, TikTok)
- **Additional footer links**: Add custom footer links
- **Copyright text**: Editable copyright information
- **Show/hide controls**: Control visibility of each element
- **Schema location**: Updated `studio-lydia-lockhart-/schemas/settings.ts`

## 📁 File Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post page
│   └── faq/
│       └── page.tsx              # FAQ page
├── components/
│   ├── Header.tsx                # Updated with Sanity integration
│   └── Footer.tsx                # Updated with Sanity integration
└── lib/
    └── sanity.ts                 # Helper functions and types for Sanity integration

studio-lydia-lockhart-/
├── schemas/
│   ├── blog.ts                   # Blog post schema
│   ├── faq.ts                    # FAQ schema
│   ├── hero.ts                   # Updated hero schema
│   ├── navigation.ts             # Navigation management schema
│   ├── settings.ts               # Updated with footer management
│   └── index.ts                  # Updated schema exports
```

## 🚀 How to Use

### Setting Up Sanity Connection

1. **Install required packages**:

   ```bash
   npm install @sanity/client @portabletext/react
   ```

2. **Configure Sanity client** in `src/lib/sanity.ts`:

   - Uncomment the client setup
   - Add your Sanity project ID and dataset
   - Uncomment the query functions

3. **Update components** to use Sanity data:
   - Replace placeholder data with actual Sanity queries
   - Use the provided helper functions

### Content Management in Sanity

#### Blog Posts

1. Create new blog posts in Sanity Studio
2. Set `isPublished` to true to make posts visible
3. Add featured images, content, and metadata
4. Posts automatically appear on `/blog`

#### FAQs

1. Create FAQ items in Sanity Studio
2. Categorize questions (General, Services, Pricing, Process)
3. Set `isActive` to true to display on website
4. Use `order` field to control sequence within categories

#### Navigation

1. Create/edit navigation document in Sanity Studio
2. Add menu items with labels and URLs
3. Toggle `showBlogLink` and `showFaqLink` to control page visibility
4. Configure CTA button text and URL

#### Hero Section

1. Edit hero document in Sanity Studio
2. Choose between video URL or background image
3. Update headlines and call-to-action

#### Footer

1. Edit settings document in Sanity Studio
2. Add social media links and control visibility
3. Add additional footer links as needed
4. Customize copyright text

## 🎨 Current State

The website currently displays placeholder content and default navigation. Once Sanity is properly connected:

- **Blog**: Will show actual blog posts from Sanity
- **FAQ**: Will display categorized questions and answers
- **Navigation**: Will use Sanity-managed menu items
- **Footer**: Will show configured social links and content
- **Hero**: Will support both video and image backgrounds

## 📝 Notes

- All new pages include proper SEO metadata
- Components are designed to gracefully fall back to defaults when Sanity data is unavailable
- Blog posts support rich text content through Portable Text
- FAQ system includes collapsible accordions for better UX
- Navigation system supports both internal and external links
- Social media icons are included for major platforms

## 🔄 Next Steps

1. Connect Sanity client with your project credentials
2. Create initial content in Sanity Studio:
   - Navigation settings
   - Hero content
   - Sample blog posts
   - FAQ items
   - Footer settings
3. Test the integration and adjust styling as needed
4. Add any additional content types or fields as required

This implementation provides a solid foundation for content management while maintaining the existing design and functionality of the website.
