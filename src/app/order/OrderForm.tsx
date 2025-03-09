'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { jsPDF } from 'jspdf';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';

// Pricing data
const plans = {
  'day-pass': {
    name: 'Day Pass',
    dailyRate: 25,
    monthlyRate: null,
    description: 'Access from 8:00 AM to 8:00 PM',
  },
  'hot-desk': {
    name: 'Hot Desk',
    dailyRate: 15,
    monthlyRate: 199,
    description: 'Flexible workspace in our open area',
  },
  'dedicated-desk': {
    name: 'Dedicated Desk',
    dailyRate: 20,
    monthlyRate: 349,
    description: 'Your own permanent desk in our shared space',
  },
  'private-office': {
    name: 'Private Office',
    dailyRate: 30,
    monthlyRate: 599,
    description: 'Secure, private workspace for your team',
  },
};

export default function OrderForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') || 'hot-desk';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    plan: initialPlan,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    billingType: 'monthly',
    teamSize: 1,
    termsAccepted: false,
  });

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price whenever relevant form data changes
  useEffect(() => {
    calculatePrice();
  }, [formData.plan, formData.startDate, formData.endDate, formData.billingType, formData.teamSize]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        [field]: date,
      }));
    }
  };

  const calculatePrice = () => {
    const plan = plans[formData.plan as keyof typeof plans];
    if (!plan) return 0;

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    // Calculate the difference in days
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start day
    
    let price = 0;
    
    if (formData.billingType === 'daily') {
      price = diffDays * (plan.dailyRate || 0) * formData.teamSize;
    } else {
      // Monthly billing
      // Calculate full months and remaining days
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      
      if (plan.monthlyRate) {
        price = (months * plan.monthlyRate + remainingDays * (plan.dailyRate || 0)) * formData.teamSize;
      } else {
        // If no monthly rate (e.g., day pass), use daily rate
        price = diffDays * (plan.dailyRate || 0) * formData.teamSize;
      }
    }
    
    setTotalPrice(price);
    return price;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const plan = plans[formData.plan as keyof typeof plans];
    
    // Add WeWork logo (simulated)
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text('WeWork', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Tenerife', 105, 30, { align: 'center' });
    
    // Contract title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('WORKSPACE AGREEMENT', 105, 45, { align: 'center' });
    
    // Contract details
    doc.setFontSize(12);
    doc.text('This agreement is made between:', 20, 60);
    doc.text('WeWork Tenerife', 20, 70);
    doc.text('Avenida Principal 123, Santa Cruz de Tenerife', 20, 80);
    doc.text('Canary Islands, Spain', 20, 90);
    
    doc.text('AND', 105, 105, { align: 'center' });
    
    doc.text(`${formData.firstName} ${formData.lastName}${formData.company ? ` (${formData.company})` : ''}`, 20, 120);
    doc.text(`Email: ${formData.email}`, 20, 130);
    doc.text(`Phone: ${formData.phone}`, 20, 140);
    
    // Membership details
    doc.setFontSize(14);
    doc.text('MEMBERSHIP DETAILS', 20, 160);
    
    doc.setFontSize(12);
    doc.text(`Plan: ${plan?.name}`, 20, 175);
    doc.text(`Description: ${plan?.description}`, 20, 185);
    doc.text(`Start Date: ${formData.startDate.toLocaleDateString()}`, 20, 195);
    doc.text(`End Date: ${formData.endDate.toLocaleDateString()}`, 20, 205);
    doc.text(`Billing Type: ${formData.billingType === 'monthly' ? 'Monthly' : 'Daily'}`, 20, 215);
    doc.text(`Team Size: ${formData.teamSize}`, 20, 225);
    doc.text(`Total Price: €${totalPrice.toFixed(2)}`, 20, 235);
    
    // Terms and conditions
    doc.setFontSize(14);
    doc.text('TERMS AND CONDITIONS', 20, 255);
    
    doc.setFontSize(10);
    doc.text('1. This is a sample contract for demonstration purposes only.', 20, 265);
    doc.text('2. In a real scenario, this would contain the full terms and conditions of the agreement.', 20, 275);
    
    // Save the PDF
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    
    return url;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    // Generate PDF
    generatePDF();
    
    toast.success('Contract generated successfully!');
  };

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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Book Your Space</h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Fill out the form below to book your workspace at WeWork Tenerife. You&apos;ll be able to preview your contract before finalizing your booking.
            </p>
          </div>
        </div>
      </div>

      {/* Order form and preview section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Order form */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Your Information</h2>
            <p className="mt-4 text-lg text-gray-600">
              Please provide your details to generate your workspace contract.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-10">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                    Phone number
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                    Company (optional)
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mt-6">Membership Details</h3>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="plan" className="block text-sm font-semibold leading-6 text-gray-900">
                    Workspace Plan
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <option value="day-pass">Day Pass</option>
                      <option value="hot-desk">Hot Desk</option>
                      <option value="dedicated-desk">Dedicated Desk</option>
                      <option value="private-office">Private Office</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="startDate" className="block text-sm font-semibold leading-6 text-gray-900">
                    Start Date
                  </label>
                  <div className="mt-2.5">
                    <DatePicker
                      selected={formData.startDate}
                      onChange={(date) => handleDateChange(date, 'startDate')}
                      minDate={new Date()}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-semibold leading-6 text-gray-900">
                    End Date
                  </label>
                  <div className="mt-2.5">
                    <DatePicker
                      selected={formData.endDate}
                      onChange={(date) => handleDateChange(date, 'endDate')}
                      minDate={formData.startDate}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="billingType" className="block text-sm font-semibold leading-6 text-gray-900">
                    Billing Type
                  </label>
                  <div className="mt-2.5">
                    <select
                      id="billingType"
                      name="billingType"
                      value={formData.billingType}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-semibold leading-6 text-gray-900">
                    Team Size
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="number"
                      name="teamSize"
                      id="teamSize"
                      min="1"
                      max="20"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="termsAccepted"
                        name="termsAccepted"
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="termsAccepted" className="font-medium text-gray-900">
                        I agree to the terms and conditions
                      </label>
                      <p className="text-gray-500">By checking this box, you agree to our Terms of Service and Privacy Policy.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Generate Contract
                </button>
              </div>
            </form>
          </div>

          {/* Contract preview */}
          <div className="lg:pl-8 lg:pt-4">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Contract Preview</h2>
              <p className="mt-4 text-lg text-gray-600">
                Your contract will be generated based on the information you provide.
              </p>
              
              <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Membership Summary</h3>
                
                <dl className="mt-6 space-y-4 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 border-b border-gray-100 pb-4">
                    <dt className="text-gray-500">Plan</dt>
                    <dd className="text-gray-900">{plans[formData.plan as keyof typeof plans]?.name}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 border-b border-gray-100 pb-4">
                    <dt className="text-gray-500">Description</dt>
                    <dd className="text-gray-900">{plans[formData.plan as keyof typeof plans]?.description}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 border-b border-gray-100 pb-4">
                    <dt className="text-gray-500">Duration</dt>
                    <dd className="text-gray-900">
                      {formData.startDate.toLocaleDateString()} to {formData.endDate.toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-x-4 border-b border-gray-100 pb-4">
                    <dt className="text-gray-500">Billing Type</dt>
                    <dd className="text-gray-900">{formData.billingType === 'monthly' ? 'Monthly' : 'Daily'}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 border-b border-gray-100 pb-4">
                    <dt className="text-gray-500">Team Size</dt>
                    <dd className="text-gray-900">{formData.teamSize}</dd>
                  </div>
                  <div className="flex justify-between gap-x-4 font-semibold">
                    <dt className="text-gray-900">Total Price</dt>
                    <dd className="text-blue-600">€{totalPrice.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
              
              {pdfUrl && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contract</h3>
                  <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-lg border border-gray-200">
                    <iframe src={pdfUrl} className="h-full w-full" title="Contract PDF Preview"></iframe>
                  </div>
                  <div className="mt-4">
                    <a
                      href={pdfUrl}
                      download="wework-tenerife-contract.pdf"
                      className="inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Download Contract
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 