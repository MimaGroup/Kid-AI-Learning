"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorRetryProps {
  error: Error | string
  onRetry: () => Promise<void> | void
  maxRetries?: number
}

export function ErrorRetry({ error, onRetry, maxRetries = 3 }: ErrorRetryProps) {
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  const errorMessage = typeof error === "string" ? error : error.message

  const handleRetry = async () => {
    if (retryCount >= maxRetries) {
      return
    }

    setIsRetrying(true)
    setRetryCount((prev) => prev + 1)

    try {
      await onRetry()
    } catch (err) {
      console.error("[v0] Retry failed:", err)
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-2">Prišlo je do napake</h3>
            <p className="text-sm text-red-800 mb-4">{errorMessage}</p>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRetry}
                disabled={isRetrying || retryCount >= maxRetries}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Ponovno poskušam ...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Poskusi znova
                  </>
                )}
              </Button>
              {retryCount > 0 && (
                <span className="text-xs text-red-600">
                  Poskus {retryCount} od {maxRetries}
                </span>
              )}
            </div>
            {retryCount >= maxRetries && (
              <p className="text-xs text-red-600 mt-3">
                Doseženo je največje število poskusov. Osvežite stran ali kontaktirajte podporo, če se težava nadaljuje.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
