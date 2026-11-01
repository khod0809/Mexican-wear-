import { beforeEach, describe, expect, it, vi } from "vitest";
const { upsert } = vi.hoisted(() => ({ upsert: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: vi.fn(() => ({ upsert })) } }));
import { defaultSettings, defaultText, saveSiteSettings } from "@/lib/site-settings";
import { whatsappLink } from "@/lib/whatsapp-order";

describe("Saving interface settings", () => {
  beforeEach(() => upsert.mockReset());
  it("persists the complete interface to the single main document", async () => {
    upsert.mockResolvedValue({ error: null });
    const settings = { ...defaultSettings, hidden: { story: true }, font: "modern" as const };
    await saveSiteSettings(settings);
    expect(upsert).toHaveBeenCalledWith(expect.objectContaining({ id: "main", settings }));
  });
  it("does not report success when the owner permission check rejects a save", async () => {
    const denied = new Error("permission denied");
    upsert.mockResolvedValue({ error: denied });
    await expect(saveSiteSettings(defaultSettings)).rejects.toThrow("permission denied");
  });
});

describe("WhatsApp checkout and social slots", () => {
  it("sends the completed cart to the business WhatsApp number, not website payment", () => {
    const link = whatsappLink(defaultText.whatsappOrderNumber, [{ name: "Cream hoodie", price: "R 699", qty: 2 }], defaultText.orderMessageIntro);
    expect(link).toMatch(/^https:\/\/wa\.me\/27663012248\?text=/);
    expect(decodeURIComponent(link)).toContain("2× Cream hoodie (R 699)");
  });
  it("leaves the Facebook, Instagram and WhatsApp channel slots empty until the owner fills them", () => {
    expect(defaultText["socialFacebook"]).toBe("");
    expect(defaultText["socialInstagram"]).toBe("");
    expect(defaultText["socialWhatsapp"]).toBe("");
  });
});