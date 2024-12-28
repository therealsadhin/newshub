import React from 'react';

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground dark:text-white">Privacy Policy</h1>
      
      <section className="mb-8">
        <p className="text-gray-700 mb-4 text-foreground dark:text-white">
          Last updated: December 28, 2024
        </p>
        <p className="text-gray-700 mb-4 text-foreground dark:text-white">
          At NewsyVeil, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
          disclose, and safeguard your information when you visit our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Information We Collect</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground dark:text-white">Personal Information</h3>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4 text-foreground dark:text-white">
            <li>Name and email address when you create an account</li>
            <li>Profile information you provide</li>
            <li>Comments and interactions on articles</li>
            <li>Newsletter subscriptions</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground dark:text-white">Usage Information</h3>
          <ul className="list-disc list-inside text-gray-700 ml-4 mb-4 text-foreground dark:text-white">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Article preferences and reading history</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-foreground dark:text-white">
          <li>Provide and maintain our service</li>
          <li>Personalize your news experience</li>
          <li>Send newsletters and updates</li>
          <li>Analyze usage patterns to improve our service</li>
          <li>Prevent fraud and ensure security</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Data Security</h2>
        <p className="text-gray-700 mb-4 text-foreground dark:text-white">
          We implement appropriate technical and organizational security measures to protect your personal data. 
          However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Your Rights</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-foreground dark:text-white">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to data processing</li>
          <li>Withdraw consent</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Cookies</h2>
        <p className="text-gray-700 mb-4 text-foreground dark:text-white">
          We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, 
          and understand where our audience is coming from.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Contact Us</h2>
        <p className="text-gray-700 text-foreground dark:text-white">
          If you have questions about this Privacy Policy, please contact us at:<br />
          Email: privacy@newsyveil.com<br />
          Address: 123 News Street, Digital City, DC 12345
        </p>
      </section>
    </div>
  );
}
