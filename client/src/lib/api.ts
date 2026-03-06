/**
 * api.ts — Centralized API helper for the frontend
 * All fetch calls go through this to use the correct backend URL.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Wrapper around fetch that prefixes the backend API URL and includes credentials.
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
    const url = `${API_BASE_URL}${path}`;
    return fetch(url, {
        credentials: "include",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });
}

export { API_BASE_URL };
