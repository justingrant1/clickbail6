# Clickbail - Bail Bonds Management Software

Clickbail is a comprehensive bail bonds management platform designed to streamline operations for bail bond companies. This application helps track defendants with GPS monitoring, manage court dates, automate compliance paperwork, and grow your business with cutting-edge technology.

## Features

- Real-time GPS tracking
- Court date management
- Client management
- Automated compliance paperwork
- E-signatures
- Payment processing with Stripe
- User authentication with Supabase
- Secure database storage with Supabase
- Responsive dashboard interface

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payments**: Stripe
- **Styling**: Tailwind CSS with Shadcn UI components

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/clickbail.git
   cd clickbail
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` and fill in your Supabase and Stripe credentials:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Next.js app router pages and API routes
- `/components`: React components
- `/lib`: Utility functions and service clients
- `/public`: Static assets
- `/styles`: Global styles

## Authentication

Authentication is handled through Supabase Auth. Users can sign up, sign in, and reset passwords.

## Payments

Payment processing is handled through Stripe. The application offers a 7-day free trial and then transitions to a subscription model.

## Database

The application uses Supabase PostgreSQL as its database. It stores information about clients, bonds, court dates, and user data.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
