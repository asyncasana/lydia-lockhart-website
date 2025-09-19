# Lydia Lockhart Website

This project is a modern website for Lydia Lockhart, built with [Next.js](https://nextjs.org) and powered by [Sanity Studio](https://www.sanity.io/) for content management.

---

## 🚀 Content Management (Sanity Studio)

All website content is managed via Sanity Studio:

- **Admin Panel:** https://lydialockhart.sanity.studio/
- **Login:** Use your Google account or the method provided.

### Content Structure

- **Settings:** Site-wide info (contact, social links, etc.)
- **Navigation:** Main menu links
- **Homepage Sections:** Hero, About, Services, Testimonials, Resources
- **Blog:** Blog posts
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

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

---
