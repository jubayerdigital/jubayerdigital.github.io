import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import yaml from 'js-yaml';

// The Astro `file()` loader expects a YAML/JSON file to contain either an
// array of entries or an object map of {id: entryData}. Our "singleton"
// section files (hero.yaml, about.yaml, etc.) are just one flat object with
// no id, so we wrap them with this parser: it parses the YAML and nests it
// under a fixed entry id, letting us call getEntry(collection, entryId).
function singleton(entryId: string) {
  return (text: string) => ({ [entryId]: yaml.load(text) });
}

// ---------------------------------------------------------------------------
// Singleton sections (one YAML file each) — edited as "single item" entries
// in Decap CMS. Each lives in src/content/home/ or src/content/site/.
// ---------------------------------------------------------------------------

const site = defineCollection({
  loader: file('src/content/site/settings.yaml', { parser: singleton('settings') }),
  schema: z.object({
    id: z.string().optional(),
    siteName: z.string(),
    tagline: z.string().optional(),
    navLinks: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ),
    socials: z.array(
      z.object({
        platform: z.string(),
        url: z.string(),
      })
    ),
    email: z.string().optional(),
    footerNote: z.string().optional(),
  }),
});

const hero = defineCollection({
  loader: file('src/content/home/hero.yaml', { parser: singleton('hero') }),
  schema: z.object({
    id: z.string().optional(),
    eyebrow: z.string().optional(),
    headline: z.string(),
    supportingLine: z.string(),
    buttonLabel: z.string(),
    buttonHref: z.string(),
    visualType: z.enum(['video', 'chart']).default('chart'),
    visualVideo: z.string().optional(),
    chartCaption: z.string().optional(),
  }),
});

const trustBar = defineCollection({
  loader: file('src/content/home/trust-bar.yaml', { parser: singleton('trust-bar') }),
  schema: z.object({
    id: z.string().optional(),
    label: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        icon: z.string().optional(),
      })
    ),
  }),
});

const problem = defineCollection({
  loader: file('src/content/home/problem.yaml', { parser: singleton('problem') }),
  schema: z.object({
    id: z.string().optional(),
    heading: z.string(),
    body: z.string(),
  }),
});

const process = defineCollection({
  loader: file('src/content/home/process.yaml', { parser: singleton('process') }),
  schema: z.object({
    id: z.string().optional(),
    heading: z.string(),
    subheading: z.string().optional(),
    steps: z.array(
      z.object({
        number: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
});

const about = defineCollection({
  loader: file('src/content/home/about.yaml', { parser: singleton('about') }),
  schema: z.object({
    id: z.string().optional(),
    heading: z.string(),
    body: z.string(),
    photo: z.string().optional(),
    signatureLine: z.string().optional(),
  }),
});

const trustBuilding = defineCollection({
  loader: file('src/content/home/trust-building.yaml', { parser: singleton('trust-building') }),
  schema: z.object({
    id: z.string().optional(),
    signals: z.array(z.string()),
    doubtLine: z.string(),
  }),
});

const finalCta = defineCollection({
  loader: file('src/content/home/final-cta.yaml', { parser: singleton('final-cta') }),
  schema: z.object({
    id: z.string().optional(),
    headline: z.string(),
    reminderLine: z.string(),
    buttonLabel: z.string(),
    buttonHref: z.string(),
    trustLine: z.string().optional(),
  }),
});

// ---------------------------------------------------------------------------
// Repeatable collections — folders of markdown/YAML files, edited as
// "collections" (add/remove entries) in Decap CMS.
// ---------------------------------------------------------------------------

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/case-studies' }),
  schema: z.object({
    order: z.number().default(0),
    client: z.string(),
    problem: z.string(),
    approach: z.string(),
    result: z.string(),
    statNumber: z.string(),
    statLabel: z.string(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: 'src/content/services' }),
  schema: z.object({
    order: z.number().default(0),
    title: z.string(),
    outcome: z.string(),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: 'src/content/faqs' }),
  schema: z.object({
    order: z.number().default(0),
    question: z.string(),
    answer: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/testimonials' }),
  schema: z.object({
    order: z.number().default(0),
    quote: z.string().default(''),
    name: z.string().optional(),
    role: z.string().optional(),
    photo: z.string().optional(),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = {
  site,
  hero,
  'trust-bar': trustBar,
  problem,
  process,
  about,
  'trust-building': trustBuilding,
  'final-cta': finalCta,
  'case-studies': caseStudies,
  services,
  faqs,
  testimonials,
};
