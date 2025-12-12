# CareConnect - Healthcare Appointment Management System

A modern, full-featured healthcare appointment management platform built with Next.js 14, enabling patients to register, book appointments, and healthcare administrators to efficiently manage appointments.

## Project Description

CareConnect is a comprehensive healthcare management solution designed to streamline the patient registration and appointment scheduling process. The platform provides an intuitive interface for patients to book appointments with healthcare providers while offering administrators a powerful dashboard to manage, schedule, and track all appointments in real-time.

## Features

### Patient Features
- **User Registration**: Quick initial registration with name, email, and phone number
- **Complete Patient Profile**: Detailed registration form including:
  - Personal information (name, email, phone, birth date, gender, address)
  - Medical information (allergies, current medications, family medical history)
  - Insurance details (provider, policy number)
  - Emergency contact information
  - Primary physician selection
  - Identification document upload
- **Appointment Booking**: Schedule appointments with preferred doctors
- **Appointment Management**: View and track appointment status

### Admin Features
- **Secure Admin Access**: Passkey-protected admin portal
- **Admin Dashboard**: Comprehensive overview with:
  - Total scheduled appointments count
  - Pending appointments count
  - Cancelled appointments count
- **Appointment Management**:
  - View all appointments in a data table
  - Schedule pending appointments
  - Cancel appointments with reason tracking
  - Real-time status updates

### Additional Features
- **File Upload**: Secure document upload for patient identification
- **Form Validation**: Comprehensive validation using Zod schemas
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Error Tracking**: Integrated Sentry monitoring for production issues
- **SMS Notifications**: Twilio integration for appointment reminders (configured)
- **Dark/Light Theme**: Theme switching capability

## Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components built with Radix UI
- **React Hook Form** - Efficient form handling
- **Zod** - Schema validation

### Backend & Database
- **Appwrite** - Backend as a Service (BaaS)
  - Database management
  - File storage
  - User authentication

### UI Components & Libraries
- **Radix UI** - Accessible component primitives
  - Alert Dialog
  - Checkbox
  - Dialog
  - Dropdown Menu
  - Label
  - Popover
  - Radio Group
  - Select
- **TanStack Table** - Powerful table component
- **React Datepicker** - Date selection
- **React Dropzone** - File upload handling
- **React Phone Number Input** - International phone number input
- **Lucide React** - Icon library

### Monitoring & Tools
- **Sentry** - Error tracking and performance monitoring
- **Twilio** - SMS notification service
- **ESLint & Prettier** - Code quality and formatting

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Appwrite Account** - [Sign up at Appwrite](https://appwrite.io/)
- **Sentry Account** (optional) - For error monitoring
- **Twilio Account** (optional) - For SMS notifications

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd care-connect
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up Appwrite

1. Create an Appwrite project
2. Create a database with the following collections:
   - **Patients Collection** - Store patient information
   - **Doctors Collection** - Store doctor information
   - **Appointments Collection** - Store appointment data
3. Create a storage bucket for file uploads
4. Note down your:
   - Project ID
   - Database ID
   - Collection IDs
   - Bucket ID
   - API Endpoint
   - API Key

### 4. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_API_KEY=your_api_key
NEXT_PUBLIC_BUCKET_ID=your_bucket_id
DATABASE_ID=your_database_id
PATIENT_COLLECTION_ID=your_patient_collection_id
DOCTOR_COLLECTION_ID=your_doctor_collection_id
APPOINTMENT_COLLECTION_ID=your_appointment_collection_id

# Admin Access
NEXT_PUBLIC_ADMIN_PASSKEY=your_secure_passkey

# Sentry (Optional)
SENTRY_AUTH_TOKEN=your_sentry_token

# Twilio (Optional - for SMS)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## How to Run This Project

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
care-connect/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard
│   ├── api/                      # API routes
│   ├── patients/                 # Patient routes
│   │   └── [userId]/
│   │       ├── register/         # Patient registration
│   │       └── new-appointment/  # Appointment booking
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── forms/                    # Form components
│   │   ├── PatientForm.tsx       # Initial patient form
│   │   ├── RegisterForm.tsx      # Full registration form
│   │   └── AppointmentForm.tsx   # Appointment booking form
│   ├── table/                    # Table components
│   │   ├── columns.tsx           # Table column definitions
│   │   └── DataTable.tsx         # Data table component
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── AppointmentModal.tsx      # Appointment management modal
│   ├── FileUploader.tsx          # File upload component
│   ├── PasskeyModal.tsx          # Admin authentication modal
│   ├── StatCard.tsx              # Statistics card component
│   └── StatusBadge.tsx           # Appointment status badge
├── lib/                          # Utility functions
│   ├── actions/                  # Server actions
│   │   ├── patient.actions.ts    # Patient-related actions
│   │   └── appointment.action.ts # Appointment-related actions
│   ├── validation.ts             # Zod validation schemas
│   └── utils.ts                  # Helper functions
├── constants/                    # Constants and configuration
│   └── index.ts                  # App constants
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
│   └── assets/                   # Images and icons
├── .env                          # Environment variables
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Key Pages

### Patient Flow
1. **Home Page** (`/`) - Initial patient registration
2. **Registration Page** (`/patients/[userId]/register`) - Complete patient profile
3. **New Appointment** (`/patients/[userId]/new-appointment`) - Book an appointment
4. **Success Page** (`/patients/[userId]/new-appointment/success`) - Confirmation

### Admin Flow
1. **Admin Dashboard** (`/admin`) - Manage all appointments
   - View statistics
   - Schedule appointments
   - Cancel appointments
   - Access via passkey (`/?admin=true`)

## Environment Setup Notes

- The admin passkey is set in the environment variables
- Appwrite handles all backend operations (database, storage, authentication)
- Sentry is configured for error tracking in production
- Make sure all collection IDs in Appwrite match your `.env` configuration

## License

This project is private and proprietary.

## Support

For issues and questions, please contact the development team.

---

**Built with ❤️ using Next.js and Appwrite**
