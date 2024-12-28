import React from 'react';

const Careers = () => {
  const openPositions = [
    {
      title: "Senior News Editor",
      department: "Editorial",
      location: "Remote/Hybrid",
      description: "Looking for an experienced editor to lead our news coverage team."
    },
    {
      title: "Frontend Developer",
      department: "Technology",
      location: "Remote",
      description: "Join our tech team to build the future of digital news."
    },
    {
      title: "Data Journalist",
      department: "Editorial",
      location: "Hybrid",
      description: "Combine data analysis with storytelling to create compelling news content."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Careers at NewsyVeil</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
        <p className="text-gray-700 mb-4">
          At NewsyVeil, we're always looking for talented individuals who are passionate about journalism, 
          technology, and making a difference in how people consume news.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why NewsyVeil?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Competitive salary and benefits</li>
          <li>Remote-first culture</li>
          <li>Professional development opportunities</li>
          <li>Health and wellness programs</li>
          <li>Collaborative work environment</li>
          <li>Latest tools and technologies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
        <div className="space-y-6">
          {openPositions.map((position, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
              <p className="text-gray-600 mb-2">Department: {position.department}</p>
              <p className="text-gray-600 mb-2">Location: {position.location}</p>
              <p className="text-gray-700">{position.description}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
        <p className="text-gray-700">
          Send your resume and cover letter to careers@newsyveil.com with the position title in the subject line. 
          We review applications on a rolling basis and will contact qualified candidates for interviews.
        </p>
      </section>
    </div>
  );
};

export default Careers;
