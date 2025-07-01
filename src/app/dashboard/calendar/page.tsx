'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import PageHeader from "@/components/PageHeader"
import WeekView from './week-view'
import MonthView from './month-view'
import { getEventsForDate, timeToGridRow } from './calendar-data'

const days = [
  { date: '2021-12-27' },
  { date: '2021-12-28' },
  { date: '2021-12-29' },
  { date: '2021-12-30' },
  { date: '2021-12-31' },
  { date: '2022-01-01', isCurrentMonth: true },
  { date: '2022-01-02', isCurrentMonth: true },
  { date: '2022-01-03', isCurrentMonth: true },
  { date: '2022-01-04', isCurrentMonth: true },
  { date: '2022-01-05', isCurrentMonth: true },
  { date: '2022-01-06', isCurrentMonth: true },
  { date: '2022-01-07', isCurrentMonth: true },
  { date: '2022-01-08', isCurrentMonth: true },
  { date: '2022-01-09', isCurrentMonth: true },
  { date: '2022-01-10', isCurrentMonth: true },
  { date: '2022-01-11', isCurrentMonth: true },
  { date: '2022-01-12', isCurrentMonth: true },
  { date: '2022-01-13', isCurrentMonth: true },
  { date: '2022-01-14', isCurrentMonth: true },
  { date: '2022-01-15', isCurrentMonth: true },
  { date: '2022-01-16', isCurrentMonth: true },
  { date: '2022-01-17', isCurrentMonth: true },
  { date: '2022-01-18', isCurrentMonth: true },
  { date: '2022-01-19', isCurrentMonth: true },
  { date: '2022-01-20', isCurrentMonth: true, isToday: true },
  { date: '2022-01-21', isCurrentMonth: true },
  { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
  { date: '2022-01-23', isCurrentMonth: true },
  { date: '2022-01-24', isCurrentMonth: true },
  { date: '2022-01-25', isCurrentMonth: true },
  { date: '2022-01-26', isCurrentMonth: true },
  { date: '2022-01-27', isCurrentMonth: true },
  { date: '2022-01-28', isCurrentMonth: true },
  { date: '2022-01-29', isCurrentMonth: true },
  { date: '2022-01-30', isCurrentMonth: true },
  { date: '2022-01-31', isCurrentMonth: true },
  { date: '2022-02-01' },
  { date: '2022-02-02' },
  { date: '2022-02-03' },
  { date: '2022-02-04' },
  { date: '2022-02-05' },
  { date: '2022-02-06' },
]

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CalendarPage() {
  const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('day')
  const container = useRef<HTMLDivElement>(null)
  const containerNav = useRef<HTMLDivElement>(null)
  const containerOffset = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set the container scroll position to 6am (6 hours * 60 minutes = 360 minutes)
    if (view === 'day' && container.current && containerNav.current && containerOffset.current) {
      const targetMinute = 6 * 60 // 6am
      container.current.scrollTop =
        ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
          targetMinute) /
        1440
    }
  }, [view])

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      <header className="flex flex-none items-center justify-between border-b border-border px-6 py-4 bg-background">
        <div>
          <h1 className="text-base font-semibold text-foreground">
            <time dateTime="2025-07-07" className="sm:hidden">
              Jul 7, 2025
            </time>
            <time dateTime="2025-07-07" className="hidden sm:inline">
              July 7, 2025
            </time>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Monday</p>
        </div>
                  <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-background shadow-sm md:items-stretch">
              <Button
                variant="outline"
                size="icon"
                className="rounded-l-md rounded-r-none border-r-0"
              >
                <span className="sr-only">Previous day</span>
                <ChevronLeft className="size-5" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                className="hidden rounded-none border-x-0 px-3.5 text-sm font-semibold text-foreground md:block"
              >
                Today
              </Button>
              <span className="relative -mx-px h-5 w-px bg-border md:hidden" />
              <Button
                variant="outline"
                size="icon"
                className="rounded-l-none rounded-r-md border-l-0"
              >
                <span className="sr-only">Next day</span>
                <ChevronRight className="size-5" aria-hidden="true" />
              </Button>
            </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-x-1.5">
                  {view === 'day' && 'Day view'}
                  {view === 'week' && 'Week view'}
                  {view === 'month' && 'Month view'}
                  {view === 'year' && 'Year view'}
                  <ChevronDown className="-mr-1 size-5 text-muted-foreground" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={() => setView('day')}>Day view</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView('week')}>Week view</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView('month')}>Month view</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView('year')}>Year view</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative ml-6 md:hidden">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-5" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem>Go to today</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setView('day')}>Day view</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('week')}>Week view</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('month')}>Month view</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('year')}>Year view</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {view === 'week' ? (
        <WeekView />
      ) : view === 'month' ? (
        <MonthView />
      ) : (
        <div className="isolate flex flex-auto overflow-hidden bg-background">
          <div ref={container} className="flex flex-auto flex-col overflow-auto">
          <div
            ref={containerNav}
            className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-background text-xs text-muted-foreground shadow-sm ring-1 ring-border md:hidden"
          >
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>M</span>
              <span className="mt-3 flex size-8 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
                7
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>T</span>
              <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-foreground">
                8
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>W</span>
              <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-foreground">
                9
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>T</span>
              <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-foreground">
                10
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>F</span>
              <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-foreground">
                11
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>S</span>
              <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-foreground">
                12
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>S</span>
              <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-foreground">
                13
              </span>
            </button>
          </div>
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-background ring-1 ring-border" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-border"
                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">12AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">1AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">2AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">3AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">4AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">5AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">6AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">7AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">8AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">9AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">10AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">11AM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">12PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">1PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">2PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">3PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">4PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">5PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">6PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">7PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">8PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">9PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">10PM</div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-muted-foreground">11PM</div>
                </div>
                <div />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
              >
                {(() => {
                  const dayEvents = getEventsForDate('2025-07-07')
                  return dayEvents.map((event) => {
                    if (event.time === 'All day') return null
                    
                    // Convert time to grid position using unified function
                    const startRow = timeToGridRow(event.time) + 1
                    const duration = 12 // Default 1 hour duration (12 rows per hour)
                    
                    return (
                      <li key={event.id} className="relative mt-px flex" style={{ gridRow: `${startRow} / span ${duration}` }}>
                        <a
                          href={event.href}
                          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 dark:bg-blue-950/50 p-2 text-xs/5 hover:bg-blue-100 dark:hover:bg-blue-950/70"
                        >
                          <p className="font-semibold text-blue-700 dark:text-blue-300">{event.name}</p>
                        </a>
                      </li>
                    )
                  })
                })()}
              </ol>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 max-w-md flex-none border-l border-border px-8 py-10 md:block">
          <div className="flex items-center text-center text-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeft className="size-5" aria-hidden="true" />
            </Button>
            <div className="flex-auto text-sm font-semibold">July 2025</div>
            <Button
              variant="ghost"
              size="icon"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Next month</span>
              <ChevronRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-center text-xs/6 text-muted-foreground">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-muted text-sm shadow-sm ring-1 ring-border">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-accent focus:z-10',
                  day.isCurrentMonth ? 'bg-background' : 'bg-muted',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-primary-foreground',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-foreground',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-muted-foreground',
                  day.isToday && !day.isSelected && 'text-primary',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === days.length - 7 && 'rounded-bl-lg',
                  dayIdx === days.length - 1 && 'rounded-br-lg',
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex size-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-primary',
                    day.isSelected && !day.isToday && 'bg-primary',
                  )}
                >
                  {day.date.split('-').pop()?.replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
        )}
    </div>
  )
} 