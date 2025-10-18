# ProductHub - Product Management SystemThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A modern, enterprise-grade product management application built with Next.js 15, Redux Toolkit, and Tailwind CSS.## Getting Started

## FeaturesFirst, run the development server:

- **Authentication**: Secure JWT-based authentication```bash

- **Product Management**: Full CRUD operations for productsnpm run dev

- **Real-time Search**: Instant search functionality with debouncing# or

- **Pagination**: Efficient data loading with pagination supportyarn dev

- **Category Management**: Organize products by categories# or

- **Responsive Design**: Mobile-first, fully responsive UIpnpm dev

- **SEO Optimized**: Built-in SEO best practices with metadata# or

- **Type-Safe**: Full TypeScript supportbun dev

- **State Management**: Redux Toolkit for predictable state management```

- **Modern UI**: Polished interface with custom color palette

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Framework**: Next.js 15 (App Router)

- **UI Library**: React 19This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **State Management**: Redux Toolkit

- **Styling**: Tailwind CSS 4## Learn More

- **Language**: TypeScript

- **Validation**: Client-side form validationTo learn more about Next.js, take a look at the following resources:

- **API Integration**: RESTful API integration

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## 📦 Installation- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

1. Clone the repository:You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

````bash

git clone <repository-url>## Deploy on Vercel

cd product-management

```The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



2. Install dependencies:Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```bash
npm install
````

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://api.bitechx.com
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
product-management/
├── app/                      # Next.js app directory
│   ├── login/               # Authentication pages
│   ├── products/            # Product pages
│   │   ├── [slug]/         # Dynamic product routes
│   │   │   ├── edit/       # Edit product page
│   │   │   └── page.tsx    # Product detail page
│   │   ├── create/         # Create product page
│   │   └── page.tsx        # Products listing page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components
│   ├── products/           # Product-specific components
│   └── ui/                 # Reusable UI components
├── lib/                    # Utility libraries
│   ├── api/               # API client and services
│   ├── redux/             # Redux store and slices
│   └── utils/             # Utility functions
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 🎨 Color Palette

- **Mindaro**: #c5d86d (Light green accent)
- **Licorice**: #261c15 (Dark text)
- **Baby Powder**: #f7f7f2 (Background)
- **Beige**: #e4e6c3 (Secondary background)
- **Giants Orange**: #f05d23 (Primary accent)

## 🔑 Key Features

### Authentication

- Email-based login with JWT tokens
- Persistent authentication state with Redux
- Protected routes with middleware

### Product Management

- Create products with images, descriptions, and pricing
- Edit existing products
- Delete products with confirmation dialogs
- View detailed product information
- Category assignment

### Search & Filtering

- Real-time product search by name
- Debounced search input for performance
- Filter products by category
- Pagination for efficient data loading

### User Experience

- Loading states and spinners
- Error handling with user-friendly messages
- Responsive design for all screen sizes
- Smooth transitions and animations
- Accessible UI components

## 📱 Pages

- `/login` - Authentication page
- `/products` - Product listing with search and pagination
- `/products/create` - Create new product
- `/products/[slug]` - Product detail page
- `/products/[slug]/edit` - Edit product page

## 🔐 API Integration

The application integrates with the BitechX API:

- **Base URL**: `https://api.bitechx.com`
- **Authentication**: JWT Bearer token
- **Endpoints**:
  - `POST /auth` - Login
  - `GET /products` - Get all products
  - `GET /products/:slug` - Get product by slug
  - `GET /products/search` - Search products
  - `POST /products` - Create product
  - `PUT /products/:id` - Update product
  - `DELETE /products/:id` - Delete product
  - `GET /categories` - Get all categories

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render

## 📝 Environment Variables

- `NEXT_PUBLIC_API_URL` - API base URL (default: https://api.bitechx.com)

## 🧪 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎯 Best Practices

- **Server Components**: Leveraging React Server Components where possible
- **Client Components**: Using 'use client' directive only when necessary
- **SEO**: Metadata API for optimal search engine indexing
- **Performance**: Image optimization with Next.js Image component
- **Type Safety**: Strict TypeScript configuration
- **Code Quality**: ESLint for code consistency
- **State Management**: Minimal Redux usage, server components for data fetching
- **Validation**: Comprehensive client-side validation
- **Error Handling**: Graceful error handling throughout the app

## 📄 License

This project is part of an assignment for BitechX.

## 👨‍💻 Author

Built with ❤️ for the BitechX assignment
