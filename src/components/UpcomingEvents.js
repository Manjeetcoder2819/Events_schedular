'use client'

import { format, isToday, isTomorrow, parseISO, isValid } from 'date-fns'
import { Bell, Clock, Calendar } from 'lucide-react'

export default function UpcomingEvents({ events }) {
  const getUpcomingEvents = () => {
    const now = new Date()
    return events
      .filter(event => {
        const rawDate = event.start?.dateTime || event.start?.date || event.start
        if (!rawDate) return false
        const eventDate = parseISO(rawDate)
        return isValid(eventDate) && eventDate >= now
      })
      .sort((a, b) => {
        const aDate = parseISO(a.start?.dateTime || a.start?.date || a.start)
        const bDate = parseISO(b.start?.dateTime || b.start?.date || b.start)
        return aDate - bDate
      })
      .slice(0, 5)
  }

  const formatUpcomingEventDate = (event) => {
    const rawDate = event.start?.dateTime || event.start?.date || event.start
    if (!rawDate) return 'Date unavailable'
    
    const date = parseISO(rawDate)
    if (!isValid(date)) return 'Invalid date'

    if (isToday(date)) {
      return event.start?.dateTime ? `Today, ${format(date, 'h:mm a')}` : 'Today'
    } else if (isTomorrow(date)) {
      return event.start?.dateTime ? `Tomorrow, ${format(date, 'h:mm a')}` : 'Tomorrow'
    } else {
      return event.start?.dateTime 
        ? `${format(date, 'MMM dd')}, ${format(date, 'h:mm a')}`
        : format(date, 'MMM dd')
    }
  }

  const upcomingEvents = getUpcomingEvents()

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
        </div>
      </div>

      <div className="p-6">
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {event.summary || 'Untitled Event'}
                  </h3>
                  <div className="flex items-center mt-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatUpcomingEventDate(event)}</span>
                  </div>
                  {event.location && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      📍 {event.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
