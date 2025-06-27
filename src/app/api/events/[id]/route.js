import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabaseClient'

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const eventData = await request.json()
    const { id } = params

    // Validate input
    const start = new Date(eventData.start.dateTime || eventData.start.date)
    const end = new Date(eventData.end.dateTime || eventData.end.date)

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return NextResponse.json({ error: 'Invalid or inconsistent dates' }, { status: 400 })
    }

    const { error } = await supabase
      .from('event')
      .update({
        summary: eventData.summary,
        description: eventData.description || '',
        location: eventData.location || '',
        start: start.toISOString(),
        end: end.toISOString(),
        all_day: !eventData.start.dateTime,
      })
      .eq('id', id)
      .eq('user_email', session.user.email) // security: only allow user's events

    if (error) throw error

    return NextResponse.json({ message: 'Event updated successfully' })
  } catch (error) {
    console.error('Error in PUT /api/events/[id]:', error)
    return NextResponse.json({ error: 'Failed to update event', details: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    const { error } = await supabase
      .from('event')
      .delete()
      .eq('id', id)
      .eq('user_email', session.user.email) // security: only allow user's events

    if (error) throw error

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/events/[id]:', error)
    return NextResponse.json({ error: 'Failed to delete event', details: error.message }, { status: 500 })
  }
}
