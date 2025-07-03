export interface CalendarEvent {
  id: number
  name: string
  time: string
  datetime: string
  href: string
  color?: string
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
  if (!endTime) {
    // Default durations based on event type
    const eventName = allEvents.find(e => e.time === startTime)?.name || ''
    
    // Focus time blocks are 1 hour
    if (eventName.includes('Focus time')) return 12
    
    // Discovery calls are 30 minutes
    if (eventName.includes('Discovery call')) return 6
    
    // Demos are 45 minutes
    if (eventName.includes('Demo')) return 9
    
    // Lunch meetings are 1 hour
    if (eventName.includes('Lunch')) return 12
    
    // Executive presentations are 1.5 hours
    if (eventName.includes('Executive presentation')) return 18
    
    // Contract negotiations are 1.5 hours
    if (eventName.includes('Contract negotiation')) return 18
    
    // Team meetings are 1 hour
    if (eventName.includes('Team') || eventName.includes('All-hands')) return 12
    
    // Training sessions are 1 hour
    if (eventName.includes('training') || eventName.includes('Training')) return 12
    
    // Default 1 hour for other meetings
    return 12
  }
  
  const startRow = timeToGridRow(startTime)
  const endRow = timeToGridRow(endTime)
  return Math.max(6, endRow - startRow) // Minimum 30 minutes (6 rows)
}

// Helper function to get day number for week view (1 = Monday, 2 = Tuesday, etc.)
function getDayNumber(dateString: string): number {
  const dayOfWeek = getDayOfWeek(dateString)
  return dayOfWeek === 0 ? 7 : dayOfWeek // Convert Sunday (0) to 7
}

// All events in a single unified structure
const allEvents: CalendarEvent[] = [
  // July 3, 2025
  { id: 1, name: 'Discovery call – Acme Corp', time: '9AM', datetime: '2025-07-03T09:00', href: '#' },
  { id: 2, name: 'Focus time – Proposal prep', time: '10AM', datetime: '2025-07-03T10:00', href: '#' },
  { id: 3, name: 'Follow-up strategy – Ardent Media', time: '11AM', datetime: '2025-07-03T11:00', href: '#' },
  { id: 4, name: 'Lunch with prospect – TechStart Inc', time: '12PM', datetime: '2025-07-03T12:00', href: '#' },
  { id: 5, name: 'Focus time – Research competitors', time: '1PM', datetime: '2025-07-03T13:00', href: '#' },
  { id: 6, name: 'Demo prep – Velar Technologies', time: '2PM', datetime: '2025-07-03T14:00', href: '#' },
  { id: 7, name: 'Pipeline review – Velar Technologies', time: '4PM', datetime: '2025-07-03T16:00', href: '#' },
  
  // July 4, 2025
  { id: 8, name: 'Draft email – Acme Corp', time: 'All day', datetime: '2025-07-04T00:00', href: '#' },
  
  // July 7, 2025
  { id: 9, name: 'Deal check-in – Velar Technologies', time: '9AM', datetime: '2025-07-07T09:00', href: '#' },
  { id: 10, name: 'Focus time – Contract review', time: '10AM', datetime: '2025-07-07T10:00', href: '#' },
  { id: 11, name: 'Discovery call – InnovateCorp', time: '11AM', datetime: '2025-07-07T11:00', href: '#' },
  { id: 12, name: 'Lunch with team', time: '12PM', datetime: '2025-07-07T12:00', href: '#' },
  { id: 13, name: 'Focus time – Follow-up emails', time: '1PM', datetime: '2025-07-07T13:00', href: '#' },
  { id: 14, name: 'Weekly forecast review – Ardent Media', time: '2PM', datetime: '2025-07-07T14:00', href: '#' },
  { id: 15, name: 'Sales coaching session', time: '3PM', datetime: '2025-07-07T15:00', href: '#' },
  { id: 16, name: 'Focus time – Pipeline updates', time: '4PM', datetime: '2025-07-07T16:00', href: '#' },
  
  // July 8, 2025
  { id: 17, name: 'Contract alignment – Acme Corp', time: '9AM', datetime: '2025-07-08T09:00', href: '#' },
  { id: 18, name: 'Focus time – Proposal writing', time: '10AM', datetime: '2025-07-08T10:00', href: '#' },
  { id: 19, name: 'Technical deep dive – Velar Technologies', time: '11AM', datetime: '2025-07-08T11:00', href: '#' },
  { id: 20, name: 'Lunch with prospect – TechStart Inc', time: '12PM', datetime: '2025-07-08T12:00', href: '#' },
  { id: 21, name: 'Focus time – Research prospect', time: '1PM', datetime: '2025-07-08T13:00', href: '#' },
  { id: 22, name: 'Demo – Ardent Media', time: '2PM', datetime: '2025-07-08T14:00', href: '#' },
  { id: 23, name: 'Stakeholder meeting – Acme Corp', time: '3PM', datetime: '2025-07-08T15:00', href: '#' },
  { id: 24, name: 'Focus time – Deal strategy', time: '4PM', datetime: '2025-07-08T16:00', href: '#' },
  { id: 25, name: 'Team sync – Internal planning', time: '5PM', datetime: '2025-07-08T17:00', href: '#' },
  
  // July 9, 2025
  { id: 26, name: 'Demo – Ardent Media', time: '9AM', datetime: '2025-07-09T09:00', href: '#' },
  { id: 27, name: 'Focus time – Post-demo follow-up', time: '10AM', datetime: '2025-07-09T10:00', href: '#' },
  { id: 28, name: 'Discovery call – NewProspect Inc', time: '11AM', datetime: '2025-07-09T11:00', href: '#' },
  { id: 29, name: 'Lunch with prospect – Velar Technologies', time: '12PM', datetime: '2025-07-09T12:00', href: '#' },
  { id: 30, name: 'Focus time – Competitive analysis', time: '1PM', datetime: '2025-07-09T13:00', href: '#' },
  { id: 31, name: 'Executive presentation – Acme Corp', time: '2PM', datetime: '2025-07-09T14:00', href: '#' },
  { id: 32, name: 'Deal coaching – Velar Technologies', time: '3PM', datetime: '2025-07-09T15:00', href: '#' },
  { id: 33, name: 'Focus time – Contract drafting', time: '4PM', datetime: '2025-07-09T16:00', href: '#' },
  
  // July 10, 2025
  { id: 34, name: 'Opportunity sync – Acme Corp', time: '9AM', datetime: '2025-07-10T09:00', href: '#' },
  { id: 35, name: 'Focus time – Proposal finalization', time: '10AM', datetime: '2025-07-10T10:00', href: '#' },
  { id: 36, name: 'Technical evaluation – Velar Technologies', time: '11AM', datetime: '2025-07-10T11:00', href: '#' },
  { id: 37, name: 'Lunch with prospect – Ardent Media', time: '12PM', datetime: '2025-07-10T12:00', href: '#' },
  { id: 38, name: 'Focus time – Deal strategy planning', time: '1PM', datetime: '2025-07-10T13:00', href: '#' },
  { id: 39, name: 'Contract negotiation – Acme Corp', time: '2PM', datetime: '2025-07-10T14:00', href: '#' },
  { id: 40, name: 'Sales team training', time: '3PM', datetime: '2025-07-10T15:00', href: '#' },
  { id: 41, name: 'Q3 planning – Ardent Media', time: '4PM', datetime: '2025-07-10T16:00', href: '#' },
  
  // July 11, 2025 (Friday - lighter afternoon)
  { id: 42, name: 'Procurement prep – Velar Technologies', time: '9AM', datetime: '2025-07-11T09:00', href: '#' },
  { id: 43, name: 'Focus time – Research procurement process', time: '10AM', datetime: '2025-07-11T10:00', href: '#' },
  { id: 44, name: 'Discovery call – FutureTech Corp', time: '11AM', datetime: '2025-07-11T11:00', href: '#' },
  { id: 45, name: 'Lunch with prospect – TechStart Inc', time: '12PM', datetime: '2025-07-11T12:00', href: '#' },
  { id: 46, name: 'Focus time – Deal analysis', time: '1PM', datetime: '2025-07-11T13:00', href: '#' },
  { id: 47, name: '1:1 with VP Sales', time: '2PM', datetime: '2025-07-11T14:00', href: '#' },
  { id: 48, name: 'Focus time – Week wrap-up', time: '3PM', datetime: '2025-07-11T15:00', href: '#' },
  
  // July 14, 2025
  { id: 49, name: 'Contract negotiation – Acme Corp', time: '9AM', datetime: '2025-07-14T09:00', href: '#' },
  { id: 50, name: 'Focus time – Legal review', time: '10AM', datetime: '2025-07-14T10:00', href: '#' },
  { id: 51, name: 'Executive presentation – Ardent Media', time: '11AM', datetime: '2025-07-14T11:00', href: '#' },
  { id: 52, name: 'Lunch with prospect – Velar Technologies', time: '12PM', datetime: '2025-07-14T12:00', href: '#' },
  { id: 53, name: 'Focus time – Presentation prep', time: '1PM', datetime: '2025-07-14T13:00', href: '#' },
  { id: 54, name: 'Contract negotiation – Acme Corp', time: '2PM', datetime: '2025-07-14T14:00', href: '#' },
  { id: 55, name: 'Executive presentation – Ardent Media', time: '4PM', datetime: '2025-07-14T16:00', href: '#' },
  
  // July 15, 2025
  { id: 56, name: 'Technical deep dive – Velar Technologies', time: '9AM', datetime: '2025-07-15T09:00', href: '#' },
  { id: 57, name: 'Focus time – Technical documentation', time: '10AM', datetime: '2025-07-15T10:00', href: '#' },
  { id: 58, name: 'Discovery call – NextGen Solutions', time: '11AM', datetime: '2025-07-15T11:00', href: '#' },
  { id: 59, name: 'Lunch with prospect – Acme Corp', time: '12PM', datetime: '2025-07-15T12:00', href: '#' },
  { id: 60, name: 'Focus time – Deal strategy', time: '1PM', datetime: '2025-07-15T13:00', href: '#' },
  { id: 61, name: 'Sales team training', time: '3PM', datetime: '2025-07-15T15:00', href: '#' },
  { id: 62, name: 'Focus time – Training prep', time: '4PM', datetime: '2025-07-15T16:00', href: '#' },
  
  // July 16, 2025
  { id: 63, name: 'Proposal review – Acme Corp', time: '9AM', datetime: '2025-07-16T09:00', href: '#' },
  { id: 64, name: 'Focus time – Proposal revisions', time: '10AM', datetime: '2025-07-16T10:00', href: '#' },
  { id: 65, name: 'Demo – TechStart Inc', time: '11AM', datetime: '2025-07-16T11:00', href: '#' },
  { id: 66, name: 'Lunch with prospect – Ardent Media', time: '12PM', datetime: '2025-07-16T12:00', href: '#' },
  { id: 67, name: 'Focus time – Post-demo analysis', time: '1PM', datetime: '2025-07-16T13:00', href: '#' },
  { id: 68, name: 'Contract signing – Velar Technologies', time: '2PM', datetime: '2025-07-16T14:00', href: '#' },
  { id: 69, name: 'Quarterly business review', time: '5PM', datetime: '2025-07-16T17:00', href: '#' },
  
  // July 17, 2025
  { id: 70, name: 'Discovery call – TechStart Inc', time: '9AM', datetime: '2025-07-17T09:00', href: '#' },
  { id: 71, name: 'Focus time – Research prospect', time: '10AM', datetime: '2025-07-17T10:00', href: '#' },
  { id: 72, name: 'Competitive analysis – Ardent Media', time: '11AM', datetime: '2025-07-17T11:00', href: '#' },
  { id: 73, name: 'Lunch with prospect – InnovateCorp', time: '12PM', datetime: '2025-07-17T12:00', href: '#' },
  { id: 74, name: 'Focus time – Competitive research', time: '1PM', datetime: '2025-07-17T13:00', href: '#' },
  { id: 75, name: 'Stakeholder alignment – Velar Technologies', time: '2PM', datetime: '2025-07-17T14:00', href: '#' },
  { id: 76, name: 'Client dinner – Acme Corp', time: '7PM', datetime: '2025-07-17T19:00', href: '#' },
  
  // July 18, 2025 (Friday - lighter afternoon)
  { id: 77, name: 'Stakeholder alignment – Velar Technologies', time: '9AM', datetime: '2025-07-18T09:00', href: '#' },
  { id: 78, name: 'Focus time – Stakeholder mapping', time: '10AM', datetime: '2025-07-18T10:00', href: '#' },
  { id: 79, name: 'Discovery call – FutureTech Corp', time: '11AM', datetime: '2025-07-18T11:00', href: '#' },
  { id: 80, name: 'Lunch with prospect – TechStart Inc', time: '12PM', datetime: '2025-07-18T12:00', href: '#' },
  { id: 81, name: 'Focus time – Deal strategy', time: '1PM', datetime: '2025-07-18T13:00', href: '#' },
  { id: 82, name: 'Contract negotiation – Ardent Media', time: '2PM', datetime: '2025-07-18T14:00', href: '#' },
  { id: 83, name: 'Focus time – Week planning', time: '3PM', datetime: '2025-07-18T15:00', href: '#' },
  { id: 84, name: 'Client dinner – Acme Corp', time: '7PM', datetime: '2025-07-18T19:00', href: '#' },
  
  // July 21, 2025
  { id: 85, name: 'Product demo – TechStart Inc', time: '9AM', datetime: '2025-07-21T09:00', href: '#' },
  { id: 86, name: 'Focus time – Demo prep', time: '10AM', datetime: '2025-07-21T10:00', href: '#' },
  { id: 87, name: 'Sales coaching session', time: '11AM', datetime: '2025-07-21T11:00', href: '#' },
  { id: 88, name: 'Lunch with prospect – Velar Technologies', time: '12PM', datetime: '2025-07-21T12:00', href: '#' },
  { id: 89, name: 'Focus time – Coaching prep', time: '1PM', datetime: '2025-07-21T13:00', href: '#' },
  { id: 90, name: 'Discovery call – NextGen Solutions', time: '2PM', datetime: '2025-07-21T14:00', href: '#' },
  { id: 91, name: 'Contract review – Acme Corp', time: '3PM', datetime: '2025-07-21T15:00', href: '#' },
  { id: 92, name: 'Focus time – Contract analysis', time: '4PM', datetime: '2025-07-21T16:00', href: '#' },
  
  // July 22, 2025
  { id: 93, name: 'Pipeline review meeting', time: '9AM', datetime: '2025-07-22T09:00', href: '#' },
  { id: 94, name: 'Focus time – Pipeline analysis', time: '10AM', datetime: '2025-07-22T10:00', href: '#' },
  { id: 95, name: 'Demo – InnovateCorp', time: '11AM', datetime: '2025-07-22T11:00', href: '#' },
  { id: 96, name: 'Lunch with prospect – Ardent Media', time: '12PM', datetime: '2025-07-22T12:00', href: '#' },
  { id: 97, name: 'Focus time – Post-demo follow-up', time: '1PM', datetime: '2025-07-22T13:00', href: '#' },
  { id: 98, name: 'Forecast planning', time: '2PM', datetime: '2025-07-22T14:00', href: '#' },
  { id: 99, name: 'Contract signing – Ardent Media', time: '4PM', datetime: '2025-07-22T16:00', href: '#' },
  
  // July 23, 2025
  { id: 100, name: 'Contract signing – Ardent Media', time: '9AM', datetime: '2025-07-23T09:00', href: '#' },
  { id: 101, name: 'Focus time – Post-sale planning', time: '10AM', datetime: '2025-07-23T10:00', href: '#' },
  { id: 102, name: 'Post-sale kickoff – Velar Technologies', time: '11AM', datetime: '2025-07-23T11:00', href: '#' },
  { id: 103, name: 'Lunch with prospect – TechStart Inc', time: '12PM', datetime: '2025-07-23T12:00', href: '#' },
  { id: 104, name: 'Focus time – Success planning', time: '1PM', datetime: '2025-07-23T13:00', href: '#' },
  { id: 105, name: 'Discovery call – FutureTech Corp', time: '2PM', datetime: '2025-07-23T14:00', href: '#' },
  { id: 106, name: 'Post-sale kickoff – Velar Technologies', time: '7PM', datetime: '2025-07-23T19:00', href: '#' },
  
  // July 24, 2025
  { id: 107, name: 'Discovery call – InnovateCorp', time: '9AM', datetime: '2025-07-24T09:00', href: '#' },
  { id: 108, name: 'Focus time – Research prospect', time: '10AM', datetime: '2025-07-24T10:00', href: '#' },
  { id: 109, name: 'Demo – NextGen Solutions', time: '11AM', datetime: '2025-07-24T11:00', href: '#' },
  { id: 110, name: 'Lunch with prospect – Acme Corp', time: '12PM', datetime: '2025-07-24T12:00', href: '#' },
  { id: 111, name: 'Focus time – Deal strategy', time: '1PM', datetime: '2025-07-24T13:00', href: '#' },
  { id: 112, name: 'Contract negotiation – TechStart Inc', time: '2PM', datetime: '2025-07-24T14:00', href: '#' },
  { id: 113, name: 'Sales team training', time: '3PM', datetime: '2025-07-24T15:00', href: '#' },
  { id: 114, name: 'Focus time – Training materials', time: '4PM', datetime: '2025-07-24T16:00', href: '#' },
  
  // July 25, 2025 (Friday - lighter afternoon)
  { id: 115, name: 'All-hands sales meeting', time: '9AM', datetime: '2025-07-25T09:00', href: '#' },
  { id: 116, name: 'Focus time – Meeting prep', time: '10AM', datetime: '2025-07-25T10:00', href: '#' },
  { id: 117, name: 'Discovery call – NewProspect Inc', time: '11AM', datetime: '2025-07-25T11:00', href: '#' },
  { id: 118, name: 'Lunch with prospect – Velar Technologies', time: '12PM', datetime: '2025-07-25T12:00', href: '#' },
  { id: 119, name: 'Focus time – Deal analysis', time: '1PM', datetime: '2025-07-25T13:00', href: '#' },
  { id: 120, name: 'Performance review – Q3', time: '2PM', datetime: '2025-07-25T14:00', href: '#' },
  { id: 121, name: 'Focus time – Week planning', time: '3PM', datetime: '2025-07-25T15:00', href: '#' },
  
  // July 28, 2025
  { id: 122, name: 'Executive briefing – Acme Corp', time: '9AM', datetime: '2025-07-28T09:00', href: '#' },
  { id: 123, name: 'Focus time – Briefing prep', time: '10AM', datetime: '2025-07-28T10:00', href: '#' },
  { id: 124, name: 'Demo – FutureTech Corp', time: '11AM', datetime: '2025-07-28T11:00', href: '#' },
  { id: 125, name: 'Lunch with prospect – Ardent Media', time: '12PM', datetime: '2025-07-28T12:00', href: '#' },
  { id: 126, name: 'Focus time – Post-demo analysis', time: '1PM', datetime: '2025-07-28T13:00', href: '#' },
  { id: 127, name: 'Contract negotiation – TechStart Inc', time: '2PM', datetime: '2025-07-28T14:00', href: '#' },
  { id: 128, name: 'Sales strategy session', time: '3PM', datetime: '2025-07-28T15:00', href: '#' },
  { id: 129, name: 'Focus time – Strategy planning', time: '4PM', datetime: '2025-07-28T16:00', href: '#' },
  
  // July 29, 2025
  { id: 130, name: 'Technical evaluation – TechStart Inc', time: '9AM', datetime: '2025-07-29T09:00', href: '#' },
  { id: 131, name: 'Focus time – Technical prep', time: '10AM', datetime: '2025-07-29T10:00', href: '#' },
  { id: 132, name: 'Discovery call – NextGen Solutions', time: '11AM', datetime: '2025-07-29T11:00', href: '#' },
  { id: 133, name: 'Lunch with prospect – Velar Technologies', time: '12PM', datetime: '2025-07-29T12:00', href: '#' },
  { id: 134, name: 'Focus time – Deal strategy', time: '1PM', datetime: '2025-07-29T13:00', href: '#' },
  { id: 135, name: 'Networking event – Sales conference', time: '2PM', datetime: '2025-07-29T14:00', href: '#' },
  { id: 136, name: 'Contract negotiation – Acme Corp', time: '3PM', datetime: '2025-07-29T15:00', href: '#' },
  { id: 137, name: 'Focus time – Contract analysis', time: '4PM', datetime: '2025-07-29T16:00', href: '#' },
  
  // July 30, 2025 (Wednesday - regular schedule)
  { id: 138, name: 'Contract negotiation – InnovateCorp', time: '9AM', datetime: '2025-07-30T09:00', href: '#' },
  { id: 139, name: 'Focus time – Negotiation prep', time: '10AM', datetime: '2025-07-30T10:00', href: '#' },
  { id: 140, name: 'Demo – NewProspect Inc', time: '11AM', datetime: '2025-07-30T11:00', href: '#' },
  { id: 141, name: 'Lunch with prospect – Ardent Media', time: '12PM', datetime: '2025-07-30T12:00', href: '#' },
  { id: 142, name: 'Focus time – Post-demo follow-up', time: '1PM', datetime: '2025-07-30T13:00', href: '#' },
  { id: 143, name: 'Contract signing – TechStart Inc', time: '2PM', datetime: '2025-07-30T14:00', href: '#' },
  { id: 144, name: 'Team celebration – Q3 wins', time: '3PM', datetime: '2025-07-30T15:00', href: '#' },
  { id: 145, name: 'Focus time – Q4 planning', time: '4PM', datetime: '2025-07-30T16:00', href: '#' },
  
  // July 31, 2025 (Thursday - regular schedule)
  { id: 146, name: 'Quarterly sales review', time: '9AM', datetime: '2025-07-31T09:00', href: '#' },
  { id: 147, name: 'Focus time – Review prep', time: '10AM', datetime: '2025-07-31T10:00', href: '#' },
  { id: 148, name: 'Discovery call – FutureTech Corp', time: '11AM', datetime: '2025-07-31T11:00', href: '#' },
  { id: 149, name: 'Lunch with prospect – Velar Technologies', time: '12PM', datetime: '2025-07-31T12:00', href: '#' },
  { id: 150, name: 'Focus time – Deal strategy', time: '1PM', datetime: '2025-07-31T13:00', href: '#' },
  { id: 151, name: 'Quarterly sales review', time: '2PM', datetime: '2025-07-31T14:00', href: '#' },
  { id: 152, name: 'Contract signing – NextGen Solutions', time: '3PM', datetime: '2025-07-31T15:00', href: '#' },
  { id: 153, name: 'Focus time – Q4 planning', time: '4PM', datetime: '2025-07-31T16:00', href: '#' },
]

// Helper function to determine event color
function getEventColor(eventName: string): string {
  // Grey for focus time, check todo + mail, and family time
  if (eventName.includes('Focus time') || 
      eventName.includes('Check todo + mail') || 
      eventName.includes('Family time DNB')) {
    return 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600/30'
  }
  
  // Blue for internal meetings
  if (eventName.includes('Team') || 
      eventName.includes('All-hands') || 
      eventName.includes('Sales team') ||
      eventName.includes('Quarterly business review') ||
      eventName.includes('Sales coaching') ||
      eventName.includes('1:1 with VP Sales') ||
      eventName.includes('Performance review') ||
      eventName.includes('Sales strategy session') ||
      eventName.includes('Team celebration') ||
      eventName.includes('Quarterly sales review')) {
    return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700/30'
  }
  
  // Client-specific colors
  if (eventName.includes('Acme Corp')) {
    return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700/30'
  }
  if (eventName.includes('Ardent Media')) {
    return 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700/30'
  }
  if (eventName.includes('Velar Technologies')) {
    return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700/30'
  }
  if (eventName.includes('TechStart Inc')) {
    return 'bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-900/50 dark:text-pink-300 dark:border-pink-700/30'
  }
  if (eventName.includes('InnovateCorp')) {
    return 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700/30'
  }
  if (eventName.includes('NewProspect Inc')) {
    return 'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-700/30'
  }
  if (eventName.includes('FutureTech Corp')) {
    return 'bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/50 dark:text-cyan-300 dark:border-cyan-700/30'
  }
  if (eventName.includes('NextGen Solutions')) {
    return 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700/30'
  }
  
  // Default color for other meetings
  return 'bg-gray-50 text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600/30'
}

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
        href: '#',
        color: getEventColor('Check todo + mail')
      },
      {
        id: parseInt(date.replace(/-/g, '')) * 100 + 2,
        name: 'Family time DNB',
        time: '6PM',
        datetime: `${date}T18:00`,
        href: '#',
        color: getEventColor('Family time DNB')
      }
    ]
    
    // Add colors to existing events
    const eventsWithColors = dateEvents.map(event => ({
      ...event,
      color: getEventColor(event.name)
    }))
    
    return [...eventsWithColors, ...recurringEvents]
  }
  
  // Add colors to events for non-weekdays
  return dateEvents.map(event => ({
    ...event,
    color: getEventColor(event.name)
  }))
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

// Export week events for the week starting July 7, 2025 (current date)
export const weekEvents = getWeekEvents('2025-07-07') 
