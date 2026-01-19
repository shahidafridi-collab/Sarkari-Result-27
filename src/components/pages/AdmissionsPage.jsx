export const runtime = 'nodejs';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Eye } from 'lucide-react';
// import { admissionListings } from '../../data/admissionListings';

async function getAdmissionData() {
  // Using { cache: 'no-store' } for dynamic rendering, always fetching the latest data.
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/2203569eeb7046f824f7eddb7613d065/raw/gistfile1.txt');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const AdmissionsPage = async () => {

  const admissionListings = await getAdmissionData();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <GraduationCap className="h-8 w-8 text-teal-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">All Latest Admissions</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <h3 className="text-sm font-medium text-gray-700">Post Title</h3>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-gray-700">Post Date</h3>
              </div>
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-gray-700">Actions</h3>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {admissionListings.map((admission) => (
              <div key={admission.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <Link
                      href={`/admissions/${admission.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {admission.title}
                    </Link>
                    {/* {(admission.id.includes('jee') || admission.id.includes('neet')) && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        NEW
                      </span>
                    )} */}
                  </div>
                  <div className="col-span-3">
                    <span className="text-gray-600">{admission.counsellingDates.start}</span>
                  </div>
                  <div className="col-span-3">
                    <Link
                      href={`/admissions/${admission.id}`}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-900 transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;