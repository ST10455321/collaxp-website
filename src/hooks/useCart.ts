import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { addToCart, listCartItems } from "@/integrations/firebase/data";

export type CartRow = {
  id: string;
  quantity: number;
  event_id: string;
  event: {
    id: string;
    title: string;
    price: number;
    event_date: string;
    start_time: string;
    location: string;
    category: string;
    poster_url: string | null;
    xp_reward: number;
  } | null;
};

export function useCartItems() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["cart", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => (await listCartItems(user!.id)) as unknown as CartRow[],
  });
}

export function useCartCount() {
  const { data = [] } = useCartItems();
  return data.reduce((sum, row) => sum + row.quantity, 0);
}

export function useAddToCart() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, quantity }: { eventId: string; quantity: number }) =>
      addToCart(user!.id, eventId, quantity),
    onSuccess: () => {
      toast.success("Added to cart", { description: "Open your cart to check out." });
      void queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
