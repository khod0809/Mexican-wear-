import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const TEXT_GROUPS = [
  { title: "Brand & navigation", fields: { brand: "MEXICAN", brandSmall: "W E A R", announcement: "A mindset, not just a label · Mexican Wear — Why Not Now", navShop: "Shop", navStory: "Our mindset", navCollections: "Collections", navLookbook: "Lookbook", navContact: "Contact" } },
  { title: "Opening section", fields: { heroEyebrow: "Quality · Style · Culture", heroTitle: "More than\nclothing.", heroEmphasis: "It's a mindset.", heroCopy: "For the ones building something bigger. Everyday essentials with a considered fit, understated details, and a reminder to keep moving.", heroButton: "Explore the collection", philosophyButton: "Our philosophy", stampTitle: "Why Not Now?", stampCopy: "Make the first move.", sideNote: "Built to last · Made to move", ticker: "Why not now?\nBelieve in your next move.\nMore than clothing. It's a mindset." } },
  { title: "Shop", fields: { shopEyebrow: "The essentials", shopTitle: "Find your uniform.", shopCopy: "Clean silhouettes, thoughtful details, and versatile pieces made to live in—not just look at." } },
  { title: "Our mindset", fields: { storyEyebrow: "The Mexican Wear mindset", storyTitle: "Big dreams.", storyEmphasis: "Small steps.", storyEnd: "No waiting.", storyCopy: "We believe style is more than what you put on. It is how you show up, what you stand for, and the work you do when nobody is watching. Start where you are. Keep showing up.", storyButton: "Explore our world" } },
  { title: "Collections", fields: { collectionEyebrow: "Different occasions. Same vision.", collectionTitle: "From off-duty\nto all eyes on you.", collectionCopy: "Streetwear essentials and a more considered formal line—one mindset, different ways to wear it.", collectionButton: "Discover the collection" } },
  { title: "Lookbook", fields: { lookbookEyebrow: "The visual language", lookbookTitle: "Details make the difference.", lookbookCopy: "From signature marks to thoughtful finishing touches, every element has a place.", galleryOne: "Soft neutrals", galleryTwo: "Everyday staples", galleryThree: "Finish your fit" } },
  { title: "Socials & contact", fields: { contactEyebrow: "Get in touch", contactTitle: "Say hello.", contactCopy: "Questions about an order, sizing or a collaboration? Message us on any channel below.", socialFacebook: "", socialInstagram: "", socialWhatsapp: "", contactEmail: "", contactPhone: "", contactLocation: "", whatsappOrderNumber: "+27663012248", orderMessageIntro: "Hi Mexican Wear! I'd like to order:" } },
  { title: "Quote, newsletter & footer", fields: { quoteEyebrow: "A reminder to yourself", quoteTitle: "The future belongs to those who", quoteEmphasis: "believe in it.", quoteCopy: "Dreams don't work unless you do. Believe in yourself, stay consistent, and make it happen.", newsletterTitle: "Stay in the loop.", newsletterCopy: "New drops, design stories, and a little reminder to keep going.", newsletterButton: "Join the list", footerCopyright: "© 2026 MEXICAN WEAR · WHY NOT NOW?", footerTagline: "QUALITY / STYLE / CULTURE" } },
] as const;

export const IMAGE_FIELDS = { logo: "Logo", hero: "Opening photo", formal: "Collections photo", cream: "Lookbook: first photo", black: "Lookbook: second photo", headwear: "Lookbook: third photo" };
export const SECTIONS = { ticker: "Moving message", story: "Our mindset", collections: "Collections", lookbook: "Lookbook", contact: "Contact & socials", quote: "Quote", newsletter: "Newsletter" };
export const FONT_OPTIONS = { classic: "Classic serif", modern: "Modern sans", editorial: "Editorial serif" };
export const FONT_FAMILIES = { classic: "Georgia, 'Times New Roman', serif", modern: "Arial, Helvetica, sans-serif", editorial: "'Palatino Linotype', Palatino, serif" };

export const siteSettingsSchema = z.object({
  text: z.record(z.string().max(3000)).default({}),
  images: z.record(z.string().refine((v) => v === "" || v.startsWith("/") || /^https:\/\//.test(v), "Use an uploaded photo")).default({}),
  hidden: z.record(z.boolean()).default({}),
  colors: z.object({ background: z.string().regex(/^#[\da-f]{6}$/i), ink: z.string().regex(/^#[\da-f]{6}$/i), accent: z.string().regex(/^#[\da-f]{6}$/i) }).default({ background: "#f4f0e7", ink: "#1b1c18", accent: "#4d5b42" }),
  font: z.enum(["classic", "modern", "editorial"]).default("classic"),
});
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export const defaultSettings = siteSettingsSchema.parse({});
export const defaultText: Record<string, string> = Object.assign({}, ...TEXT_GROUPS.map((group) => group.fields));
export const siteSettingsQuery = queryOptions({
  queryKey: ["site-settings"],
  queryFn: async () => {
    const { data, error } = await supabase.from("site_settings").select("settings").eq("id", "main").maybeSingle();
    if (error) throw error;
    const parsed = siteSettingsSchema.safeParse(data?.settings ?? {});
    return parsed.success ? parsed.data : defaultSettings;
  },
});
export async function saveSiteSettings(settings: SiteSettings) {
  const valid = siteSettingsSchema.parse(settings);
  const { error } = await supabase.from("site_settings").upsert({ id: "main", settings: valid, updated_at: new Date().toISOString() });
  if (error) throw error;
}