import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">1. Introduction</h2>
              <p>
                Welcome to AI Kids Learning Platform ("we," "our," or "us"). We are committed to protecting the privacy
                of children and their parents. This Privacy Policy explains how we collect, use, and safeguard
                information when you use our educational platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Parent Information</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Email address for account creation and communication</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Account preferences and settings</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Child Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>First name and age (for personalized learning experience)</li>
                <li>Learning progress and activity data</li>
                <li>Game scores and achievements</li>
                <li>AI-generated content interactions (stories, conversations)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">3. How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide personalized educational content and experiences</li>
                <li>Track learning progress and achievements</li>
                <li>Process subscription payments</li>
                <li>Send important updates about the service</li>
                <li>Improve our platform and develop new features</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">4. Data Protection</h2>
              <p className="mb-3">We implement industry-standard security measures to protect your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encrypted data transmission (SSL/TLS)</li>
                <li>Secure database storage with Supabase</li>
                <li>PCI-compliant payment processing through Stripe</li>
                <li>Regular security audits and updates</li>
                <li>Limited employee access to personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">5. Third-Party Services</h2>
              <p className="mb-3">We use the following trusted third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Stripe:</strong> Payment processing (PCI-DSS compliant)
                </li>
                <li>
                  <strong>Supabase:</strong> Database and authentication
                </li>
                <li>
                  <strong>Groq:</strong> AI-powered educational content generation
                </li>
                <li>
                  <strong>Vercel:</strong> Hosting and deployment
                </li>
              </ul>
              <p className="mt-3">
                These services have their own privacy policies and security measures. We carefully select partners who
                prioritize data protection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">6. Children's Privacy (COPPA Compliance)</h2>
              <p className="mb-3">
                We comply with the Children's Online Privacy Protection Act (COPPA). We do not knowingly collect
                personal information from children without parental consent.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Parents create and manage all accounts</li>
                <li>Children cannot create accounts independently</li>
                <li>We collect only necessary information for educational purposes</li>
                <li>Parents can review and delete their child's data at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">7. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">8. Data Retention</h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide services. When
                you delete your account, we will delete or anonymize your personal information within 30 days, except
                where required by law to retain certain records.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">9. Cookies and Tracking</h2>
              <p className="mb-3">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze platform usage (anonymized)</li>
                <li>Improve user experience</li>
              </ul>
              <p className="mt-3">You can control cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes via email
                or through the platform. Continued use of the service after changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">11. Contact Us</h2>
              <p className="mb-3">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
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
          </div>
        </div>
      </div>
    </div>
  )
}
