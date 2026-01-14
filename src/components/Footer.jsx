import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">Info Links</h3>
            <ul className="space-y-2">
              <li><a href="/syllabus" className="text-gray-400 hover:text-white">Syllabus</a></li>
              <li><a href="/answer-keys" className="text-gray-400 hover:text-white">Answer Key</a></li>
              <li><a href="/Jobs" className="text-gray-400 hover:text-white">Latest Jobs</a></li>
              <li><a href="/results" className="text-gray-400 hover:text-white">Results</a></li>
              <li><a href="/admissions" className="text-gray-400 hover:text-white">Admission</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Social</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Telegram</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Tools</h3>
            <ul className="space-y-2">
                <li><a href="https://www.pdfswift.online" className="text-gray-400 hover:text-white">Image Resizer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Resume Maker</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Typing Test</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Mobile Apps</h3>
            <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Android App</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">iOS App</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Windows App</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {currentYear} Sarkari Result 27. All Rights Reserved.</p>
          <p className="text-xs mt-2">Disclaimer: Please verify all information from official sources. </p>
        </div>
      </div>
    </footer>
  );
}