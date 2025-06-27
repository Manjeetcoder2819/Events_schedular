'use client'

import { format } from 'date-fns'
import { Calendar, Clock, MapPin, Edit, Trash2 } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

export default function EventList({ events, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="p-8 text-center">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-600">Create your first event to get started</p>
      </div>
    )
  }

  const formatEventDate = (event) => {
    const startRaw = event.start?.dateTime || event.start?.date || event.start
    const endRaw = event.end?.dateTime || event.end?.date || event.end

    if (!startRaw || !endRaw) return 'Date unavailable'

    const start = new Date(startRaw)
    const end = new Date(endRaw)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'Invalid date'

    const isAllDay = event.all_day || !!event.start?.date

    if (isAllDay) {
      return format(start, 'MMM dd, yyyy')
    } else {
      return `${format(start, 'MMM dd, yyyy')} • ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`
    }
  }

  return (
    <div className="divide-y divide-gray-200">
      {events.map((event) => (
        <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {event.summary || 'Untitled Event'}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{formatEventDate(event)}</span>
                </div>

                {event.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                )}

                {event.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {event.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(event)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit event"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
