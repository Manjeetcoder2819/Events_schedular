'use client'

import { signIn } from 'next-auth/react'
import { Calendar, Clock, Bell, User } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Scheduler</h1>
          <p className="text-gray-600">Manage your Google Calendar events seamlessly</p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Calendar Integration</h3>
              <p className="text-sm text-gray-600">Connect with your Google Calendar</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Event Management</h3>
              <p className="text-sm text-gray-600">Create, update, and delete events</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Smart Reminders</h3>
              <p className="text-sm text-gray-600">Never miss an important event</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => signIn('google')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <User className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By signing in, you agree to our terms and privacy policy
        </p>
      </div>
    </div>
  )
}