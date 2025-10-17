import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">1. Acceptance of Terms</h2>
              <p>
                By accessing and using AI Kids Learning Platform ("the Service"), you agree to be bound by these Terms
                of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">2. Description of Service</h2>
              <p className="mb-3">
                AI Kids Learning Platform provides educational content and interactive learning experiences for children
                through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI-powered educational games and activities</li>
                <li>Interactive storytelling and conversations</li>
                <li>Progress tracking and achievement systems</li>
                <li>Parent dashboard and analytics</li>
                <li>Subscription-based premium features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">3. Account Registration</h2>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Parent Accounts</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>You must be at least 18 years old to create an account</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must provide accurate and complete information</li>
                <li>One account per email address</li>
                <li>You are responsible for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Child Profiles</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Parents create and manage child profiles</li>
                <li>Children cannot create accounts independently</li>
                <li>Parents are responsible for supervising children's use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">4. Subscription and Payment</h2>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Free Tier</h3>
              <p className="mb-4">
                We offer a free tier with limited access to features. Free accounts may have restrictions on content,
                activities, and usage.
              </p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Premium Subscription</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Monthly subscription: $9.99/month</li>
                <li>Yearly subscription: $99.99/year (save 17%)</li>
                <li>Automatic renewal unless cancelled</li>
                <li>Payments processed securely through Stripe</li>
                <li>All prices in USD</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">Billing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Subscriptions renew automatically</li>
                <li>You will be charged at the start of each billing period</li>
                <li>Price changes will be communicated 30 days in advance</li>
                <li>Failed payments may result in service suspension</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">5. Cancellation and Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You can cancel your subscription at any time</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No refunds for partial months or unused time</li>
                <li>Access to premium features continues until subscription expires</li>
                <li>Refunds may be issued at our discretion for technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">6. Acceptable Use</h2>
              <p className="mb-3">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for any illegal purpose</li>
                <li>Share your account credentials with others</li>
                <li>Attempt to hack, reverse engineer, or compromise the platform</li>
                <li>Upload malicious content or viruses</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Scrape or extract data from the platform</li>
                <li>Use the Service to train competing AI models</li>
                <li>Circumvent payment or access restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">7. Content and Intellectual Property</h2>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Our Content</h3>
              <p className="mb-4">
                All content, features, and functionality (including but not limited to text, graphics, logos, icons,
                images, audio clips, and software) are owned by AI Kids Learning Platform and protected by copyright,
                trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">User-Generated Content</h3>
              <p className="mb-3">
                Content created by children using our platform (stories, drawings, etc.) remains the property of the
                parent/guardian. By using the Service, you grant us a license to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Store and display user-generated content within the platform</li>
                <li>Use anonymized data to improve our services</li>
                <li>Create aggregated statistics and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">8. AI-Generated Content</h2>
              <p className="mb-3">Our platform uses AI to generate educational content. Please note:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI-generated content is created in real-time and may vary</li>
                <li>We strive for age-appropriate content but cannot guarantee perfection</li>
                <li>Parents should supervise children's interactions</li>
                <li>Report any inappropriate content immediately</li>
                <li>We continuously improve our content filters and safety measures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">9. Parental Responsibility</h2>
              <p className="mb-3">As a parent or guardian, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Supervise your child's use of the platform</li>
                <li>Ensure age-appropriate usage</li>
                <li>Monitor your child's progress and activities</li>
                <li>Report any concerns or inappropriate content</li>
                <li>Maintain the security of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">10. Disclaimers and Limitations</h2>
              <p className="mb-3">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uninterrupted or error-free service</li>
                <li>Specific educational outcomes or results</li>
                <li>Compatibility with all devices or browsers</li>
                <li>Accuracy of all AI-generated content</li>
              </ul>
              <p className="mt-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">11. Termination</h2>
              <p className="mb-3">We reserve the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Suspend or terminate accounts that violate these terms</li>
                <li>Modify or discontinue the Service at any time</li>
                <li>Remove content that violates our policies</li>
                <li>Refuse service to anyone for any reason</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">12. Changes to Terms</h2>
              <p>
                We may update these Terms of Service from time to time. Significant changes will be communicated via
                email or platform notification. Continued use after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                our company is registered, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">14. Contact Information</h2>
              <p className="mb-3">For questions about these Terms of Service, please contact us:</p>
              <ul className="space-y-1">
                <li>
                  <strong>Email:</strong> legal@kids-learning-ai.com
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
