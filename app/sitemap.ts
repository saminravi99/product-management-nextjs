import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://product-management-indol-seven.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://product-management-indol-seven.vercel.app/login',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://product-management-indol-seven.vercel.app/products',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://product-management-indol-seven.vercel.app/products/create',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ]
}
