# MedFlow EMR - Healthcare Management Platform

A comprehensive Electronic Medical Record (EMR) platform built with React, TypeScript, Tailwind CSS, and Vite. Features 11 core healthcare modules with professional medical design system.

## 🏥 Features

- **11 Core EMR Modules:**
  - Appointment Scheduling
  - Patient Intake Forms
  - Patient Portal
  - Secure Messaging
  - Billing and Invoicing
  - e-Prescription
  - Telemedicine
  - Clinical Notes with AI enhancements
  - File Management with OCR workflow
  - Dashboard Analytics
  - User Management

- **Technology Stack:**
  - React 18 with TypeScript
  - Vite for fast development and building
  - Tailwind CSS v4 with healthcare-optimized design system
  - Redux Toolkit for state management
  - Radix UI components for accessibility
  - React Hook Form with Zod validation

## 🚀 Quick Start

### Prerequisites

Make sure you have Node.js 18.17.0 or higher installed:

```bash
node --version
```

### Installation

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory:**
   ```bash
   cd medflow-emr
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to: `http://localhost:3000`

### Demo Login Credentials

The application includes demo authentication with the following test accounts:

- **Provider:** `provider@medflow.com` / `Provider123!`
- **Staff:** `staff@medflow.com` / `Staff123!`
- **Patient:** `patient@medflow.com` / `Patient123!`
- **Admin:** `admin@medflow.com` / `Admin123!`

## 🛠️ Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

The application uses a healthcare-optimized design system with:

- **Medical Blue Theme:** Professional healthcare color palette
- **Accessibility First:** WCAG compliant components and color contrasts
- **Responsive Design:** Mobile-first approach with tablet and desktop optimizations
- **Typography:** Inter font family optimized for medical data readability
- **Custom CSS Properties:** Extensive variable system for consistent theming

## 📁 Project Structure

```
medflow-emr/
├── src/
│   └── main.tsx              # Application entry point
├── components/
│   ├── auth/                 # Authentication components
│   ├── layouts/              # Layout components
│   ├── modules/              # EMR module components
│   └── ui/                   # Reusable UI components (Shadcn/ui)
├── contexts/
│   └── AuthContext.tsx       # Authentication context
├── styles/
│   └── globals.css           # Global styles and Tailwind configuration
├── types/
│   └── index.ts              # TypeScript type definitions
└── App.tsx                   # Main application component
```

## 🔧 Troubleshooting

### Common Issues and Solutions

1. **Tailwind styles not loading:**
   - Make sure you're running `npm run dev` (not Next.js commands)
   - Check that `styles/globals.css` is properly imported in `src/main.tsx`
   - Verify Tailwind config matches your file structure

2. **Port already in use:**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   # Or use a different port
   npm run dev -- --port 3001
   ```

3. **Node modules issues:**
   ```bash
   # Clear npm cache and reinstall
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

4. **TypeScript errors:**
   ```bash
   # Run type checking
   npm run type-check
   ```

### Performance Tips

- Use `npm run build` to create optimized production builds
- Enable browser dev tools for debugging
- Check Network tab for slow-loading resources

## 🔒 Security Features

- Content Security Policy headers
- XSS protection
- CSRF token handling (ready for backend integration)
- Secure authentication context
- Input validation with Zod schemas

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Need Help?** Check the troubleshooting section above or refer to the component documentation in the `components/` directory.