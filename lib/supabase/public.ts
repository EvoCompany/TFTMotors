import { createServerClient } from "@supabase/ssr";

// Creates an SSR-compatible Supabase client without reading cookies from Next.js.
// Safe to use inside unstable_cache — does NOT opt pages into dynamic rendering.
export function getPublicSupabase() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );
}
