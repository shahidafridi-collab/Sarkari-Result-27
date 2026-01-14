import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    // This is the main banner
    // It's styled with a dark background, yellow border, and centered text
    <div className="w-full bg-blue-950 text-white p-3 text-center text-sm border-b-4 border-yellow-400">
      
      {/* We use max-w-7xl and mx-auto to match your page layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title with Icon */}
        <div className="flex items-center justify-center mb-2">
          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
          <h3 className="font-bold text-lg text-yellow-400">Disclaimer</h3>
        </div>
        
        {/* Disclaimer Text */}
        <p className="text-xs md:text-sm leading-relaxed">
          <strong>This is not an official government website.</strong> All the information provided on this website is for informational purposes only. We collect data from various official websites and news sources.
        </p>
        <p className="text-xs md:text-sm mt-1 leading-relaxed">
          We are not responsible for any inadvertent errors. We strongly advise all users to verify the details (like exam dates, application fees, etc.) from the respective official government websites before applying for any job.
        </p>
      </div>
    </div>
  );
}