import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    name: 'Day Pass',
    id: 'day-pass',
    href: '/order?plan=day-pass',
    price: { monthly: '€25', daily: '€25' },
    description: 'Perfect for visitors or occasional use.',
    features: [
      'Access from 8:00 AM to 8:00 PM',
      'High-speed WiFi',
      'Use of common areas',
      'Coffee and refreshments',
      'Printing credits (10 pages)',
    ],
    featured: false,
    cta: 'Get Started',
  },
  {
    name: 'Hot Desk',
    id: 'hot-desk',
    href: '/order?plan=hot-desk',
    price: { monthly: '€199', daily: '€15' },
    description: 'Flexible workspace in our open area.',
    features: [
      '24/7 access',
      'High-speed WiFi',
      'Use of common areas',
      'Coffee and refreshments',
      'Printing credits (100 pages/month)',
      '2 hours of meeting room use/month',
      'Business address service',
    ],
    featured: true,
    cta: 'Get Started',
  },
  {
    name: 'Dedicated Desk',
    id: 'dedicated-desk',
    href: '/order?plan=dedicated-desk',
    price: { monthly: '€349', daily: '€20' },
    description: 'Your own permanent desk in our shared space.',
    features: [
      '24/7 access',
      'Personal desk with lockable storage',
      'Ergonomic chair',
      'High-speed WiFi',
      'Use of common areas',
      'Coffee and refreshments',
      'Printing credits (200 pages/month)',
      '5 hours of meeting room use/month',
      'Business address service',
      'Mail handling',
    ],
    featured: false,
    cta: 'Get Started',
  },
  {
    name: 'Private Office',
    id: 'private-office',
    href: '/order?plan=private-office',
    price: { monthly: '€599', daily: '€30' },
    description: 'Secure, private workspace for your team.',
    features: [
      '24/7 access',
      'Private, lockable office',
      'Desks and ergonomic chairs',
      'High-speed WiFi',
      'Use of common areas',
      'Coffee and refreshments',
      'Printing credits (500 pages/month)',
      '10 hours of meeting room use/month',
      'Business address service',
      'Mail handling',
      'Dedicated phone line',
      'Custom branding options',
    ],
    featured: false,
    cta: 'Get Started',
  },
];

const faqs = [
  {
    question: 'Are there any hidden fees?',
    answer: 'No, our pricing is transparent. The monthly fee covers all the amenities listed for each plan. Additional services like extra meeting room hours or printing beyond your credits can be purchased as needed.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Changes will take effect at the start of your next billing cycle.',
  },
  {
    question: 'Is there a minimum commitment period?',
    answer: 'Our Hot Desk and Dedicated Desk plans require a minimum 1-month commitment. Private Offices require a 3-month minimum commitment. Day Passes have no commitment.',
  },
  {
    question: 'Do you offer discounts for longer commitments?',
    answer: 'Yes, we offer a 10% discount for 6-month commitments and a 15% discount for annual commitments on all our monthly plans.',
  },
  {
    question: 'Can I bring guests?',
    answer: 'Yes, members can bring guests. Hot Desk and Dedicated Desk members can bring 1 guest for up to 2 hours per day. Private Office members can bring up to 3 guests for unlimited time.',
  },
  {
    question: 'What are your operating hours?',
    answer: 'Our space is open 24/7 for monthly members. Day Pass holders have access from 8:00 AM to 8:00 PM.',
  },
];

export default function Pricing() {
  return (
    <div className="bg-white pt-24">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900 to-blue-700 pb-16 pt-14 md:pb-20 md:pt-32">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Simple, transparent pricing</h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Choose the perfect plan for your needs. Whether you need a workspace for a day or a private office for your team, we have flexible options to suit every requirement.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Membership Plans
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            All plans include high-speed internet, access to common areas, and complimentary refreshments.
          </p>
          
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 ring-1 ring-gray-200 ${
                  tier.featured ? 'bg-blue-600 text-white ring-blue-600' : 'bg-white text-black'
                }`}
              >
                <h3
                  id={tier.id}
                  className={`text-lg font-semibold leading-8 ${tier.featured ? 'text-white' : 'text-gray-900'}`}
                >
                  {tier.name}
                </h3>
                <p className={`mt-4 text-sm leading-6 ${tier.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className={`text-4xl font-bold tracking-tight ${tier.featured ? 'text-white' : 'text-gray-900'}`}>
                    {tier.price.monthly}
                  </span>
                  <span className={`text-sm font-semibold leading-6 ${tier.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                    /month
                  </span>
                </p>
                <p className={`mt-2 text-sm ${tier.featured ? 'text-blue-100' : 'text-gray-500'}`}>
                  or {tier.price.daily}/day
                </p>
                <Link
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    tier.featured
                      ? 'bg-white text-blue-600 hover:bg-blue-50 focus-visible:outline-white'
                      : 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
                  }`}
                >
                  {tier.cta}
                </Link>
                <ul
                  className={`mt-8 space-y-3 text-sm leading-6 ${tier.featured ? 'text-blue-100' : 'text-gray-600'}`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={`h-6 w-5 flex-none ${tier.featured ? 'text-white' : 'text-blue-600'}`}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional services */}
      <div className="bg-blue-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Add-ons</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Additional Services
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Customize your workspace experience with these additional services.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">Meeting Room Hours</dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Additional meeting room hours available at €15/hour.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">Virtual Office</dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Business address and mail handling service for €49/month.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">Event Space</dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Rent our event space for workshops or networking events from €199/half-day.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">FAQs</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find answers to common questions about our pricing and membership plans.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl divide-y divide-gray-900/10">
            <dl className="space-y-10 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <div key={faq.question} className="pt-10 lg:pt-12">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">{faq.question}</dt>
                  <dd className="mt-4 text-base leading-7 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to join our community?
            <br />
            Book your space today.
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Link
              href="/order"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get Started
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 