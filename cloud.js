window.DropiCloud = {
  async load() {
    const cfg = window.DROPI_CONFIG || {};
    if (!cfg.supabaseUrl || !cfg.supabasePublishableKey) return null;
    const url = new URL('/rest/v1/dropi_demo_content', cfg.supabaseUrl);
    url.searchParams.set('id', 'eq.public-demo');
    url.searchParams.set('select', 'content');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch(url, {
        headers: { apikey: cfg.supabasePublishableKey },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Demo content unavailable');
      const data = await response.json();
      const rows = data?.[0]?.content?.teams;
      if (!Array.isArray(rows) || !rows.length || rows.length > 30) return null;
      return rows.map(row => {
        if (!Array.isArray(row) || row.length !== 5) throw new Error('Invalid demo content');
        const [name, initials, percent, progress, color] = row;
        if (typeof name !== 'string' || !/^[\p{L}\p{N} .'-]{1,60}$/u.test(name) ||
          !/^[A-Z]{1,3}$/.test(initials) || !Number.isFinite(percent) || percent < 0 || percent > 100 ||
          !/^\d{1,3} \/ \d{1,3}$/.test(progress) || !['', 'green', 'purple', 'blue'].includes(color)) {
          throw new Error('Invalid demo row');
        }
        return row;
      });
    } catch {
      return null; // The presentation demo remains usable without a cloud connection.
    } finally { clearTimeout(timer); }
  }
};
