import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Wedding Directory Florida',
  description: 'Our privacy policy outlines how we collect, use, and protect your personal information when you use Wedding Directory Florida.',
  robots: 'noindex, nofollow', // Prevent indexing since we don't want it in sitemap
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-rose lg:prose-lg">
          <p className="text-gray-700 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-6">
            Wedding Directory Florida ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
          <p className="text-gray-700 mb-4">We may collect personal information that you voluntarily provide, including but not limited to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Wedding details and preferences</li>
            <li>Information submitted through our contact forms</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
          <p className="text-gray-700 mb-4">When you visit our website, we automatically collect certain information, including:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Usage data</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the collected information for various purposes, including:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Providing and maintaining our services</li>
            <li>Responding to your inquiries and requests</li>
            <li>Improving our website and user experience</li>
            <li>Sending you relevant updates and communications</li>
            <li>Analyzing usage patterns and trends</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information Sharing</h2>
          <p className="text-gray-700 mb-6">
            We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-6">
            We implement appropriate security measures to protect your personal information. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to the processing of your information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies</h2>
          <p className="text-gray-700 mb-6">
            We use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse all or some browser cookies, but this may affect certain features of our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a 
              href="mailto:welcome@weddingdirectoryflorida.com" 
              className="text-rose-600 hover:text-rose-700 transition-colors"
            >
              welcome@weddingdirectoryflorida.com
            </a>
            {' '}or through our contact form.
          </p>
        </div>
      </div>
    </div>
  );
} 