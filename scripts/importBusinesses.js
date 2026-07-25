import 'dotenv/config'
import fetch from "node-fetch"
import { createClient } from "@supabase/supabase-js"
import * as cheerio from "cheerio"

// ENV
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Categories to scrape
const CATEGORIES = [
  { slug: "plumbers", category: "plumber" },
  { slug: "electricians", category: "electrician" },
  { slug: "roofing-contractors", category: "roofer" },
  { slug: "locksmiths", category: "locksmith" }
]

// Build YellowPages URL for Ottawa
function ypUrl(categorySlug, page = 1) {
  return `https://www.yellowpages.ca/search/si/${page}/${categorySlug}/Ottawa+ON`
}

// Slug generator
function makeSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Scrape one YellowPages page
async function scrapeYellowPages(url, category) {
  console.log(`📥 Fetching: ${url}`)

  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)

  const results = []

  $(".listing").each((i, el) => {
    const name = $(el).find(".listing__name--link").text().trim()
    if (!name) return

    const phone = $(el).find(".mlr__item--phone .mlr__item--text").text().trim() || null
    const address = $(el).find(".listing__address--full").text().trim() || null
    const website = $(el).find(".mlr__item--website a").attr("href") || null

    const business = {
      name,
      slug: makeSlug(name),
      category,
      neighborhood: "Ottawa",

      website_url: website,
      phone,
      telephone: phone,
      address,

      lat: null,
      lng: null,
      location_geojson: null,

      hours_json: null,
      status: "published",
      active: true,
      operating_status: "active",

      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),

      seo_title: name,
      seo_description: `${name} in Ottawa`,
      seo_keywords: [category, "Ottawa"],

      card_theme: "dark",
      card_accent_color: "#4f8cff",
      card_show_address: true,
      card_show_services: true,

      views_total: 0,
      views_30d: 0,
      clicks_phone: 0,
      clicks_website: 0,
      clicks_map: 0,

      auto_promote: false,
      last_posted_at: null,
      post_frequency_weight: 1,
      bsky_handle: null
    }

    results.push(business)
  })

  return results
}

// Save business to Supabase
async function saveBusiness(biz) {
  const { error } = await supabase
    .from("businesses")
    .upsert(biz, { onConflict: "slug" })

  if (error) {
    console.error("❌ Supabase error:", error)
  } else {
    console.log(`✅ Saved: ${biz.name}`)
  }
}

// Main importer
async function importBusinesses() {
  console.log("🚀 Starting Ottawa YellowPages import…\n")

  for (const { slug, category } of CATEGORIES) {
    console.log(`🔍 Importing: ${category}\n`)

    // Scrape first 5 pages (YP usually has 3–5 pages per category)
    for (let page = 1; page <= 5; page++) {
      const url = ypUrl(slug, page)
      const businesses = await scrapeYellowPages(url, category)

      if (businesses.length === 0) {
        console.log(`⚠️ No more results on page ${page}`)
        break
      }

      console.log(`📄 Page ${page}: Found ${businesses.length} businesses`)

      for (const biz of businesses) {
        await saveBusiness(biz)
      }
    }
  }

  console.log("✅ Import complete!")
}

importBusinesses()
