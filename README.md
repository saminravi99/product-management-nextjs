# ProductHub – Product Management System

**ProductHub** is a full-stack product management application built with **Next.js 15**, **Redux Toolkit**, and **Tailwind CSS**.
It provides a complete, modern interface for managing products, categories, and authentication — designed with scalability, performance, and maintainability in mind.

---

## Overview

ProductHub is an enterprise-grade product management system that allows authenticated users to create, read, update, and delete products efficiently.
It features real-time search, pagination, responsive design, and strong TypeScript type safety.

The application integrates with the **BitechX API** and follows best practices for performance, security, and accessibility.

---

## Key Features

### Core Functionality

- **Authentication:** Secure email-based login with JWT tokens and route protection via middleware.
- **Product Management:** Complete CRUD operations for products with image, price, stock, and category support.
- **Category Management:** Organize products by categories and filter listings accordingly.
- **Search & Filtering:** Real-time debounced search by product name and category-based filtering.
- **Pagination:** Efficient data loading for large product lists.
- **Responsive Design:** Mobile-first UI built with Tailwind CSS.
- **SEO Optimization:** Proper metadata setup with Next.js App Router for improved discoverability.

### Technical Highlights

- **Server Components:** Used where possible for optimal performance and minimal client-side overhead.
- **Dynamic Imports:** Lazy loading of heavy components such as forms and detail views to improve mobile performance.
- **Incremental Static Regeneration (ISR):** Pre-renders product pages with periodic revalidation for a balance of freshness and speed.
- **Strict TypeScript Setup:** Type-safe API interactions with Zod validation for data integrity.
- **Clean Codebase:** Consistent ESLint configuration and atomic component design principles.

---

## Tech Stack

| Category         | Technology                |
| ---------------- | ------------------------- |
| Framework        | Next.js 15 (App Router)   |
| Language         | TypeScript                |
| UI Library       | React 19                  |
| Styling          | Tailwind CSS              |
| State Management | Redux Toolkit             |
| API              | RESTful (BitechX API)     |
| Deployment       | Vercel                    |
| Validation       | Zod (client-side schemas) |

---

## Project Structure

```
producthub/
├── app/
│   ├── login/                 # Authentication pages
│   ├── products/              # Product management routes
│   │   ├── [slug]/            # Dynamic product detail routes
│   │   │   ├── edit/          # Edit product page
│   │   │   └── page.tsx
│   │   ├── create/            # Create new product
│   │   └── page.tsx           # Product listing page
│   └── layout.tsx             # Root layout (header, footer)
│
├── components/
│   ├── auth/                  # Login and authentication components
│   ├── products/              # Product-related UI
│   ├── layout/                # Header, footer, shared layout
│   └── ui/                    # Reusable UI components
│
├── lib/
│   ├── api/                   # API clients and services
│   ├── redux/                 # Store setup and slices
│   └── utils/                 # Helper utilities
│
├── types/                     # TypeScript type definitions
└── public/                    # Static assets
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd producthub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://api.bitechx.com
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**

---

## API Integration

The application communicates with the **BitechX REST API**.

**Base URL:**
`https://api.bitechx.com`

### Endpoints

| Method | Endpoint           | Description                       |
| ------ | ------------------ | --------------------------------- |
| POST   | `/auth`            | Authenticate user                 |
| GET    | `/products`        | Retrieve all products (paginated) |
| GET    | `/products/:slug`  | Retrieve product details          |
| GET    | `/products/search` | Search products by name           |
| POST   | `/products`        | Create a new product              |
| PUT    | `/products/:id`    | Update product details            |
| DELETE | `/products/:id`    | Delete a product                  |
| GET    | `/categories`      | Retrieve all categories           |

All protected endpoints require a valid **JWT** in the `Authorization` header.

---

## Deployment

The application is optimized for deployment on **Vercel**, the native hosting platform for Next.js.
Push to the main branch, and Vercel will automatically build and deploy your application.

### Steps

1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Add environment variables (`NEXT_PUBLIC_API_URL`).
4. Deploy.

Other supported platforms include **Netlify**, **AWS Amplify**, **Railway**, and **Render**.

---

## Performance & Optimization

- Achieved **100/100** Lighthouse performance on desktop.
- Improved mobile scores from 64 to 80+ through dynamic imports and lazy loading.
- Configured **ISR** with smart revalidation (60s for listings).
- Used **Next.js Image Optimization** for responsive image rendering and automatic format conversion.
- Added **strict caching policies** for static assets.

---

## Known Limitations

- Product slugs can occasionally conflict if two products share the same name.
- Image upload currently accepts URLs only; file upload integration is planned.
- Large image files may impact performance due to lack of compression.
- Basic client-side error handling; server-side logging can be expanded.

---

## Future Improvements

If extended further, the following features would be prioritized:

- File upload support with compression and CDN integration.
- Bulk operations (multi-delete, CSV import/export).
- Advanced filters (price range, stock status).
- Product variants and inventory tracking.
- Analytics dashboard for performance insights.
- Unit and integration testing (Jest, Playwright).
- Real-time updates via WebSockets.

---

## Development Practices

- **Clean architecture** with separation of concerns between app, components, and libs.
- **Strict TypeScript** configuration for type safety and maintainability.
- **Server/Client Component balance** to optimize performance.
- **Consistent ESLint rules** to enforce code quality.
- **WCAG-compliant accessibility** standards followed throughout the UI.

---

## License

This project was developed as part of an assignment for **BitechX**.
It is available under the **MIT License**.

---

## Author

Developed by **Samin Israr Ravi**
Focused on performance, accessibility, and real-world production standards.
