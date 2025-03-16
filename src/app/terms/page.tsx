import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Florida Wedding Directory',
  description: 'Read our Terms & Conditions to understand the rules and guidelines for using Florida Wedding Directory.',
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="gradient-text text-4xl font-bold tracking-tight sm:text-5xl mb-8">
            Terms & Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to Florida Wedding Directory. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing our website, you are agreeing to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-6">
              Permission is granted to temporarily access the materials (information or software) on Florida Wedding Directory's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 mb-6">
              The materials on Florida Wedding Directory's website are provided on an 'as is' basis. Florida Wedding Directory makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Limitations</h2>
            <p className="text-gray-600 mb-6">
              In no event shall Florida Wedding Directory or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-600 mb-6">
              The materials appearing on our website could include technical, typographical, or photographic errors. Florida Wedding Directory does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Links</h2>
            <p className="text-gray-600 mb-6">
              Florida Wedding Directory has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Florida Wedding Directory of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Modifications</h2>
            <p className="text-gray-600 mb-6">
              Florida Wedding Directory may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These terms and conditions are governed by and construed in accordance with the laws of Florida, and you irrevocably submit to the exclusive jurisdiction of the courts in that State.
            </p>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 