import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type ExtendedNextApiRequest = {
  body: {
    subject: string
    email: string
    message: string
  }
} & NextApiRequest

export default async function handle(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { subject, email, message } = req.body

    try {
      await prisma.contact.create({ data: { subject, email, message } })

      res.status(201).json({
        message: 'We have received your details. Thanks for contacting us.'
      })
    } catch (error) {
      res.status(400).json({ error, messgage: 'Failed, please try again.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
}
