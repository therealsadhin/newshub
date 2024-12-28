import React from 'react';

export function Help() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-foreground dark:text-white">Help Center</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-2 text-foreground dark:text-white">How do I create an account?</h3>
            <p className="text-lg text-foreground dark:text-white">
              Click the "Sign Up" button in the top right corner and follow the prompts to create your account.
              You can sign up using your email or through social media.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2 text-foreground dark:text-white">How do I save articles?</h3>
            <p className="text-lg text-foreground dark:text-white">
              When viewing an article, click the bookmark icon to save it to your reading list.
              You can access your saved articles from your profile.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2 text-foreground dark:text-white">How do I customize my news feed?</h3>
            <p className="text-lg text-foreground dark:text-white">
              Go to your profile settings and select your preferred categories and topics.
              Your feed will be personalized based on your selections.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-white">Contact Support</h2>
        <p className="text-lg mb-4 text-foreground dark:text-white">
          Need more help? Our support team is available 24/7 to assist you.
        </p>
        <div className="space-y-2 text-foreground dark:text-white">
          <p>Email: support@newshub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Live Chat: Available on our website</p>
        </div>
      </section>
    </div>
  );
}
