# CareConnect - Healthcare Appointment Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Appwrite](https://img.shields.io/badge/Appwrite-BaaS-F02E65?style=for-the-badge&logo=appwrite)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

A modern, full-featured healthcare appointment management platform with secure authentication, role-based access control, and comprehensive patient management.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Authentication System](#-authentication-system)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [Security](#-security)
- [Support](#-support)
- [License](#-license)

---

## 🎯 Overview

**CareConnect** is a comprehensive healthcare management solution designed to streamline the patient registration and appointment scheduling process. The platform provides an intuitive interface for patients to create accounts, book appointments with healthcare providers, and manage their medical information, while offering administrators a powerful dashboard to manage, schedule, and track all appointments in real-time.

### Key Highlights

- 🔐 **Secure Authentication** - Complete auth system with email verification and password reset
- 👥 **Role-Based Access** - Separate patient and admin portals with route protection
- 📱 **Responsive Design** - Fully mobile-friendly interface
- 🔔 **SMS Notifications** - Automated appointment reminders via Twilio
- 📊 **Real-time Dashboard** - Admin analytics and appointment management
- 🗂️ **Document Management** - Secure file uploads for patient records
- 🌙 **Dark Theme** - Modern dark mode interface
- 🚀 **Production Ready** - Optimized for deployment

---

## ✨ Features

### 🏥 Patient Features

#### Authentication & Account Management
- **User Registration** - Secure signup with email and password
- **Email Verification** - Automated email verification flow
- **Password Management** - Forgot password and reset functionality
- **Session Management** - Secure HTTP-only cookie sessions (7-day duration)
- **Profile Completion** - Multi-step onboarding process

#### Medical Profile
- **Personal Information** - Name, email, phone, birth date, gender, address, occupation
- **Medical History** - Allergies, current medications, family medical history, past medical history
- **Insurance Details** - Provider name and policy number
- **Emergency Contacts** - Emergency contact name and phone number
- **Primary Physician** - Select from available doctors
- **ID Verification** - Upload identification documents (license, passport, etc.)

#### Appointment Management
- **Book Appointments** - Schedule appointments with preferred doctors
- **View Status** - Track appointment status (scheduled, pending, cancelled)
- **Appointment Details** - View appointment date, time, doctor, and reason
- **Success Confirmation** - Receive booking confirmation with appointment details

### 👨‍💼 Admin Features

#### Secure Admin Access
- **Admin Authentication** - Separate login with role verification
- **Protected Dashboard** - Route protection via middleware
- **Logout Functionality** - Secure session termination

#### Dashboard & Analytics
- **Statistics Overview** - Real-time counts for:
  - Total scheduled appointments
  - Pending appointments
  - Cancelled appointments
- **Appointment Table** - Comprehensive data table with:
  - Patient information
  - Appointment details
  - Status indicators
  - Action buttons

#### Appointment Management
- **Schedule Appointments** - Approve and schedule pending appointments
- **Cancel Appointments** - Cancel with reason tracking
- **Update Status** - Real-time status updates
- **Search & Filter** - Find appointments quickly

### 🔧 Additional Features

- **Form Validation** - Comprehensive validation using Zod schemas
- **Error Handling** - User-friendly error messages
- **Loading States** - Smooth loading indicators
- **Responsive Tables** - Mobile-optimized data tables
- **File Upload** - Drag-and-drop document upload
- **Theme System** - Dark theme with next-themes
- **Type Safety** - Full TypeScript coverage

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality UI components
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - Schema validation

### Backend & Database
- **[Appwrite](https://appwrite.io/)** - Backend as a Service (BaaS)
  - User authentication with sessions
  - Database management
  - File storage
  - User preferences and roles

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[TanStack Table](https://tanstack.com/table)** - Powerful table component
- **[React Datepicker](https://reactdatepicker.com/)** - Date selection
- **[React Dropzone](https://react-dropzone.js.org/)** - File upload handling
- **[React Phone Number Input](https://www.npmjs.com/package/react-phone-number-input)** - International phone input
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Monitoring & Tools
- **[Twilio](https://www.twilio.com/)** - SMS notification service
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** - Code quality and formatting

---

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** / **yarn** / **pnpm** - Package manager
- **Appwrite Account** - [Sign up](https://appwrite.io/) (Free tier available)
- **SMTP Service** (for emails) - Gmail, SendGrid, AWS SES, or similar
- **Twilio Account** (optional) - [Sign up](https://www.twilio.com/) for SMS notifications

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/care-connect.git
cd care-connect
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Appwrite

#### Create Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io/)
2. Click "Create Project"
3. Name it "CareConnect" (or your preferred name)
4. Note down your **Project ID**

#### Create Database

1. Navigate to **Databases** → **Create Database**
2. Name it "careconnect-db"
3. Note down your **Database ID**

#### Create Collections

Create the following collections with these attributes:

**Patients Collection:**
- `userId` (String, required)
- `name` (String, required)
- `email` (Email, required)
- `phone` (String, required)
- `birthDate` (DateTime, required)
- `gender` (String, required)
- `address` (String, required)
- `occupation` (String, required)
- `emergencyContactName` (String, required)
- `emergencyContactNumber` (String, required)
- `primaryPhysician` (String, required)
- `insuranceProvider` (String, required)
- `insurancePolicyNumber` (String, required)
- `allergies` (String, optional)
- `currentMedication` (String, optional)
- `familyMedicalHistory` (String, optional)
- `pastMedicalHistory` (String, optional)
- `identificationType` (String, optional)
- `identificationNumber` (String, optional)
- `identificationDocumentId` (String, optional)
- `identificationDocumentUrl` (String, optional)
- `privacyConsent` (Boolean, required)

**Doctors Collection:**
- `name` (String, required)
- `image` (String, required)

**Appointments Collection:**
- `patient` (Relationship to Patients)
- `schedule` (DateTime, required)
- `status` (String, required)
- `primaryPhysician` (String, required)
- `reason` (String, required)
- `note` (String, optional)
- `userId` (String, required)
- `cancellationReason` (String, optional)

#### Create Storage Bucket

1. Navigate to **Storage** → **Create Bucket**
2. Name it "patient-documents"
3. Set permissions as needed
4. Note down your **Bucket ID**

#### Enable Authentication

1. Navigate to **Auth** → **Settings**
2. Enable **Email/Password** authentication
3. Configure **Session Length** (default: 7 days)

#### Configure SMTP (Critical!)

1. Navigate to **Settings** → **SMTP**
2. Configure your SMTP provider:
   - **Gmail**: Use App Password (not regular password)
   - **SendGrid**: Use API key
   - **AWS SES**: Configure credentials
3. Test email delivery

#### Create API Key

1. Navigate to **Overview** → **API Keys**
2. Create a new API key with appropriate permissions
3. Note down your **API Key**

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Appwrite Configuration
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_BUCKET_ID=your_bucket_id_here
DATABASE_ID=your_database_id_here
PATIENT_COLLECTION_ID=your_patient_collection_id_here
DOCTOR_COLLECTION_ID=your_doctor_collection_id_here
APPOINTMENT_COLLECTION_ID=your_appointment_collection_id_here

# Application URL (for email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Access (Legacy - will be replaced by proper auth)
NEXT_PUBLIC_ADMIN_PASSKEY=123456

# Twilio (Optional - for SMS notifications)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

> ⚠️ **Important**: Never commit your `.env` file to version control!

### 5. Create First Admin User

Since authentication is now mandatory, you need to manually create your first admin user:

1. Go to **Appwrite Console** → **Auth** → **Users**
2. Click **"Add User"** → **"Create User"**
3. Fill in:
   - **Email**: admin@careconnect.com (or your preferred email)
   - **Password**: Choose a strong password
   - **Name**: Admin User
4. Click **Create**
5. Click on the newly created user
6. Go to **"Preferences"** tab
7. Add this JSON:

```json
{
  "role": "admin",
  "phone": "+1234567890",
  "emailVerified": true,
  "onboardingComplete": true
}
```

8. Save the preferences

### 6. Add Sample Doctors (Optional)

Navigate to your Doctors collection and add some sample doctors:

```json
{
  "name": "Dr. John Doe",
  "image": "/assets/images/dr-john.png"
}
```

### 7. Run the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Test the Application

#### Patient Flow:
1. Click **"Get Started"** on the home page
2. Fill in signup form (name, email, phone, password)
3. Check your email for verification link (if SMTP is configured)
4. Login with your credentials
5. Complete patient registration (medical info, insurance, etc.)
6. Book an appointment

#### Admin Flow:
1. Click **"Admin Login"** on the home page
2. Check **"Login as Admin"** checkbox
3. Enter admin credentials
4. Access admin dashboard
5. Manage appointments

---

## 🔐 Authentication System

### Features

- **Email/Password Authentication** - Secure user registration and login
- **Email Verification** - Automated verification emails with magic links
- **Password Reset** - Forgot password flow with secure reset links
- **Session Management** - HTTP-only cookies with 7-day expiration
- **Role-Based Access Control** - Separate patient and admin roles
- **Route Protection** - Middleware protecting `/admin` and `/patients` routes
- **Onboarding State** - Track user registration completion

### Authentication Flow

```
┌─────────────┐
│   Signup    │ → Create account with email/password
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Verify    │ → Email verification (optional but recommended)
│   Email     │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Login     │ → Authenticate and create session
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Complete   │ → Fill medical information
│ Registration│
└──────┬──────┘
       │
       ↓
┌─────────────┐
│    Book     │ → Create appointments
│ Appointment │
└─────────────┘
```

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Session Security

- HTTP-only cookies (cannot be accessed via JavaScript)
- Secure flag in production (HTTPS only)
- 7-day expiration
- Automatic refresh on activity

---

## 📁 Project Structure

```
care-connect/
├── app/                              # Next.js App Router
│   ├── admin/                        # Admin dashboard
│   │   └── page.tsx                  # Admin dashboard page
│   ├── api/                          # API routes
│   ├── auth/                         # Authentication pages
│   │   ├── layout.tsx                # Auth layout
│   │   ├── login/                    # Login page
│   │   ├── signup/                   # Signup page
│   │   ├── forgot-password/          # Forgot password page
│   │   ├── reset-password/           # Reset password page
│   │   └── verify-email/             # Email verification page
│   ├── patients/                     # Patient routes
│   │   └── [userId]/
│   │       ├── register/             # Patient registration
│   │       └── new-appointment/      # Appointment booking
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout with providers
│   └── page.tsx                      # Home/landing page
│
├── components/                       # React components
│   ├── forms/                        # Form components
│   │   ├── LoginForm.tsx             # Login form
│   │   ├── SignupForm.tsx            # Signup form
│   │   ├── ForgotPasswordForm.tsx    # Forgot password form
│   │   ├── ResetPasswordForm.tsx     # Reset password form
│   │   ├── RegisterForm.tsx          # Patient registration form
│   │   └── AppointmentForm.tsx       # Appointment booking form
│   ├── table/                        # Table components
│   │   ├── columns.tsx               # Table column definitions
│   │   └── DataTable.tsx             # Data table component
│   ├── ui/                           # shadcn/ui components
│   ├── AppointmentModal.tsx          # Appointment management modal
│   ├── FileUploader.tsx              # File upload component
│   ├── LogoutButton.tsx              # Logout button
│   ├── StatCard.tsx                  # Statistics card
│   ├── StatusBadge.tsx               # Status badge
│   └── theme-provider.tsx            # Theme provider
│
├── context/                          # React Context
│   └── AuthContext.tsx               # Authentication context
│
├── lib/                              # Utility functions
│   ├── actions/                      # Server actions
│   │   ├── auth.actions.ts           # Authentication actions
│   │   ├── patient.actions.ts        # Patient actions
│   │   └── appointment.action.ts     # Appointment actions
│   ├── auth/                         # Auth utilities
│   │   ├── server.ts                 # Server-side auth helpers
│   │   └── session.ts                # Session management
│   ├── appwrite.client.ts            # Browser Appwrite client
│   ├── appwrite.config.ts            # Server Appwrite client
│   ├── validation.ts                 # Zod validation schemas
│   └── utils.ts                      # Helper functions
│
├── providers/                        # Context providers
│   └── AuthProvider.tsx              # Authentication provider
│
├── constants/                        # Constants and configuration
│   └── index.ts                      # App constants
│
├── types/                            # TypeScript type definitions
│   ├── appwrite.types.ts             # Appwrite types
│   └── index.d.ts                    # Global types
│
├── public/                           # Static assets
│   └── assets/                       # Images and icons
│
├── middleware.ts                     # Next.js middleware (route protection)
├── .env                              # Environment variables (not in git)
├── .env.example                      # Environment variables template
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

---

## 🌍 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_ENDPOINT` | Appwrite API endpoint | `https://cloud.appwrite.io/v1` |
| `NEXT_PUBLIC_PROJECT_ID` | Appwrite project ID | `6756abad000e1f266e54` |
| `NEXT_PUBLIC_API_KEY` | Appwrite API key | `standard_xxx...` |
| `NEXT_PUBLIC_BUCKET_ID` | Appwrite storage bucket ID | `6756b14e0022e3a843b1` |
| `NEXT_PUBLIC_APP_URL` | Application URL for email links | `http://localhost:3000` |
| `DATABASE_ID` | Appwrite database ID | `6756ac9b00170b55116d` |
| `PATIENT_COLLECTION_ID` | Patients collection ID | `67595c6d000926d9237b` |
| `DOCTOR_COLLECTION_ID` | Doctors collection ID | `6756b0be002bebc4a3fc` |
| `APPOINTMENT_COLLECTION_ID` | Appointments collection ID | `6756b0fe0028e4f4cb27` |

### Optional Variables

| Variable | Description | Required For |
|----------|-------------|--------------|
| `TWILIO_ACCOUNT_SID` | Twilio account SID | SMS notifications |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | SMS notifications |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | SMS notifications |

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables
6. Deploy

### Environment Variables for Production

Make sure to update:
- `NEXT_PUBLIC_APP_URL` to your production domain
- Configure production SMTP settings

### Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test email verification flow
- [ ] Test password reset flow
- [ ] Configure CORS in Appwrite for your domain
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificate
- [ ] Test admin and patient flows

---

## 🧪 Testing

### Manual Testing Checklist

#### Patient Flow
- [ ] Signup with valid credentials
- [ ] Receive verification email
- [ ] Verify email address
- [ ] Login with credentials
- [ ] Complete patient registration
- [ ] Upload identification document
- [ ] Book an appointment
- [ ] View appointment confirmation
- [ ] Logout successfully

#### Admin Flow
- [ ] Login as admin
- [ ] View dashboard statistics
- [ ] View appointments table
- [ ] Schedule pending appointment
- [ ] Cancel appointment with reason
- [ ] Search/filter appointments
- [ ] Logout successfully

#### Authentication
- [ ] Signup with duplicate email (should fail)
- [ ] Login with wrong password (should fail)
- [ ] Access protected route without auth (should redirect)
- [ ] Patient cannot access admin routes
- [ ] Session persists across page refreshes
- [ ] Forgot password flow works
- [ ] Email verification link works
- [ ] Password reset link works

#### Edge Cases
- [ ] Form validation errors display correctly
- [ ] Loading states show during async operations
- [ ] Error messages are user-friendly
- [ ] Mobile responsiveness works
- [ ] Theme switching works (if enabled)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Coding Guidelines

- Follow existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

---

## 🔒 Security

### Reporting Security Issues

If you discover a security vulnerability, please email security@careconnect.com instead of using the issue tracker.

### Security Best Practices

- All passwords are hashed using Appwrite's secure hashing
- Sessions use HTTP-only cookies
- HTTPS enforced in production
- Input validation on all forms
- SQL injection prevention via Appwrite
- XSS protection via React
- CSRF protection via Next.js
- Rate limiting on authentication endpoints
- File upload validation and sanitization

### Data Privacy

- Patient data is encrypted at rest
- Secure file storage in Appwrite
- HIPAA compliance considerations (consult legal team)
- Regular security audits recommended
- Data backup strategy in place

---

## 📞 Support

### Getting Help

- **Documentation**: Read this README and inline code comments
- **Issues**: Check [GitHub Issues](https://github.com/yourusername/care-connect/issues)
- **Discussions**: Join [GitHub Discussions](https://github.com/yourusername/care-connect/discussions)
- **Email**: support@careconnect.com

### Common Issues

**Issue**: Environment variables not loading
- **Solution**: Restart dev server after changing `.env`

**Issue**: Email verification not working
- **Solution**: Check Appwrite SMTP configuration and test email delivery

**Issue**: Admin login not working
- **Solution**: Verify admin user has `"role": "admin"` in Appwrite user preferences

**Issue**: Hydration errors
- **Solution**: Clear `.next` folder and rebuild (`rm -rf .next && npm run dev`)

---

## 📄 License

This project is **proprietary and confidential**. Unauthorized copying, distribution, or use is strictly prohibited.

© 2024 CareConnect. All rights reserved.

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:

- [Next.js](https://nextjs.org/) - The React Framework for the Web
- [Appwrite](https://appwrite.io/) - Secure Open-Source Backend Server
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components

---

## 📸 Screenshots

### Home Page
![Home Page](./docs/screenshots/home.png)

### Patient Registration
![Patient Registration](./docs/screenshots/register.png)

### Admin Dashboard
![Admin Dashboard](./docs/screenshots/admin.png)

### Appointment Booking
![Appointment Booking](./docs/screenshots/appointment.png)

---

## 🗺️ Roadmap

- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] Video consultation integration
- [ ] Prescription management
- [ ] Lab results integration
- [ ] Insurance claim processing
- [ ] Advanced analytics
- [ ] Automated appointment reminders
- [ ] Patient portal enhancements
- [ ] Telemedicine features

---

**Built with ❤️ by the CareConnect Team**

[⬆ Back to Top](#careconnect---healthcare-appointment-management-system)
