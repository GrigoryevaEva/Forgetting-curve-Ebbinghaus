import { API_CONFIG } from './config';
import type { IApiError } from './types';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
    method: HttpMethod;
    endpoint: string;
    body?: unknown;
    params?: Record<string, string | number | boolean | undefined | null>;
    headers?: Record<string, string>;
    timeout?: number;
}

function buildUrl(endpoint: string, params?: RequestOptions['params']): string {
    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, String(value));
            }
        });
    }
    return url.toString();
}

async function makeRequest<T>(options: RequestOptions): Promise<T> {
    const { method, endpoint, body, params, headers = {}, timeout = API_CONFIG.TIMEOUT } = options;

    const url = buildUrl(endpoint, params);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            method,
            credentials: 'include',
            headers: {
                ...API_CONFIG.DEFAULT_HEADERS,
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const error: IApiError = {
                message: 'Произошла ошибка при запросе',
                status: response.status,
            };

            try {
                const errorBody = await response.json();
                error.message = errorBody.message || error.message;
                error.code = errorBody.code;
            } catch {
                // Тело ошибки не JSON или пустое
            }

            throw error;
        }

        if (response.status === 204) {
            return null as T;
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw {
                message: 'Превышено время ожидания ответа от сервера',
                status: 408,
            } as IApiError;
        }
        throw error;
    }
}

export const apiClient = {
    get<T>(
        endpoint: string,
        options?: Partial<Omit<RequestOptions, 'method' | 'endpoint'>>
    ): Promise<T> {
        return makeRequest<T>({ ...options, method: 'GET', endpoint, params: options?.params });
    },

    post<T>(
        endpoint: string,
        body?: unknown,
        options?: Partial<Omit<RequestOptions, 'method' | 'endpoint' | 'body'>>
    ): Promise<T> {
        return makeRequest<T>({ ...options, method: 'POST', endpoint, body });
    },
    patch<T>(
        endpoint: string,
        body?: unknown,
        options?: Partial<Omit<RequestOptions, 'method' | 'endpoint' | 'body'>>
    ): Promise<T> {
        return makeRequest<T>({ ...options, method: 'PATCH', endpoint, body });
    },

    delete<T>(
        endpoint: string,
        options?: Partial<Omit<RequestOptions, 'method' | 'endpoint'>>
    ): Promise<T> {
        return makeRequest<T>({ ...options, method: 'DELETE', endpoint });
    },
};
