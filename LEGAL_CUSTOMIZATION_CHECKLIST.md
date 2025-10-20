# Legal Documents Customization Checklist

Before launching your platform, you MUST customize the following placeholders in your legal documents with your actual company information.

## ⚠️ Critical - Must Complete Before Launch

### Privacy Policy (`app/privacy-policy/page.tsx`)

- [ ] **Company Legal Name** - Replace `[COMPANY LEGAL NAME]` with your registered business name
- [ ] **Registered Address** - Replace `[REGISTERED ADDRESS]` with your official business address
- [ ] **Registration Number** - Replace `[REGISTRATION NUMBER]` with your business registration/incorporation number
- [ ] **Company Address** - Replace `[COMPANY ADDRESS]` in contact section
- [ ] **Email Addresses** - Update or verify:
  - `privacy@kids-learning-ai.com` - Privacy inquiries
  - `dpo@kids-learning-ai.com` - Data Protection Officer

### Terms of Service (`app/terms-of-service/page.tsx`)

- [ ] **Jurisdiction** - Replace `[JURISDICTION]` with your legal jurisdiction (e.g., "the State of California, USA")
- [ ] **Email Address** - Update or verify:
  - `legal@kids-learning-ai.com` - Legal inquiries

### Cookie Policy (`app/cookie-policy/page.tsx`)

- [ ] **Email Address** - Update or verify:
  - `privacy@kids-learning-ai.com` - Cookie policy inquiries

## 📋 Recommended Actions

### Legal Review
- [ ] Have a lawyer review all legal documents
- [ ] Ensure COPPA compliance is verified by legal counsel
- [ ] Verify compliance with state/local laws where you operate
- [ ] Review international data protection requirements (GDPR if serving EU users)

### Email Setup
- [ ] Set up `privacy@kids-learning-ai.com` email address
- [ ] Set up `legal@kids-learning-ai.com` email address
- [ ] Set up `dpo@kids-learning-ai.com` email address (Data Protection Officer)
- [ ] Configure email forwarding to appropriate team members
- [ ] Set up auto-responders acknowledging receipt of inquiries

### Domain and Branding
- [ ] Update domain name in all documents if different from `kids-learning-ai.com`
- [ ] Ensure company name matches across all documents
- [ ] Update any references to company branding

### Pricing Information
- [ ] Verify subscription prices in Terms of Service match Stripe configuration:
  - Monthly: $9.99/month
  - Yearly: $99.99/year
- [ ] Update if you change pricing before launch

### Third-Party Services
- [ ] Verify all third-party services listed are accurate:
  - Stripe (payments)
  - Supabase (database)
  - Groq (AI)
  - Vercel (hosting)
  - Upstash (Redis)
- [ ] Add any additional services you're using

## 🔍 Verification Steps

### Before Soft Launch
1. [ ] Search all legal documents for `[PLACEHOLDER]` text
2. [ ] Search for `TODO` or `FIXME` comments
3. [ ] Verify all email addresses are functional
4. [ ] Test contact forms submit to correct addresses
5. [ ] Ensure privacy policy link works in signup flow
6. [ ] Verify terms of service checkbox works in signup

### Testing
- [ ] Test "Contact Us" links in all legal documents
- [ ] Verify legal documents are accessible from footer
- [ ] Check mobile responsiveness of legal pages
- [ ] Ensure legal documents are indexed for search (sitemap)

## 📞 Support Contact Information

Current placeholder emails that need to be set up:
- `privacy@kids-learning-ai.com` - Privacy and COPPA inquiries
- `legal@kids-learning-ai.com` - Terms and legal questions  
- `dpo@kids-learning-ai.com` - Data Protection Officer
- `support@kids-learning-ai.com` - General support (if not already set up)

## 🚨 Legal Compliance Reminders

### COPPA Requirements
- [ ] Parental consent flow is implemented and tested
- [ ] Privacy policy clearly explains children's data collection
- [ ] Parents can access and delete children's data
- [ ] No behavioral advertising to children
- [ ] Data retention policies are clear

### Payment Processing
- [ ] Stripe is configured for production (not test mode)
- [ ] Refund policy is clearly stated
- [ ] Subscription cancellation process is documented
- [ ] Failed payment handling is implemented

### Data Protection
- [ ] RLS policies are applied in Supabase
- [ ] Encryption is enabled for data at rest and in transit
- [ ] Backup and disaster recovery plan is in place
- [ ] Data breach notification procedures are documented

## 📝 Notes

Add any company-specific notes or requirements here:

---

**Last Updated:** [DATE]
**Reviewed By:** [NAME/ROLE]
**Next Review Date:** [DATE]
