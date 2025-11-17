# Lydia Lockhart Lifecoaching Website

Modern, accessible, and fully CMS-driven website for Lydia Lockhart Lifecoaching.

**Tech Stack:**

- [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- [Sanity Studio](https://www.sanity.io/) (Headless CMS)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)
- [Swiper.js](https://swiperjs.com/) (carousels, manual swipe only)
- [Vercel](https://vercel.com/) (hosting & CI/CD)

---

---

## ✨ Features

- Fully editable via Sanity Studio (no code required for content updates)
- Responsive, mobile-first design
- Accessible navigation and semantic HTML
- Blog, FAQ, and resource sections
- Contact form with email delivery (Resend API)
- Manual-only carousels (no auto-swiping)
- SEO and social sharing optimized
- Modern, recruiter-friendly codebase

---

## 🚀 Content Management (Sanity Studio)

All website content is managed via Sanity Studio:

- **Admin Panel:** https://lydialockhart.sanity.studio/
- **Login:** Use your Google account or the method provided.

### Content Structure

- **Settings:** Site-wide info (contact, social links, SEO, etc.)
- **Navigation:** Main menu links (fully CMS-driven)
- **Homepage Sections:** Hero, About, Services, Testimonials, Resources
- **Blog:** Blog posts (rich text, images, SEO fields)
- **FAQ:** Frequently asked questions
- **Legal Pages:** Terms, Privacy Policy, etc.

### Editing Content

1. Click a section in the left sidebar.
2. Click an item to edit, or “Create new” to add.
3. Make changes in the editor fields.
4. Click “Publish” (top right) to make changes live.

#### Legal Pages

- Go to “Legal Pages”
- Edit or create a page (e.g., Terms and Conditions)
- Fill in title, content, meta description
- Set “Published” to true
- Toggle “Show in Footer” if you want it in the website footer
- Click “Publish”

#### Homepage Sections

- Edit Hero, About, Services, Testimonials, Resources as above
- Changes appear instantly after publishing (no redeploy needed)

#### Blog & FAQ

- Blog: Add/edit posts, set publish status
- FAQ: Add/edit questions and answers

#### Previewing Changes

- After publishing, refresh the live site to see updates

#### Support

- For technical issues, contact your web developer

---

## 🗂️ Project Structure

```
src/
	app/         # Next.js app directory (routing, pages)
	components/  # Reusable React components
	lib/         # Sanity client, helpers
studio-lydia-lockhart-/ # Sanity Studio (CMS config)
public/        # Static assets (empty, all images managed by Sanity)
```

---

## 🛠️ Local Development

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🌐 Deployment & Environment Variables

This site is deployed on [Vercel](https://vercel.com/).

### Required Environment Variables (set in Vercel dashboard):

- `RESEND_API_KEY` — for contact form email delivery
- `CONTACT_EMAIL` — (optional) recipient for contact form

Add these in Vercel → Project → Settings → Environment Variables.

---

## 🤝 Contributing & Testing

This project is production-ready and follows best practices for accessibility, performance, and maintainability. To contribute or run tests:

- Fork and clone the repo
- `npm install`
- `npm run lint` (check code style)
- `npm run build` (type-check and build)
- `npm run dev` (start local dev server)

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

---

## 📝 Notable Customizations

- **Carousels:** All carousels (testimonials, resources, about, services) are now manual-only. Auto-swiping is disabled for improved accessibility and user control.
- **No local images:** All images and assets are managed via Sanity CMS for a fully headless workflow.

---
