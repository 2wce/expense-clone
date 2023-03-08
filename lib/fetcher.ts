import { toastMessages } from 'components/Toast'

const fetcher = async (url: string) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error(toastMessages.error)
    // Attach extra info to the error object.
    const info = await res.json()
    const status = res.status
    Object.assign(error, info, status)
    throw error
  }

  return res.json()
}

export default fetcher
