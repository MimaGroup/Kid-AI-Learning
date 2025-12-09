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
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">
                  <strong>Company Information:</strong>
                  <br />
                  Mima Group Inc.
                  <br />
                  Pot za Krajem 38, 4000 Kranj, Slovenia
                </p>
              </div>
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
                We comply with the Children's Online Privacy Protection Act (COPPA) and take children's privacy
                seriously. Our platform is designed with parental control and oversight as a core principle.
              </p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Parental Consent</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Parents must create accounts and provide verifiable consent</li>
                <li>Children cannot create accounts or provide personal information independently</li>
                <li>We collect only the minimum information necessary for educational purposes</li>
                <li>Parents have full control over their child's data at all times</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Information We Collect from Children</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>First name only (no last names required)</li>
                <li>Age or grade level for appropriate content</li>
                <li>Learning progress and activity completion</li>
                <li>Interactions with AI-generated educational content</li>
                <li>Game scores and achievements</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">What We Do NOT Collect from Children</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Email addresses or contact information</li>
                <li>Physical addresses or phone numbers</li>
                <li>Social security numbers or government IDs</li>
                <li>Photos or videos of children</li>
                <li>Geolocation data</li>
                <li>Persistent identifiers for behavioral advertising</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Parental Rights</h3>
              <p className="mb-2">Parents have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Review all personal information collected from their child</li>
                <li>Request deletion of their child's personal information</li>
                <li>Refuse further collection or use of their child's information</li>
                <li>Access their child's learning progress and activity history</li>
                <li>Contact us with questions or concerns at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">7. AI Content Safety</h2>
              <p className="mb-3">
                Our platform uses artificial intelligence to generate educational content. We take extensive measures to
                ensure all AI-generated content is age-appropriate and safe:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Multi-layer content filtering system to block inappropriate content</li>
                <li>Age-specific content guidelines programmed into all AI interactions</li>
                <li>Continuous monitoring and logging of AI-generated content</li>
                <li>Human review of flagged content within 24 hours</li>
                <li>Immediate blocking of content that violates our safety standards</li>
                <li>Regular audits of AI responses for quality and appropriateness</li>
                <li>Parent reporting system for any concerns</li>
              </ul>
              <p className="mt-3">
                While we implement robust safety measures, we encourage parents to supervise their children's use of the
                platform and report any concerns immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">8. Your Rights</h2>
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
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">9. Data Breach Notification</h2>
              <p className="mb-3">
                In the unlikely event of a data breach that affects your personal information or your child's
                information, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notify affected users via email within 72 hours of discovering the breach</li>
                <li>Provide details about what information was compromised</li>
                <li>Explain the steps we are taking to address the breach</li>
                <li>Offer guidance on protecting your account and information</li>
                <li>Notify relevant authorities as required by law</li>
                <li>Provide free credit monitoring services if financial data is compromised</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">10. Data Retention</h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide services. When
                you delete your account, we will delete or anonymize your personal information within 30 days, except
                where required by law to retain certain records.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">11. International Data Transfers</h2>
              <p className="mb-3">
                Your information may be transferred to and processed in countries other than your country of residence.
                These countries may have data protection laws that are different from the laws of your country.
              </p>
              <p>
                We ensure that any international transfers comply with applicable data protection laws and that
                appropriate safeguards are in place to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">12. Cookies and Tracking</h2>
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
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">13. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes via email
                or through the platform. Continued use of the service after changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">14. Contact Us</h2>
              <p className="mb-3">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="space-y-1">
                <li>
                  <strong>Email:</strong> privacy@kids-learning-ai.com
                </li>
                <li>
                  <strong>Data Protection Officer:</strong> dpo@kids-learning-ai.com
                </li>
                <li>
                  <strong>Support:</strong>{" "}
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    Contact Form
                  </Link>
                </li>
                <li>
                  <strong>Mailing Address:</strong> Pot za Krajem 38, 4000 Kranj, Slovenia
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                For COPPA-related inquiries or to exercise your parental rights, please email
                privacy@kids-learning-ai.com with "COPPA Request" in the subject line.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
