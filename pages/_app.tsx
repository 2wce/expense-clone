/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Tooltip from '@radix-ui/react-tooltip'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import '@tremor/react/dist/esm/tremor.css'
import { Analytics } from '@vercel/analytics/react'
import Layout from 'components/Layout'
import fetcher from 'lib/fetcher'
import Router from 'next/router'
// @ts-expect-error no types
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import 'styles/globals.css'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: any) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  const isAuthenticated =
    pageProps.initialSession && pageProps.initialSession.user

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <SWRConfig value={{ fetcher }}>
        {isAuthenticated ? (
          <Tooltip.Provider delayDuration={500}>
            <Layout user={pageProps.user}>
              <Component {...pageProps} />
            </Layout>
          </Tooltip.Provider>
        ) : (
          <Component {...pageProps} />
        )}
        <Toaster />
        <Analytics />
      </SWRConfig>
    </SessionContextProvider>
  )
}
