import React from 'react';

export function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground dark:text-white">Terms of Service</h1>
      
      <section className="mb-12">
        <p className="text-gray-700 mb-4 text-foreground dark:text-white">
          Last updated: December 28, 2024
        </p>
        <p className="text-gray-700 mb-4 text-foreground dark:text-white">
          Please read these Terms of Service carefully before using NewsyVeil. By accessing or using our service, 
          you agree to be bound by these terms.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">1. Acceptance of Terms</h2>
        <p className="text-lg mb-6 text-foreground dark:text-white">
          By accessing or using NewsyVeil, you agree to these Terms of Service and our Privacy Policy. 
          If you disagree with any part of the terms, you may not access the service.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">2. User Accounts</h2>
        <ul className="list-disc list-inside text-lg text-foreground dark:text-white space-y-2">
          <li>You must be 13 years or older to use this service</li>
          <li>You are responsible for maintaining the security of your account</li>
          <li>You must provide accurate and complete information</li>
          <li>You may not use another person's account</li>
          <li>You are responsible for all activities under your account</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">3. Content</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground dark:text-white">3.1 User Content</h3>
          <p className="text-lg mb-6 text-foreground dark:text-white">
            By posting content on NewsyVeil, you grant us a non-exclusive, worldwide, royalty-free license to use, 
            modify, publicly display, reproduce, and distribute such content.
          </p>

          <h3 className="text-xl font-semibold text-foreground dark:text-white">3.2 Prohibited Content</h3>
          <p className="text-lg mb-6 text-foreground dark:text-white">
            You may not post content that is illegal, harmful, threatening, abusive, harassing, defamatory, 
            or otherwise objectionable.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">4. Intellectual Property</h2>
        <p className="text-lg mb-6 text-foreground dark:text-white">
          The service and its original content (excluding user-generated content) are and will remain the 
          exclusive property of NewsyVeil and its licensors.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">5. Termination</h2>
        <p className="text-lg mb-6 text-foreground dark:text-white">
          We may terminate or suspend your account and access to the service immediately, without prior notice, 
          for any reason, including breach of these Terms.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">6. Limitation of Liability</h2>
        <p className="text-lg mb-6 text-foreground dark:text-white">
          In no event shall NewsyVeil be liable for any indirect, incidental, special, consequential, or punitive 
          damages arising out of or relating to your use of the service.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">7. Changes to Terms</h2>
        <p className="text-lg mb-6 text-foreground dark:text-white">
          We reserve the right to modify or replace these terms at any time. We will provide notice of any 
          significant changes through the service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">8. Contact Us</h2>
        <p className="text-lg text-foreground dark:text-white">
          If you have questions about these Terms, please contact us at:<br />
          Email: legal@newsyveil.com<br />
          Address: 123 News Street, Digital City, DC 12345
        </p>
      </section>
    </div>
  );
}

export default Terms;
