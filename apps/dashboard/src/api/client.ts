const BASE_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type QueryParamValue = string | number | undefined;

export async function apiGet<T>(
  path: string,
  params?: Record<string, QueryParamValue>,
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      body?.error ?? `Request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}
