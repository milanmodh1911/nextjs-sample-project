'use client';

import { useState } from 'react';
import BookingForm from '@/components/BookingForm';
import FeatureCards from '@/components/FeatureCards';
import AppStoreButtons from '@/components/AppStoreButtons';
import { SITE_CONFIG } from '@/lib/constants';

// Why Book reasons from PHP site
const WHY_BOOK_REASONS = [
  {
    title: 'Gate-To-Gate At Fixed Rate',
    description: 'One Way Cabs enables you to travel from your location in a specific city to a destination of your choice in another city at a fixed cost.',
  },
  {
    title: 'Guaranteed Cab',
    description: "Booked a cab? You'll get it, on time! Experience no cancellations from our end after you confirm the booking.",
  },
  {
    title: 'Transparent Pricing',
    description: 'The price we offer for your intercity travel includes tax and toll charges, which are mentioned beforehand. No extra charges during the journey!',
  },
  {
    title: "'Zero' Cancellation Charges",
    description: 'Cancel your plan without paying cancellation charges. We understand sudden changes, so no penalty for cancellations.',
  },
  {
    title: '24x7 Support',
    description: 'Got booking or cancellation or route info issues? Get answers from our 24x7 helpline - 08000247247',
  },
  {
    title: 'Highly Competent Drivers',
    description: 'Our driver partners are ranked on 8+ parameters, ensuring complete customer satisfaction.',
  },
  {
    title: 'Flexible Payment Options',
    description: 'Use Credit/Debit Cards, UPI Wallets, or cash as payment modes.',
  },
  {
    title: 'Diverse Fleet',
    description: 'Choose from a variety of cabs to match your travel needs with One Way Cabs.',
  },
  {
    title: 'Book Using Our App',
    description: 'Quickly book a one-way intercity cab in seconds using our app.',
  },
  {
    title: 'Best & Well-Maintained Cabs',
    description: 'We ensure our cabs are in peak condition—clean, hygienic, and well-maintained.',
  },
];

// FAQs from PHP site
const FAQS = [
  {
    question: 'How can I book a cab?',
    answer: 'You can either go to our homepage, fill in the travel details, and make a booking, or you can download our app and repeat the same process.',
  },
  {
    question: 'Can I book a cab of my choice?',
    answer: 'Yes, you can choose from our diverse fleet of vehicles including hatchbacks, sedans, and SUVs based on your preference and budget.',
  },
  {
    question: 'I want to cancel my booking, will I get charged for it?',
    answer: 'No, we do not charge any cancellation fees. You can cancel your booking anytime without any penalty.',
  },
  {
    question: 'How do I download the app?',
    answer: 'You can download our app from Google Play Store for Android devices or App Store for iOS devices.',
  },
  {
    question: "There's an issue with my cab, what do I do?",
    answer: 'Please contact our 24x7 support helpline at 08000247247 for immediate assistance with any issues during your trip.',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section with Booking Form */}
      <section className="bg-gray-100 py-8">
        <div className="container-custom">
          <BookingForm />
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <AppStoreButtons />
        </div>
      </section>

      {/* USP Features Section */}
      <section className="py-12 bg-surface">
        <div className="container-custom">
          <FeatureCards />
        </div>
      </section>

      {/* Why Book Section - 10 Points */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800">
              Why Book a One-Way Outstation Cab with One Way Cabs?
            </h2>
            <p className="text-gray-600 mt-3">
              There are countless reasons to book a one-way outstation cab with One Way Cabs. Here are the top 10!
            </p>
          </div>

          <div className="space-y-6">
            {WHY_BOOK_REASONS.map((reason, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-primary font-bold text-lg">{index + 1}.</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{reason.title}</h3>
                  <p className="text-gray-600 mt-1">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-surface">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 text-center mb-10">
            FAQs
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <span className="text-gray-400 text-xl">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">
              Why Choose <span className="text-primary">OneWay.Cab</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We understand your travel needs. Book a one-way cab and pay only for the distance you travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="card text-center group hover:border-primary border-2 border-transparent">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">
                All Inclusive Fixed Fare
              </h3>
              <p className="text-gray-600 text-sm">
                Fare inclusive of Driver Allowance & Other Charges except Government Taxes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center group hover:border-primary border-2 border-transparent">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">
                No Charges for Extra KMs
              </h3>
              <p className="text-gray-600 text-sm">
                Remove your eyes off Odometer as we don&apos;t charge by KMs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center group hover:border-primary border-2 border-transparent">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">
                Trusted by 98,000+ Customers
              </h3>
              <p className="text-gray-600 text-sm">
                We are preferred cab provider for: GE, L&amp;T, Radio Mirchi, Bajaj Allianz and others.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card text-center group hover:border-primary border-2 border-transparent">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-lg text-gray-800 mb-2">
                No Cancellation Fees
              </h3>
              <p className="text-gray-600 text-sm">
                We understand Plans change, that&apos;s why we do not charge any Cancellation Fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to Book Your One Way Cab?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Join 98,000+ happy customers who have saved money on their inter-city travel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToTop}
              className="btn-accent px-8 py-4 text-lg"
            >
              Book Now
            </button>
            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
              Call {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
