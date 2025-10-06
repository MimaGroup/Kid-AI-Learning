export class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public code?: string,
  ) {
    super(message)
    this.name = "AppError"
  }
}

export function handleApiError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    }
  }

  return {
    message: "An unexpected error occurred",
    statusCode: 500,
  }
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes("fetch") || error.message.includes("network")
  }
  return false
}

export function getUserFriendlyMessage(error: unknown): string {
  if (isNetworkError(error)) {
    return "Network error. Please check your internet connection and try again."
  }

  if (error instanceof AppError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Something went wrong. Please try again."
}
