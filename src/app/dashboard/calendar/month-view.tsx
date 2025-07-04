import { Clock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { days, CalendarEvent } from './calendar-data'
import EventModal from '@/components/EventModal'

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function MonthView() {
  const selectedDay = useMemo(() => days.find((day) => day.isSelected), [])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.preventDefault()
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-7 gap-px border-b border-border bg-muted text-center text-xs/6 font-semibold text-muted-foreground">
          <div className="bg-background py-2">M<span className="sr-only sm:not-sr-only">on</span></div>
          <div className="bg-background py-2">T<span className="sr-only sm:not-sr-only">ue</span></div>
          <div className="bg-background py-2">W<span className="sr-only sm:not-sr-only">ed</span></div>
          <div className="bg-background py-2">T<span className="sr-only sm:not-sr-only">thu</span></div>
          <div className="bg-background py-2">F<span className="sr-only sm:not-sr-only">ri</span></div>
          <div className="bg-background py-2">S<span className="sr-only sm:not-sr-only">at</span></div>
          <div className="bg-background py-2">S<span className="sr-only sm:not-sr-only">un</span></div>
        </div>
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          {days.map((day, dayIdx) => {
            const isLastColumn = (dayIdx + 1) % 7 === 0
            const isLastRow = dayIdx >= days.length - 7
            return (
            <div
              key={day.date}
              className={classNames(
                day.isCurrentMonth ? 'bg-background' : 'bg-muted text-muted-foreground',
                'relative px-3 py-2 min-h-32',
                !isLastColumn && 'border-r border-border',
                !isLastRow && 'border-b border-border',
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  day.isToday && 'flex size-6 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground',
                  'text-xs font-normal',
                )}
              >
                {day.date.split('-').pop()?.replace(/^0/, '')}
              </time>
              {day.events && day.events.length > 0 && (
                <ol className="mt-1 space-y-0.5">
                  {day.events.slice(0, 2).map((event) => (
                    <li key={event.id}>
                      <button 
                        onClick={(e) => handleEventClick(event, e)}
                        className="group flex items-center w-full text-left hover:bg-accent rounded px-1 py-0.5 transition-colors"
                      >
                        <span className="truncate text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {event.name}
                        </span>
                        <time
                          dateTime={event.datetime}
                          className="ml-2 hidden flex-none text-xs text-muted-foreground group-hover:text-foreground transition-colors xl:block"
                        >
                          {event.time}
                        </time>
                      </button>
                    </li>
                  ))}
                  {day.events.length > 2 && <li className="text-xs text-muted-foreground">+ {day.events.length - 2} more</li>}
                </ol>
              )}
            </div>
          )})}
        </div>
        <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          {days.map((day, dayIdx) => {
            const isLastColumn = (dayIdx + 1) % 7 === 0
            const isLastRow = dayIdx >= days.length - 7
            return (
            <button
              key={day.date}
              type="button"
              className={classNames(
                day.isCurrentMonth ? 'bg-background' : 'bg-muted',
                (day.isSelected || day.isToday) && 'font-semibold',
                day.isSelected && 'text-primary-foreground',
                !day.isSelected && day.isToday && 'text-primary',
                !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-foreground',
                !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-muted-foreground',
                'flex h-32 min-h-32 flex-col px-3 py-2 hover:bg-accent focus:z-10',
                !isLastColumn && 'border-r border-border',
                !isLastRow && 'border-b border-border',
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  day.isSelected && 'flex size-6 items-center justify-center rounded-full',
                  day.isSelected && day.isToday && 'bg-primary',
                  day.isSelected && !day.isToday && 'bg-primary',
                  'ml-auto text-xs font-normal',
                )}
              >
                {day.date.split('-').pop()?.replace(/^0/, '')}
              </time>
              <span className="sr-only">{day.events?.length ?? 0} events</span>
              {day.events && day.events.length > 0 && (
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                  {day.events.map((event) => (
                    <span key={event.id} className="mx-0.5 mb-1 size-1 rounded-full bg-muted-foreground" />
                  ))}
                </span>
              )}
            </button>
          )})}
        </div>
      </div>
      {selectedDay && selectedDay.events && selectedDay.events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-border overflow-hidden rounded-lg bg-background text-xs shadow-sm ring-1 ring-border">
            {selectedDay.events.map((event) => (
              <li key={event.id} className="group flex p-4 pr-6 focus-within:bg-accent hover:bg-accent">
                <div className="flex-auto">
                  <p className="font-normal text-foreground text-xs">{event.name}</p>
                  <time dateTime={event.datetime} className="mt-2 flex items-center text-muted-foreground text-xs">
                    <Clock className="mr-2 size-4 text-muted-foreground" aria-hidden="true" />
                    {event.time}
                  </time>
                </div>
                <button
                  onClick={(e) => handleEventClick(event, e)}
                  className="ml-6 flex-none self-center rounded-md bg-background px-3 py-2 font-normal text-foreground opacity-0 shadow-xs ring-1 ring-border group-hover:opacity-100 focus:opacity-100 text-xs hover:bg-accent transition-colors"
                >
                  View<span className="sr-only">, {event.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
      
      <EventModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
} 