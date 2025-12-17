const SUPABASE_URL = "https://tavlmlqmucolsdefkvtl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhdmxtbHFtdWNvbHNkZWZrdnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MDM4MDUsImV4cCI6MjA4MTQ3OTgwNX0.ZJKBb-Evwdb4KnmpIxAkKE88vel-BmSSuu-BcVPuYOM";

async function getShows() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/shows?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  return res.json();
}

async function getEpisodes(showId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/episodes?show_id=eq.${showId}&order=number`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  return res.json();
}
