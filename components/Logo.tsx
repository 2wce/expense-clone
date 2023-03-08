import Image from 'next/image'

export default function Logo({ theme = 'dark', w = 28, h = 28 }) {
  return (
    <>
      {theme === 'white' ? (
        <Image
          src={'static/icons/logo-white.svg'}
          className="mr-2"
          width={w}
          height={h}
          alt="Expense.fyi"
        />
      ) : (
        <Image
          src={'static/icons/logo.svg'}
          className="mr-2"
          width={w}
          height={h}
          alt="Expense.fyi"
        />
      )}
      <span className="font-default font-black tracking-[-0.03em]">
        Expense.fyi
      </span>
    </>
  )
}
