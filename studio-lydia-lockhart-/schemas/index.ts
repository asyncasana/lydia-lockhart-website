// Site structure and navigation
import {settings} from './settings'
import {navigation} from './navigation'

// Homepage content sections
import {hero} from './hero'
import {about} from './about'
import {service} from './service'
import {testimonial} from './testimonial'
import {resource} from './resource'

// Additional pages
import {blog} from './blog'
import {faq} from './faq'
import {page} from './page'

export const schemaTypes = [
  // Site settings (most important, should be first)
  settings,
  navigation,

  // Homepage content (in order they appear)
  hero,
  about,
  service,
  testimonial,
  resource,

  // Additional content
  blog,
  faq,
  page, // Legal pages (Terms, Privacy, etc.)
]
