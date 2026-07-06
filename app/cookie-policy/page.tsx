import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Cookie Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us
                provide you with a better experience by remembering your preferences and understanding how you use our
                platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">2. How We Use Cookies</h2>
              <p className="mb-3">We use cookies for the following purposes:</p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Essential Cookies (Required)</h3>
              <p className="mb-2">These cookies are necessary for the platform to function:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Authentication:</strong> Keep you logged in to your account
                </li>
                <li>
                  <strong>Security:</strong> Protect against fraud and unauthorized access
                </li>
                <li>
                  <strong>Session Management:</strong> Remember your actions during a browsing session
                </li>
                <li>
                  <strong>CSRF Protection:</strong> Prevent cross-site request forgery attacks
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Functional Cookies</h3>
              <p className="mb-2">These cookies enhance your experience:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Preferences:</strong> Remember your settings and choices
                </li>
                <li>
                  <strong>Language:</strong> Store your preferred language
                </li>
                <li>
                  <strong>Child Profile:</strong> Remember which child profile is active
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Analytics Cookies</h3>
              <p className="mb-2">These cookies help us improve our platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Usage Analytics:</strong> Understand how visitors use our platform (anonymized)
                </li>
                <li>
                  <strong>Performance Monitoring:</strong> Identify and fix technical issues
                </li>
                <li>
                  <strong>Feature Usage:</strong> See which features are most popular
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">3. Types of Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Cookie Name</th>
                      <th className="border border-gray-300 p-3 text-left">Purpose</th>
                      <th className="border border-gray-300 p-3 text-left">Duration</th>
                      <th className="border border-gray-300 p-3 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">sb-access-token</td>
                      <td className="border border-gray-300 p-3">Authentication session</td>
                      <td className="border border-gray-300 p-3">1 hour</td>
                      <td className="border border-gray-300 p-3">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">sb-refresh-token</td>
                      <td className="border border-gray-300 p-3">Session renewal</td>
                      <td className="border border-gray-300 p-3">30 days</td>
                      <td className="border border-gray-300 p-3">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">csrf-token</td>
                      <td className="border border-gray-300 p-3">Security protection</td>
                      <td className="border border-gray-300 p-3">Session</td>
                      <td className="border border-gray-300 p-3">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">user-preferences</td>
                      <td className="border border-gray-300 p-3">Store user settings</td>
                      <td className="border border-gray-300 p-3">1 year</td>
                      <td className="border border-gray-300 p-3">Functional</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">analytics-id</td>
                      <td className="border border-gray-300 p-3">Anonymous usage tracking</td>
                      <td className="border border-gray-300 p-3">2 years</td>
                      <td className="border border-gray-300 p-3">Analytics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">4. Third-Party Cookies</h2>
              <p className="mb-3">We use services from trusted third parties that may set their own cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Stripe:</strong> Payment processing (secure checkout)
                </li>
                <li>
                  <strong>Vercel:</strong> Hosting and performance optimization
                </li>
              </ul>
              <p className="mt-3">
                These third parties have their own cookie policies. We recommend reviewing their policies for more
                information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">5. Children's Privacy</h2>
              <p>
                We do not use cookies to track or profile children. Cookies are associated with parent accounts only.
                Child profiles do not have separate cookies or tracking mechanisms. All data collection complies with
                COPPA requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">6. Managing Cookies</h2>
              <p className="mb-3">You have control over cookies:</p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Browser Settings</h3>
              <p className="mb-2">Most browsers allow you to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>View and delete cookies</li>
                <li>Block third-party cookies</li>
                <li>Block all cookies (may affect functionality)</li>
                <li>Clear cookies when closing the browser</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Browser-Specific Instructions</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and Security → Cookies
                </li>
                <li>
                  <strong>Firefox:</strong> Settings → Privacy & Security → Cookies
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Cookies
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Cookies and Site Permissions
                </li>
              </ul>

              <p className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <strong>Note:</strong> Blocking essential cookies will prevent you from logging in and using the
                platform. Functional and analytics cookies can be disabled without affecting core functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">7. Do Not Track</h2>
              <p>
                Some browsers have a "Do Not Track" feature. Currently, there is no industry standard for how to respond
                to these signals. We do not track users across third-party websites and do not serve targeted
                advertising.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">8. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology or legal
                requirements. We will notify you of significant changes via email or platform notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">9. Contact Us</h2>
              <p className="mb-3">If you have questions about our use of cookies, please contact us:</p>
              <ul className="space-y-1">
                <li>
                  <strong>Email:</strong> privacy@kids-learning-ai.com
                </li>
                <li>
                  <strong>Support:</strong>{" "}
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    Contact Form
                  </Link>
                </li>
              </ul>
            </section>

            <section className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Related Policies</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  - How we collect and use your information
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  - Rules and guidelines for using our platform
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
