import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
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
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">❓</div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">Find answers to common questions about our platform</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What age group is this platform designed for?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                AI Kids Learning Platform is designed for children aged 6-12 years old. Our content is carefully crafted
                to be age-appropriate, with different difficulty levels and content types suitable for various
                developmental stages within this range.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Is the platform safe for my child?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes! Safety is our top priority. We are COPPA-compliant, use content filtering, require parental account
                creation, and implement industry-standard security measures. All AI interactions are monitored and
                filtered for age-appropriate content. We recommend parental supervision, especially for younger
                children.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">What's included in the free tier?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                The free tier includes:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Access to basic learning activities</li>
                  <li>Limited AI interactions per day</li>
                  <li>Basic progress tracking</li>
                  <li>One child profile</li>
                  <li>Access to select games and stories</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What additional features do I get with Premium?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Premium subscription includes:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Unlimited AI interactions</li>
                  <li>Access to all games, activities, and stories</li>
                  <li>Advanced progress analytics</li>
                  <li>Multiple child profiles (up to 5)</li>
                  <li>Priority support</li>
                  <li>Early access to new features</li>
                  <li>Ad-free experience</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">How much does Premium cost?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                We offer two Premium subscription options:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    <strong>Monthly:</strong> $9.99/month
                  </li>
                  <li>
                    <strong>Yearly:</strong> $99.99/year (save 17% - equivalent to $8.33/month)
                  </li>
                </ul>
                Both plans include all Premium features and can be cancelled anytime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can I cancel my subscription anytime?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes! You can cancel your subscription at any time from your account settings. Your Premium access will
                continue until the end of your current billing period. No refunds are provided for partial months, but
                you'll retain access to Premium features until your subscription expires.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How does the AI work? Is it really talking to my child?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Our platform uses advanced AI language models to generate educational content, stories, and
                conversations. The AI is specifically configured for child-friendly interactions with content filtering
                and safety measures. While the AI generates responses in real-time, all interactions are monitored and
                filtered to ensure age-appropriate content. Think of it as an educational tool, not a replacement for
                human interaction.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">Can I track my child's progress?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes! The parent dashboard provides comprehensive analytics including:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Learning time and activity history</li>
                  <li>Game scores and achievements</li>
                  <li>Badges and rewards earned</li>
                  <li>Daily learning streaks</li>
                  <li>Areas of strength and improvement</li>
                  <li>Detailed session logs</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How many child profiles can I create?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Free tier accounts can create 1 child profile. Premium subscribers can create up to 5 child profiles,
                each with their own progress tracking, achievements, and personalized learning experience.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">What devices can we use?</AccordionTrigger>
              <AccordionContent className="text-gray-700">
                AI Kids Learning Platform works on any device with a modern web browser:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Desktop computers (Windows, Mac, Linux)</li>
                  <li>Tablets (iPad, Android tablets)</li>
                  <li>Smartphones (iOS, Android)</li>
                </ul>
                We recommend tablets or computers for the best experience. The platform is fully responsive and works
                offline for many features once loaded.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you collect my child's personal information?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                We collect minimal information necessary for the educational experience: first name, age, and learning
                progress data. We do NOT collect sensitive personal information, photos, or location data. All data is
                encrypted and stored securely. Parents have full control and can delete their child's data at any time.
                See our{" "}
                <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>{" "}
                for complete details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What if my child encounters inappropriate content?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                While we have robust content filtering and safety measures, no system is perfect. If your child
                encounters any inappropriate content, please report it immediately through the platform or contact our
                support team. We take all reports seriously and continuously improve our safety systems.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Can my child use this without supervision?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                While our platform is designed with safety in mind, we recommend parental supervision, especially for
                younger children (ages 6-8). Older children (9-12) may use the platform more independently, but we
                encourage parents to regularly review their child's progress and activities through the parent
                dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do I get help or report an issue?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                You can get help in several ways:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    Visit our{" "}
                    <Link href="/contact" className="text-blue-600 hover:underline">
                      Contact page
                    </Link>
                  </li>
                  <li>Email us at support@kids-learning-ai.com</li>
                  <li>Use the in-app help button (Premium subscribers get priority support)</li>
                </ul>
                We typically respond within 24-48 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-15" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Will my child actually learn about AI?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes! Our platform teaches AI concepts through hands-on experience. Children learn about:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Pattern recognition and machine learning basics</li>
                  <li>How AI makes decisions</li>
                  <li>Natural language processing through conversations</li>
                  <li>Creative applications of AI</li>
                  <li>Ethical considerations of AI technology</li>
                </ul>
                Learning happens naturally through play, making complex concepts accessible and fun.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="font-bold text-lg mb-2">Still have questions?</h3>
            <p className="text-gray-700 mb-4">We're here to help! Reach out to our support team.</p>
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
