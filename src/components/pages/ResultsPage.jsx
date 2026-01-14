

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Eye } from 'lucide-react';
// import { resultListings } from '../../data/resultListings';
async function getResultData(){
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/9fb5f95e93ed95eba1959d1a18ac6bf7/raw/combine_result');
  if(!res.ok){
    throw new Error('Failed to Load');
  }
  const data = await res.json();
  return data;
}

const ResultsPage = async() => {
  const resultListings = await getResultData();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">All Latest Results</h1>
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
            {resultListings.map((result) => (
              <div key={result.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <Link 
                      href={`/results/${result.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {result.title}
                    </Link>
                    {result.id.includes('ssc') && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="col-span-3">
                    <span className="text-gray-600">{result.resultDate}</span>
                  </div>
                  <div className="col-span-3">
                    <Link
                      href={`/results/${result.id}`}
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

export default ResultsPage;