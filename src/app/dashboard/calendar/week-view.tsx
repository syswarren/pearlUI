'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { weekEvents } from './calendar-data'

export default function WeekView() {
  const container = useRef<HTMLDivElement>(null)
  const containerNav = useRef<HTMLDivElement>(null)
  const containerOffset = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set the container scroll position to 8am (8 hours * 60 minutes = 480 minutes)
    if (container.current && containerNav.current && containerOffset.current) {
      const targetMinute = 8 * 60 // 8am
      container.current.scrollTop =
        ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
          targetMinute) /
        1440
    }
  }, [])

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div ref={container} className="flex-1 overflow-auto isolate flex flex-col bg-background">
        <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-background shadow-sm ring-1 ring-border sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm/6 text-muted-foreground sm:hidden">
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                M <span className="mt-1 flex size-8 items-center justify-center font-semibold text-foreground">7</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                T <span className="mt-1 flex size-8 items-center justify-center font-semibold text-foreground">8</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                W{' '}
                <span className="mt-1 flex size-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                  9
                </span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                T <span className="mt-1 flex size-8 items-center justify-center font-semibold text-foreground">10</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                F <span className="mt-1 flex size-8 items-center justify-center font-semibold text-foreground">11</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                S <span className="mt-1 flex size-8 items-center justify-center font-semibold text-foreground">12</span>
              </button>
              <button type="button" className="flex flex-col items-center pt-2 pb-3">
                S <span className="mt-1 flex size-8 items-center justify-center font-semibold text-foreground">13</span>
              </button>
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-border border-r border-border text-sm/6 text-muted-foreground sm:grid">
              <div className="col-end-1 w-14" />
              <div className="flex items-center justify-center py-3">
                <span>
                  Mon <span className="items-center justify-center font-semibold text-foreground">7</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Tue <span className="items-center justify-center font-semibold text-foreground">8</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span className="flex items-baseline">
                  Wed{' '}
                  <span className="ml-1.5 flex size-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                    9
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Thu <span className="items-center justify-center font-semibold text-foreground">10</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Fri <span className="items-center justify-center font-semibold text-foreground">11</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sat <span className="items-center justify-center font-semibold text-foreground">12</span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sun <span className="items-center justify-center font-semibold text-foreground">13</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-background ring-1 ring-border" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-border"
                style={{ gridTemplateRows: 'repeat(48, minmax(2rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-border sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
              >
                {weekEvents.map((event) => (
                  <li 
                    key={event.id} 
                    className={`relative mt-px flex sm:col-start-${event.day}`} 
                    style={{ gridRow: `${event.startRow} / span ${event.duration}` }}
                  >
                    <a
                      href={event.href}
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 dark:bg-blue-950/50 p-1 text-xs/4 hover:bg-blue-100 dark:hover:bg-blue-950/70"
                    >
                      <p className="font-semibold text-blue-700 dark:text-blue-300 text-xs">{event.name}</p>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 