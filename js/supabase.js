// ========================================
// Code With Me - Supabase Configuration
// ========================================

const SUPABASE_URL =
    "https://voecwxorcxothdfhaged.supabase.co/";

const SUPABASE_ANON_KEY =
    "sb_publishable_zCzBS1o-NxP6KyZ7JCT53g_1qRd5reQ";

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );

}
