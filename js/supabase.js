const SUPABASE_URL =
    "https://xqcfhpzilpkjqgthskh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_N07LrmX12l8ARqQzBCLIow_d2Ght8rO";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
