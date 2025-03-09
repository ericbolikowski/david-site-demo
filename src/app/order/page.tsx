import { Suspense } from 'react';
import OrderForm from './OrderForm';

export default function OrderPage() {
  return (
    <Suspense fallback={<OrderLoading />}>
      <OrderForm />
    </Suspense>
  );
}

function OrderLoading() {
  return (
    <div className="bg-white pt-24">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900 to-blue-700 pb-16 pt-14 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Book Your Space</h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Loading your booking form...
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-12"></div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 