const SUPABASE_URL = 
    "https://xqcfhpzilpkjqgthskh.supabase.co";

const SUPABASE_ANON_KEY = 
    "supabase_anon_key_N07LrmX12l8ARqQzBCLIow_d2Ght8rO";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
