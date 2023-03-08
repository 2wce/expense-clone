import { Transition } from '@headlessui/react'
import { useEffect, useRef } from 'react'

type Props = {
  searchTerm?: string
  show?: boolean
  onHide: () => void
  data: Array<{ name: string; id: string; category: string }>
  onClick: ({ name, category }: { name: string; category: string }) => void
}
export default function Dropdown({
  searchTerm = '',
  show,
  onHide,
  data = [],
  onClick
}: Props) {
  const ref = useRef<HTMLElement>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onHide()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onHide])

  return (
    <Transition
      as={'div'}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 -translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={show}
    >
      {data.length ? (
        <div
          // @ts-expect-error will see
          ref={ref}
          className="absolute	mt-[3px] min-w-[160px] max-w-[250px] overflow-auto rounded-md border border-gray-300 bg-white text-base shadow-md focus:outline-none sm:text-sm"
        >
          {data.map(({ name: datumName, id, category }) => {
            const name = datumName.toLowerCase()
            let string, highlightedText, endString
            if (searchTerm.length) {
              string = name.substr(0, name.indexOf(searchTerm))
              endString = name.substr(
                name.indexOf(searchTerm) + searchTerm.length
              )
              highlightedText = name.substr(
                name.indexOf(searchTerm),
                searchTerm.length
              )
            }
            return (
              <button
                key={id}
                onClick={() => onClick({ name, category })}
                className="relative w-full cursor-default select-none p-2 px-[10px] text-left text-gray-900 hover:bg-gray-100"
              >
                {searchTerm.length ? (
                  <span>
                    {string}
                    <span className="font-semibold">{highlightedText}</span>
                    {endString}
                  </span>
                ) : (
                  name
                )}
              </button>
            )
          })}
        </div>
      ) : null}
    </Transition>
  )
}
