import { createClient } from '@supabase/supabase-js'
import { sentFromEmailId } from 'constants/index'
import SignInEmail from 'emails/SignInEmail'
import resend from 'lib/email'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUrl } from 'utils/url'

const supbaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body

    try {
      const { data, error } = await supbaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: { redirectTo: getUrl() }
      })

      if (error) {
        throw error
      }

      const { properties } = data
      const { action_link } = properties

      await resend.sendEmail({
        from: sentFromEmailId,
        subject: 'Sign in link for Expense.fyi',
        to: email,
        react: <SignInEmail magicLink={action_link} />
      })
      res.status(200).json({
        message: 'We just sent an email with magic link, check your inbox.'
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: String(error) || 'Error occurred, please try again.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
}
