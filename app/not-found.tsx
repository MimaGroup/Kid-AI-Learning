import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <div className="text-6xl mb-4">🔍</div>
          <CardTitle className="text-3xl">Stran ni najdena</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">Stran, ki jo iščete, ne obstaja.</p>
          <Link href="/">
            <Button className="w-full">Na začetno stran</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
