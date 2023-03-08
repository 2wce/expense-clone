import enforceAuth from 'components/Auth/enforceAuth'
import Billing from 'components/Settings/Billing'
import General from 'components/Settings/General'
import Usage from 'components/Settings/Usage'
import SettingsLayout from 'components/SettingsLayout'
import { onDismiss, onSuccess, paymentEvents, Result } from 'lib/payments'
import Head from 'next/head'
import Script from 'next/script'

const eventHandler = async ({
  event,
  data
}: {
  event: string
  data: Result
}) => {
  if (event === paymentEvents.success) {
    // @ts-expect-error no way
    await onSuccess(data, window.LemonSqueezy?.Url?.Close)
  } else if (event === paymentEvents.closed) {
    onDismiss()
  } else {
    console.warn(`Unhandled event: ${event}`)
  }
}

type Props = {
  user: {
    currency: any
    email: string
    locale: undefined
    isBasicPlan: boolean
    isPremiumPlan: boolean
    isPremiumPlanEnded: boolean
  }
}
export default function Settings({ user }: Props) {
  const setupLemonSqueezy = () => {
    // @ts-expect-error ignore this
    window.createLemonSqueezy?.()
    // @ts-expect-error ignore this
    window.LemonSqueezy?.Setup?.({ eventHandler })
  }

  return (
    <>
      <Head>
        <title>Expense.fyi - Settings</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        async
        onLoad={setupLemonSqueezy}
      />

      <div className="h-ful mb-20">
        <h1 className="mb-4 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">
          Settings
        </h1>
        <SettingsLayout>
          <General user={user} />
          <Usage user={user} />
          <Billing user={user} />
        </SettingsLayout>
      </div>
    </>
  )
}

export const getServerSideProps = enforceAuth()
