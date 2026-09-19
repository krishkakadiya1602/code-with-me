const SUPABASE_URL =
    "https://xqcfhpzilpkjqgthskh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "YOUR_SB_PUBLISHABLE_KEY";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
