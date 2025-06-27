'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from './Header'
import EventList from './EventList'
import EventForm from './EventForm'
import UpcomingEvents from './UpcomingEvents'
import { Plus, Calendar } from 'lucide-react'

export default function Dashboard() {
  const { data: session } = useSession()
  const [events, setEvents] = useState([])
  const [showEventForm, setShowEventForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = () => {
    setSelectedEvent(null)
    setShowEventForm(true)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setShowEventForm(true)
  }

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setEvents(events.filter(event => event.id !== eventId))
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const handleEventSaved = () => {
    setShowEventForm(false)
    setSelectedEvent(null)
    fetchEvents()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {session?.user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">Manage your calendar events efficiently</p>
            </div>
            <button
              onClick={handleCreateEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Event</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">All Events</h2>
                </div>
              </div>
              <EventList
                events={events}
                loading={loading}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />
            </div>
          </div>

          <div className="space-y-6">
            <UpcomingEvents events={events} />
          </div>
        </div>
      </main>

      {showEventForm && (
        <EventForm
          event={selectedEvent}
          onSave={handleEventSaved}
          onCancel={() => setShowEventForm(false)}
        />
      )}
    </div>
  )
}