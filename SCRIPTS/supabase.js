// ============================================
// SUPABASE CONFIGURATION
// ============================================

const SUPABASE_URL = "https://rmquwxpwisgqopodxcnx.supabase.co";

const SUPABASE_KEY = "sb_publishable_PmvhXTpRnCMvt3n3v6bmVg_4SM7dq5D";


// ============================================
// SUPABASE CLIENT
// ============================================

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);