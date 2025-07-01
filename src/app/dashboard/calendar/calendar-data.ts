export interface CalendarEvent {
  id: number
  name: string
  time: string
  datetime: string
  href: string
}

export interface CalendarDay {
  date: string
  isCurrentMonth?: boolean
  isToday?: boolean
  isSelected?: boolean
  events: CalendarEvent[]
}

// Extended event interface for week view positioning
export interface WeekEvent extends CalendarEvent {
  day: number
  startRow: number
  duration: number
}

// Helper function to get day of week (0 = Sunday, 1 = Monday, etc.)
function getDayOfWeek(dateString: string): number {
  return new Date(dateString).getDay()
}

// Helper function to check if a date is Monday-Friday (1-5)
function isWeekday(dateString: string): boolean {
  const dayOfWeek = getDayOfWeek(dateString)
  return dayOfWeek >= 1 && dayOfWeek <= 5
}

// Helper function to convert time to grid row position
export function timeToGridRow(time: string): number {
  const [hours, minutes] = time.replace(/[AP]M/i, '').split(':').map(Number)
  const isPM = time.toLowerCase().includes('pm')
  const adjustedHours = isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours
  // 288 rows total, 24 hours = 12 rows per hour (288/24 = 12)
  return (adjustedHours * 12) + Math.floor((minutes || 0) / 5)
}

// Helper function to calculate event duration in grid rows
function calculateEventDuration(startTime: string, endTime?: string): number {
  if (!endTime) return 12 // Default 1 hour duration (12 rows per hour)
  
  const startRow = timeToGridRow(startTime)
  const endRow = timeToGridRow(endTime)
  return Math.max(12, endRow - startRow) // Minimum 1 hour (12 rows)
}

// Helper function to get day number for week view (1 = Monday, 2 = Tuesday, etc.)
function getDayNumber(dateString: string): number {
  const dayOfWeek = getDayOfWeek(dateString)
  return dayOfWeek === 0 ? 7 : dayOfWeek // Convert Sunday (0) to 7
}

// All events in a single unified structure
const allEvents: CalendarEvent[] = [
  // July 3, 2025
  { id: 1, name: 'Design review', time: '10AM', datetime: '2025-07-03T10:00', href: '#' },
  { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2025-07-03T14:00', href: '#' },
  { id: 3, name: 'Client presentation', time: '4PM', datetime: '2025-07-03T16:00', href: '#' },
  
  // July 4, 2025
  { id: 4, name: 'Independence Day', time: 'All day', datetime: '2025-07-04T00:00', href: '#' },
  
  // July 7, 2025
  { id: 5, name: 'Team standup', time: '9AM', datetime: '2025-07-07T09:00', href: '#' },
  { id: 6, name: 'Product planning', time: '11AM', datetime: '2025-07-07T11:00', href: '#' },
  
  // July 8, 2025
  { id: 7, name: 'Marketing strategy', time: '1PM', datetime: '2025-07-08T13:00', href: '#' },
  { id: 8, name: 'Dentist appointment', time: '3PM', datetime: '2025-07-08T15:00', href: '#' },
  
  // July 9, 2025
  { id: 9, name: 'Code review', time: '10AM', datetime: '2025-07-09T10:00', href: '#' },
  { id: 10, name: 'Lunch with Sarah', time: '12PM', datetime: '2025-07-09T12:00', href: '#' },
  
  // July 10, 2025
  { id: 11, name: 'Weekly planning', time: '9AM', datetime: '2025-07-10T09:00', href: '#' },
  { id: 12, name: 'Budget review', time: '2PM', datetime: '2025-07-10T14:00', href: '#' },
  
  // July 11, 2025
  { id: 13, name: 'Client call - ABC Corp', time: '11AM', datetime: '2025-07-11T11:00', href: '#' },
  { id: 14, name: 'Gym session', time: '5PM', datetime: '2025-07-11T17:00', href: '#' },
  
  // July 14, 2025
  { id: 15, name: "Sam's birthday party", time: '2PM', datetime: '2025-07-14T14:00', href: '#' },
  { id: 16, name: 'Board meeting', time: '4PM', datetime: '2025-07-14T16:00', href: '#' },
  
  // July 15, 2025
  { id: 17, name: 'Interview - Frontend Dev', time: '10AM', datetime: '2025-07-15T10:00', href: '#' },
  { id: 18, name: 'Team building', time: '3PM', datetime: '2025-07-15T15:00', href: '#' },
  
  // July 16, 2025
  { id: 19, name: 'Project kickoff', time: '9AM', datetime: '2025-07-16T09:00', href: '#' },
  { id: 20, name: 'Happy hour', time: '5PM', datetime: '2025-07-16T17:00', href: '#' },
  
  // July 17, 2025
  { id: 21, name: 'Sprint planning', time: '10AM', datetime: '2025-07-17T10:00', href: '#' },
  { id: 22, name: 'UX workshop', time: '2PM', datetime: '2025-07-17T14:00', href: '#' },
  
  // July 18, 2025
  { id: 23, name: 'Investor meeting', time: '11AM', datetime: '2025-07-18T11:00', href: '#' },
  { id: 24, name: 'Dinner with clients', time: '7PM', datetime: '2025-07-18T19:00', href: '#' },
  
  // July 21, 2025
  { id: 25, name: 'Product demo', time: '1PM', datetime: '2025-07-21T13:00', href: '#' },
  { id: 26, name: 'Coffee with mentor', time: '3PM', datetime: '2025-07-21T15:00', href: '#' },
  
  // July 22, 2025
  { id: 27, name: 'Retrospective', time: '10AM', datetime: '2025-07-22T10:00', href: '#' },
  { id: 28, name: 'Weekend planning', time: '4PM', datetime: '2025-07-22T16:00', href: '#' },
  
  // July 23, 2025
  { id: 29, name: 'Summer festival', time: '3PM', datetime: '2025-07-23T15:00', href: '#' },
  { id: 30, name: 'Concert in the park', time: '7PM', datetime: '2025-07-23T19:00', href: '#' },
  
  // July 24, 2025
  { id: 31, name: 'Brunch with friends', time: '11AM', datetime: '2025-07-24T11:00', href: '#' },
  
  // July 25, 2025
  { id: 32, name: 'All-hands meeting', time: '9AM', datetime: '2025-07-25T09:00', href: '#' },
  { id: 33, name: 'Performance review', time: '2PM', datetime: '2025-07-25T14:00', href: '#' },
  
  // July 28, 2025
  { id: 34, name: 'Conference call', time: '11AM', datetime: '2025-07-28T11:00', href: '#' },
  { id: 35, name: 'Yoga class', time: '6PM', datetime: '2025-07-28T18:00', href: '#' },
  
  // July 29, 2025
  { id: 36, name: 'Design sprint', time: '10AM', datetime: '2025-07-29T10:00', href: '#' },
  { id: 37, name: 'Networking event', time: '6PM', datetime: '2025-07-29T18:00', href: '#' },
  
  // July 30, 2025
  { id: 38, name: 'Code deployment', time: '9AM', datetime: '2025-07-30T09:00', href: '#' },
  { id: 39, name: 'Team dinner', time: '7PM', datetime: '2025-07-30T19:00', href: '#' },
  
  // July 31, 2025
  { id: 40, name: 'Quarterly review', time: '1PM', datetime: '2025-07-31T13:00', href: '#' },
]

// Helper function to get events for a specific date
export function getEventsForDate(date: string): CalendarEvent[] {
  const dateEvents = allEvents.filter(event => event.datetime.startsWith(date))
  
  // Add recurring events for weekdays
  if (isWeekday(date)) {
    const recurringEvents: CalendarEvent[] = [
      {
        id: parseInt(date.replace(/-/g, '')) * 100 + 1,
        name: 'Check todo + mail',
        time: '8AM',
        datetime: `${date}T08:00`,
        href: '#'
      },
      {
        id: parseInt(date.replace(/-/g, '')) * 100 + 2,
        name: 'Family time DNB',
        time: '6PM',
        datetime: `${date}T18:00`,
        href: '#'
      }
    ]
    return [...dateEvents, ...recurringEvents]
  }
  
  return dateEvents
}

// Helper function to get events for a date range
export function getEventsForDateRange(startDate: string, endDate: string): CalendarEvent[] {
  const events: CalendarEvent[] = []
  const currentDate = new Date(startDate)
  const end = new Date(endDate)
  
  while (currentDate <= end) {
    const dateString = currentDate.toISOString().split('T')[0]
    events.push(...getEventsForDate(dateString))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return events
}

// Helper function to convert events to week view format
export function getWeekEvents(startDate: string): WeekEvent[] {
  const weekEvents: WeekEvent[] = []
  const currentDate = new Date(startDate)
  
  // Get events for the week (7 days starting from startDate)
  for (let i = 0; i < 7; i++) {
    const dateString = currentDate.toISOString().split('T')[0]
    const dayEvents = getEventsForDate(dateString)
    const dayNumber = getDayNumber(dateString)
    
    dayEvents.forEach(event => {
      if (event.time !== 'All day') {
        weekEvents.push({
          ...event,
          day: dayNumber,
          startRow: timeToGridRow(event.time),
          duration: calculateEventDuration(event.time)
        })
      }
    })
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return weekEvents
}

// Base days data without events (events will be added dynamically)
const baseDays: Omit<CalendarDay, 'events'>[] = [
  { date: '2025-06-29' },
  { date: '2025-06-30' },
  { date: '2025-07-01', isCurrentMonth: true },
  { date: '2025-07-02', isCurrentMonth: true },
  { date: '2025-07-03', isCurrentMonth: true },
  { date: '2025-07-04', isCurrentMonth: true },
  { date: '2025-07-05', isCurrentMonth: true },
  { date: '2025-07-06', isCurrentMonth: true },
  { date: '2025-07-07', isCurrentMonth: true },
  { date: '2025-07-08', isCurrentMonth: true },
  { date: '2025-07-09', isCurrentMonth: true },
  { date: '2025-07-10', isCurrentMonth: true },
  { date: '2025-07-11', isCurrentMonth: true },
  { date: '2025-07-12', isCurrentMonth: true },
  { date: '2025-07-13', isCurrentMonth: true },
  { date: '2025-07-14', isCurrentMonth: true },
  { date: '2025-07-15', isCurrentMonth: true },
  { date: '2025-07-16', isCurrentMonth: true },
  { date: '2025-07-17', isCurrentMonth: true },
  { date: '2025-07-18', isCurrentMonth: true },
  { date: '2025-07-19', isCurrentMonth: true },
  { date: '2025-07-20', isCurrentMonth: true },
  { date: '2025-07-21', isCurrentMonth: true },
  { date: '2025-07-22', isCurrentMonth: true },
  { date: '2025-07-23', isCurrentMonth: true, isSelected: true },
  { date: '2025-07-24', isCurrentMonth: true },
  { date: '2025-07-25', isCurrentMonth: true },
  { date: '2025-07-26', isCurrentMonth: true },
  { date: '2025-07-27', isCurrentMonth: true },
  { date: '2025-07-28', isCurrentMonth: true },
  { date: '2025-07-29', isCurrentMonth: true },
  { date: '2025-07-30', isCurrentMonth: true },
  { date: '2025-07-31', isCurrentMonth: true },
  { date: '2025-08-01' },
  { date: '2025-08-02' },
  { date: '2025-08-03' },
]

// Export the days with events added dynamically
export const days: CalendarDay[] = baseDays.map(day => ({
  ...day,
  events: getEventsForDate(day.date)
}))

// Export week events for the week starting July 10, 2025
export const weekEvents = getWeekEvents('2025-07-10') 
