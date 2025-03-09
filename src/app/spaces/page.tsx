import Image from 'next/image';
import Link from 'next/link';

const spaces = [
  {
    id: 1,
    name: 'Main Workspace',
    description: 'Our open-plan main workspace features ergonomic seating, natural light, and a vibrant atmosphere.',
    image: '/space1.jpg',
  },
  {
    id: 2,
    name: 'Private Offices',
    description: 'Secure, private offices for teams of all sizes, fully furnished and ready for you to move in.',
    image: '/space2.jpg',
  },
  {
    id: 3,
    name: 'Meeting Rooms',
    description: 'Professional meeting rooms equipped with the latest technology for productive collaboration.',
    image: '/space3.jpg',
  },
  {
    id: 4,
    name: 'Lounge Area',
    description: 'Comfortable lounge areas for casual meetings, networking, or simply taking a break.',
    image: '/space4.jpg',
  },
  {
    id: 5,
    name: 'Kitchen & Dining',
    description: 'Fully stocked kitchen and dining area with complimentary coffee, tea, and filtered water.',
    image: '/space5.jpg',
  },
  {
    id: 6,
    name: 'Outdoor Terrace',
    description: 'Beautiful outdoor terrace with stunning views of Tenerife, perfect for working or relaxing.',
    image: '/space6.jpg',
  },
];

export default function Spaces() {
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Our Spaces</h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Explore our beautiful coworking spaces designed to inspire creativity, productivity, and collaboration. From open workspaces to private offices, we have the perfect environment for your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Gallery</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Take a tour of our facilities
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our spaces are designed to provide the perfect balance of comfort, functionality, and inspiration. See for yourself what makes WeWork Tenerife special.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {spaces.map((space) => (
            <div key={space.id} className="group relative overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-h-2 aspect-w-3 relative overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{space.name}</h3>
                <p className="mt-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {space.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features section */}
      <div className="bg-blue-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Designed for productivity
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our spaces are thoughtfully designed with features that enhance your work experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 flex-none text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  High-Speed Internet
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Fiber-optic internet with redundant connections ensures you stay connected at all times.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 flex-none text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                  Modern Technology
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Smart displays, wireless charging stations, and state-of-the-art video conferencing equipment.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 flex-none text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  Natural Light
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">Large windows provide abundant natural light, creating a bright and energizing work environment.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Want to see our spaces in person?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Schedule a tour to experience our beautiful coworking space firsthand. Our team will show you around and answer any questions you may have.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/order"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Book a Space <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 