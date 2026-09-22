// ========================================
// Code With Me - Supabase Configuration
// ========================================

const SUPABASE_URL =
    "https://voecwxorcxothdfhaged.supabase.co/";

const SUPABASE_ANON_KEY =
    "sb_publishable_zCzBS1o-NxP6KyZ7JCT53g_1qRd5reQ";


let supabaseClient = null;


if (
    SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
) {

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );

}
