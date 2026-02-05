/**
 * Format date helper
 */
export function formatDate(dateString?: string | Date | null): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Resolve media URL from backend path
 */
export function getMediaUrl(path?: string | null): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${normalizedPath}`;
}
