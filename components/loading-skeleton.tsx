import { Card } from "@/components/ui/card"

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="h-16 bg-muted border-b" />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="h-64 bg-muted rounded-3xl" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-48 bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="h-6 bg-muted rounded mb-4 w-3/4" />
      <div className="h-4 bg-muted rounded mb-2" />
      <div className="h-4 bg-muted rounded w-5/6" />
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="h-20 bg-muted border-b" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-12 bg-muted rounded mb-8 w-1/3" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
