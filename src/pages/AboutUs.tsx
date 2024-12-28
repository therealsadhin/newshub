import React from 'react';

export function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground dark:text-white">About NewsyVeil</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Our Story</h2>
        <p className="text-lg mb-4 text-foreground dark:text-white">
          Founded in 2024, NewsHub emerged from a simple vision: to provide reliable, unbiased news coverage to readers worldwide. 
          What started as a small team of passionate journalists has grown into a dynamic digital news platform, serving millions of readers daily.
        </p>
        <p className="text-lg mb-4 text-foreground dark:text-white">
          Our mission is to deliver accurate, timely, and comprehensive news coverage across multiple categories, helping our readers stay informed 
          about the events that shape our world.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Our Values</h2>
        <ul className="list-disc list-inside text-lg text-foreground dark:text-white space-y-2">
          <li>Accuracy and Truth in Reporting</li>
          <li>Editorial Independence</li>
          <li>Commitment to Transparency</li>
          <li>Innovation in Digital Journalism</li>
          <li>Global Perspective with Local Impact</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Our Team</h2>
        <p className="text-lg mb-4 text-foreground dark:text-white">
          NewsHub is powered by a diverse team of experienced journalists, editors, and technology experts. Our global network of 
          correspondents ensures comprehensive coverage of events worldwide.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Contact Us</h2>
        <p className="text-lg text-foreground dark:text-white">
          Have questions or feedback? We'd love to hear from you.<br />
          Email: contact@newhub.com<br />
          Phone: (555) 123-4567<br />
          Address: 123 News Street, Digital City, DC 12345
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
