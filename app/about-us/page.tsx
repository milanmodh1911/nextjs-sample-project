import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | OneWay.Cab',
  description: 'Learn about OneWay.Cab - India\'s favourite one way taxi service provider. Founded on the belief: Return Fare, Not Fair!',
};

const TEAM_MEMBERS = [
  { name: 'Vivek Kejriwal', role: 'Co-Founder & CEO' },
  { name: 'Devang Sanghvi', role: 'Co-Founder & COO' },
  { name: 'Pankaj Gandhi', role: 'Co-Founder & Advisor' },
  { name: 'Vikas Agarwal', role: 'CTO' },
];

const TRUST_POINTS = [
  'Cab / Taxi will arrive on Time',
  'Cab / Taxi will be clean & Well-Maintained',
  'Driver will be well-behaved & Professional in nature',
  'Fares will be transparent in nature with no hidden charges',
  'Any-time 24x7 Support Team, whenever you need us',
];

export default function AboutUsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-primary text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold">About Us</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container-custom max-w-4xl">
          {/* Intro */}
          <div className="mb-8">
            <p className="text-gray-700 text-lg mb-4">We are India's Favourite One Way Taxi Service Provider.</p>
            <p className="text-gray-700 mb-4">It has been founded on the belief: <strong>Return Fare, Not Fair!</strong></p>
            <p className="text-gray-700">So now when you travel one-way, you pay for one-way.</p>
          </div>

          {/* Core Value */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Core Value</h2>
            <p className="text-gray-700 mb-2">We are driven by one single value: <strong>Trust</strong>.</p>
            <p className="text-gray-700">Whenever customer makes a booking with us, they put a lot of trust on us.</p>
          </div>

          {/* Trust Points */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Trust that:</h2>
            <ul className="space-y-2">
              {TRUST_POINTS.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-primary mt-1">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Behind */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Team Behind the Success</h2>
            <p className="text-gray-700 mb-4">
              It is a brainchild of Chartered Cabs & Baroda Taxi Cabs. They have been providing Car Rental services for last 5 years. 
              They felt it was unjust to charge customers who are travelling one-way for both-way. Hence, the idea of OneWay.Cab was born.
            </p>
            <p className="text-gray-700 mb-4">Both are a well reputed name in the industry based on their unified vision:</p>
            <p className="text-xl font-bold text-primary text-center my-6">"To be Best, Not the Biggest"</p>
          </div>

          {/* Team Members */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Person behind the curtain who make sure you have an amazing ride</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEAM_MEMBERS.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
