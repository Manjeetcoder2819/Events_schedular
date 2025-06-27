import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabaseClient'

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeMin = searchParams.get('timeMin')
    const timeMax = searchParams.get('timeMax')

    let query = supabase
      .from('event')
      .select('*')
      .eq('user_email', session.user.email)
      .order('start', { ascending: true })

    if (timeMin) {
      query = query.gte('start', timeMin)
    }
    if (timeMax) {
      query = query.lte('end', timeMax)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ events: data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const eventData = await request.json()

    // Minimal validation
    if (
      !eventData.summary ||
      (!eventData.start?.dateTime && !eventData.start?.date) ||
      (!eventData.end?.dateTime && !eventData.end?.date)
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const start = new Date(eventData.start.dateTime || eventData.start.date)
    const end = new Date(eventData.end.dateTime || eventData.end.date)

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return NextResponse.json({ error: 'Invalid or inconsistent dates' }, { status: 400 })
    }

    const insertData = {
      summary: eventData.summary,
      description: eventData.description || '',
      location: eventData.location || '',
      start: start.toISOString(),
      end: end.toISOString(),
      all_day: !eventData.start.dateTime,
      user_email: session.user.email,
    }

    const { error } = await supabase.from('event').insert([insertData])

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Event created successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in POST /api/events:', error)
    return NextResponse.json(
      { error: 'Failed to create event', details: error.message },
      { status: 500 }
    )
  }
}
