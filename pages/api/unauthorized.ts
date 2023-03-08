import type { NextApiResponse, NextApiRequest } from 'next'

export default function handle(_req: NextApiRequest, res: NextApiResponse) {
  res.status(401).json({ message: 'Unauthorized request' })
}
