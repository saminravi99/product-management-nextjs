export function isValidImageUrl(url: string | undefined): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

export function getDefaultProductImage(): string {
    return '/images/product-placeholder.svg';
}

export function getValidImageUrl(url: string | undefined): string {
    return isValidImageUrl(url) ? url! : getDefaultProductImage();
}
