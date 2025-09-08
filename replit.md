# Loyalty Program Quiz Application

## Overview

This is a React-based quiz application built with Express.js backend that evaluates the effectiveness of loyalty programs. The application features a simple 10-question yes/no quiz format designed to help cannabis dispensaries and niche retailers assess their loyalty programs and generate leads for consulting services.

## User Preferences

Preferred communication style: Simple, everyday language.
Design style: HighDef Studio branding approach - clean, modern design
Color scheme: #F05E5E (main/coral), #00CECB (supporting/turquoise)
Typography: Lato font for body copy, Roboto Bold for titles, Bold Lato for subheaders
Quiz format: Simple 10-question yes/no format (not overwhelming detailed assessments)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth transitions and interactions
- **State Management**: TanStack Query for server state management

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES Modules (type: "module")
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development Server**: tsx for TypeScript execution

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless
- **ORM**: Drizzle ORM with schema validation using Zod
- **Migrations**: Drizzle Kit for database schema migrations
- **In-Memory Storage**: Fallback MemStorage implementation for development

## Key Components

### Frontend Components
1. **Quiz Component** (`client/src/pages/quiz.tsx`)
   - Interactive quiz interface with multiple choice questions
   - Progress tracking and score calculation
   - Animated transitions between questions
   - Results display with personalized feedback
   - Social sharing functionality

2. **UI Components** (`client/src/components/ui/`)
   - Comprehensive set of accessible components from Shadcn/ui
   - Built on Radix UI primitives for accessibility
   - Consistent styling with Tailwind CSS
   - Custom theming support with CSS variables

3. **Hooks** (`client/src/hooks/`)
   - `use-mobile.tsx`: Responsive design hook for mobile detection
   - `use-toast.ts`: Toast notification management

### Backend Components
1. **Server Setup** (`server/index.ts`)
   - Express server with middleware configuration
   - Request/response logging
   - Error handling middleware
   - Development-specific Vite integration

2. **Storage Interface** (`server/storage.ts`)
   - Abstract storage interface for data operations
   - In-memory implementation for development
   - User management CRUD operations

3. **Database Schema** (`shared/schema.ts`)
   - Drizzle schema definitions
   - Zod validation schemas
   - User model with PostgreSQL UUID primary keys

## Data Flow

1. **Quiz Interaction Flow**:
   - User navigates to quiz page
   - Questions loaded from local data structure
   - User selections tracked in component state
   - Score calculated based on answer points
   - Results displayed with tier-based feedback

2. **API Request Flow**:
   - Frontend makes requests via TanStack Query
   - Custom query functions handle authentication
   - Express server routes process requests
   - Storage interface abstracts data operations
   - Responses sent back with consistent error handling

3. **Development Data Flow**:
   - Vite dev server proxies API requests to Express
   - Hot module replacement for frontend changes
   - tsx provides TypeScript execution for backend

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution
- **drizzle-kit**: Database migration toolkit

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite bundles React application to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `db:push` script

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment setting (development/production)
- **REPL_ID**: Replit-specific environment detection

### Production Deployment
- Static files served from `dist/public`
- Express server runs from bundled `dist/index.js`
- PostgreSQL database via Neon Database
- Session storage in PostgreSQL using connect-pg-simple

### Development Setup
- Vite dev server for frontend with HMR
- tsx for backend TypeScript execution
- Concurrent development servers
- In-memory storage fallback for development

## Recent Changes (January 2025)

### Quiz Format Update
- Simplified from complex 27-item weighted assessment to streamlined 10-question yes/no format
- Updated scoring system: 0-2 (rebuild), 3-5 (foundation), 6-8 (solid), 9-10 (high-performing)
- Removed overwhelming accordion interface in favor of clean card-based questions
- Added email integration for lead capture with tier-specific subject lines

### Design Updates
- Updated color scheme to #F05E5E (main) and #00CECB (supporting)
- Custom progress bar styling with #F05E5E on #D8D8D8 background
- Removed trophy icons from results page
- Streamlined results layout with side-by-side CTA and reset buttons

### Content Updates
- Updated specific questions for cannabis/retail focus (e.g., "on your menu" vs "online")
- Replaced generic CTAs with personalized consultation offerings
- Added automatic email generation with proper subject lines for different score tiers
- Removed footer branding as requested