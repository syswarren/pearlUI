'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Building, FileText, Video, MessageSquare, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CalendarEvent } from '@/app/dashboard/calendar/calendar-data'

interface EventModalProps {
  event: CalendarEvent | null
  isOpen: boolean
  onClose: () => void
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!event) return null

  const formatDate = (datetime: string) => {
    const date = new Date(datetime)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (time: string) => {
    if (time === 'All day') return 'All day'
    return time
  }

  const handlePrepareMeeting = () => {
    // TODO: Implement prepare meeting functionality
    console.log('Prepare meeting for:', event.name)
  }

  const handleJoinMeeting = () => {
    // TODO: Implement join meeting functionality
    console.log('Join meeting for:', event.name)
  }

  const handleStartConversation = () => {
    // TODO: Implement start conversation functionality
    console.log('Start conversation for:', event.name)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{event.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date and Time */}
          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm">{formatDate(event.datetime)} at {formatTime(event.time)}</p>
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm">{event.location}</p>
              </div>
            </div>
          )}

          {/* Guests */}
          <div className="flex items-start space-x-2">
            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm">You{event.guest ? `, ${event.guest}` : ''}</p>
            </div>
          </div>

          {/* Linked Account */}
          {event.linkedAccount && (
            <div className="flex items-start space-x-2">
              <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm">{event.linkedAccount}</p>
              </div>
            </div>
          )}

          {/* Separator */}
          {event.description && (
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {event.meetingType === 'meeting' && event.guest && (
            <>
              <Button 
                variant="outline" 
                onClick={handleJoinMeeting}
              >
                Join Meeting
              </Button>
              <Button 
                onClick={handlePrepareMeeting}
              >
                Prepare Meeting
              </Button>
            </>
          )}
          
          {event.meetingType === 'task' && (
            <Button 
              onClick={handleStartConversation}
            >
              Start a Conversation
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 