const SUPABASE_URL = "https://tavlmlqmucolsdefkvtl.supabase.co";
const SUPABASE_KEY = "sb_publishable_NEbHOg9yXKT9eV-Unspsjg_n-8EIoDS";

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
    `${SUPABASE_URL}/rest/v1/episodes?show_id=eq.${showId}&order=number.asc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );
  return res.json();
}
