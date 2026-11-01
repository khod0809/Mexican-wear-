import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  tag: string;
  category: string;
  image_url: string;
  sort_order: number;
};

export const CATEGORIES = ["tops", "bottoms", "accessories", "formal"] as const;

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("id,name,price,subtitle,tag,category,image_url,sort_order")
      .order("sort_order")
      .order("created_at");
    if (error) throw error;
    return data ?? [];
  },
});
