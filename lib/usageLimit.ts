export const incrementUsageLimit = (method: string) => {
  if (method === 'POST') fetch('/api/user/usage', { method: 'POST' })
}
