# Just Mobile Security Dashboard

A modern, responsive security dashboard built with Next.js, TypeScript, and Tailwind CSS for monitoring mobile security tests and watch services details and vulnerabilities.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm
- **Icons**: Lucide React
- **Charts**: Recharts

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20 or higher)
- **pnpm** (recommended) or npm
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone <https://github.com/Lucase1840/Just-Mobile-Security-Dashboard>
cd Just-Mobile-Security-Dashboard
```

### 2. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add the following environment variables:

````env
# API Configuration

NEXT_PUBLIC_BASE_API_ROUTE=http://localhost:3000

NEXT_PUBLIC_MOCK_API_DELAY=500

Note: If no value is set for NEXT_PUBLIC_MOCK_API_DELAY the default value is 500

### 4. Run the Development Server

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
````

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 4. Test credentials

Login with the following credentials:

- **Username:** admin

- **Password:** admin

In this early stage of the app, a logout Button is missing, so delete de app cookies to reset
the user rol to none.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── molecules/         # Small component combinations
│   ├── organisms/         # Complex component combinations
│   └── ui/               # Base UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── types/                # TypeScript type definitions
└── middleware.ts         # Next.js middleware
```

## Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

## API Endpoints

The application includes the following API routes:

- `POST /api/login` - User authentication
- `GET /api/services` - Fetch all services
- `GET /api/services/[serviceId]` - Fetch service details

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
