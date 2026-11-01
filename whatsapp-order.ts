export type CartItem = { name: string; price: string; qty: number };

export function orderMessage(items: CartItem[], intro: string): string {
  const lines = items.map((i) => `${i.qty}× ${i.name}${i.price ? ` (${i.price})` : ""}`);
  return [intro, ...lines].filter(Boolean).join("\n");
}

export function whatsappLink(number: string, items: CartItem[], intro: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(orderMessage(items, intro))}`;
}
