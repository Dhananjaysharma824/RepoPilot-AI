import { createClient as createBrowserSupabaseClient } from "./supabase/client";

/**
 * Returns a Supabase browser client instance.
 * For server components and actions, import `createClient` from `@/lib/supabase/server`.
 */
export const supabase = createBrowserSupabaseClient();

export { createBrowserSupabaseClient };
