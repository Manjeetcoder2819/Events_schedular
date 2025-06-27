# Event Scheduler with Google Calendar

A modern Next.js application that integrates with Google Calendar to provide seamless event management capabilities.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 📅 **Full Calendar Integration** - Create, read, update, and delete events
- ⏰ **Smart Reminders** - View upcoming events at a glance
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: NextAuth.js with Google Provider
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API Integration**: Google Calendar API
- **Date Handling**: date-fns

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd event-scheduler
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Calendar API
4. Create OAuth 2.0 credentials:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google Calendar API
GOOGLE_CALENDAR_API_KEY=your_google_calendar_api_key_here
```

### 5. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

### 6. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
event-scheduler/
├── public/
├── src/
│   └── app/
│       ├── api/
│       │   ├── auth/
│       │   │   └── [...nextauth]/
│       │   │       └── route.js
│       │   └── events/
│       │       ├── route.js
│       │       └── [id]/
│       │           └── route.js
│       ├── components/
│       │   ├── AuthProvider.js
│       │   ├── Dashboard.js
│       │   ├── EventForm.js
│       │   ├── EventList.js
│       │   ├── Header.js
│       │   ├── LoadingSpinner.js
│       │   ├── LoginPage.js
│       │   └── UpcomingEvents.js
│       ├── lib/
│       │   └── calendar.js
│       ├── globals.css
│       ├── layout.js
│       └── page.js
├── .env.local
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## Key Components

### Authentication
- **AuthProvider**: Wraps the app with NextAuth session provider
- **LoginPage**: Google OAuth login interface

### Dashboard
- **Dashboard**: Main application interface
- **Header**: Navigation bar with user info and logout
- **EventList**: Display all calendar events
- **EventForm**: Create/edit event modal
- **UpcomingEvents**: Sidebar showing upcoming events

### API Routes
- **GET /api/events**: Fetch calendar events
- **POST /api/events**: Create new event
- **PUT /api/events/[id]**: Update existing event
- **DELETE /api/events/[id]**: Delete event

## API Integration

The application uses the Google Calendar API v3 with the following scopes:
- `openid email profile` - Basic user information
- `https://www.googleapis.com/auth/calendar` - Full calendar access

## Features in Detail

### Event Management
- Create events with title, description, location, date/time
- Support for all-day events
- Edit existing events
- Delete events with confirmation

### Dashboard
- Clean overview of all events
- Upcoming events sidebar
- Responsive design for all screen sizes

### Authentication Flow
1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. After approval, returned to dashboard
4. Access token stored for API calls

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your production URL
5. Update Google OAuth redirect URI

### Other Platforms
Ensure you:
- Set all environment variables
- Update `NEXTAUTH_URL` to your domain
- Update Google OAuth redirect URIs

## Security Considerations

- Never expose API keys in client-side code
- Use HTTPS in production
- Keep dependencies updated
- Review Google Calendar API permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the GitHub issues
2. Review Google Calendar API documentation
3. Check NextAuth.js documentation
