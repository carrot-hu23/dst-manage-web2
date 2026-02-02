export function base64ToUtf8(base64: string): string {
    return new TextDecoder().decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
}