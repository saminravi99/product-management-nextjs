/**
 * Image utility functions
 */

/**
 * Validates if a URL is a valid image URL
 * @param url - The URL string to validate
 * @returns boolean indicating if the URL is valid
 */
export function isValidImageUrl(url: string | undefined): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
        return false;
    }
}

/**
 * Returns a default placeholder image path
 * @returns Default product image path
 */
export function getDefaultProductImage(): string {
    return "/images/product-placeholder.svg";
}

/**
 * Gets a valid image URL or returns placeholder
 * @param url - The image URL to validate
 * @returns Valid URL or placeholder
 */
export function getValidImageUrl(url: string | undefined): string {
    return isValidImageUrl(url) ? url! : getDefaultProductImage();
}
