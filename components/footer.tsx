import Link from "next/link"
import Image from "next/image"
import { BYTE_CHARACTER } from "@/lib/byte-character"

export function Footer() {
  return (
    <footer className="bg-white border-t py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Izdelek</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Cenik
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  Pogosta vprasanja
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Podpora</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Kontaktirajte nas
                </Link>
              </li>
              <li>
                <Link href="/getting-started" className="text-gray-600 hover:text-gray-900">
                  Zacetek uporabe
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Pravne informacije</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">
                  Politika zasebnosti
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 hover:text-gray-900">
                  Pogoji uporabe
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-600 hover:text-gray-900">
                  Politika piskotkov
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Povezi se</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Posljite nam e-posto
                </Link>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src={BYTE_CHARACTER.images.avatar || "/placeholder.svg"}
                  alt={BYTE_CHARACTER.fullName}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span className="text-xs text-gray-500">Byte te pozdravlja!</span>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} KidsLearnAI Platforma. Vse pravice pridrzane.</p>
        </div>
      </div>
    </footer>
  )
}
