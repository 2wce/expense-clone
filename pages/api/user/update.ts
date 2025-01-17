import { withUserAuth } from 'lib/auth'
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
  id: string
}

export default withUserAuth(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    if (req.method === 'PATCH') {
      const { currency, locale } = req.body

      try {
        await prisma.users.update({
          data: { currency, locale },
          where: { id: user.id }
        })
        res.status(200).json({ message: 'Updated' })
      } catch (error) {
        res
          .status(500)
          .json({ error, message: 'Failed to updated, please try again.' })
      }
    } else {
      res.setHeader('Allow', ['PATCH'])
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    }
  }
)
