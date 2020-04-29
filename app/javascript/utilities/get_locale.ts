export const getLocale = (): string | null =>
  new URLSearchParams(window.location.search).get('locale') || null;
