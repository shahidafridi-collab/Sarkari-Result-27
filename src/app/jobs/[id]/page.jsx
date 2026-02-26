// "use client"
export const runtime = "nodejs";

import React from 'react';
import Link from 'next/link';
import BreadcrumbSchema from '../../../components/seo/BreadcrumbSchema';
import HowToSchema from '../../../components/seo/HowToSchema';
// The original react-router-dom imports are commented out, as they should be.
// import { useParams, Link } from 'react-router-dom';

import {
  ArrowLeft, Users, CheckCircle, ExternalLink, Briefcase, CalendarDays,
  Wallet, Target, ClipboardList, UserCheck, FilePenLine,
  Link as LinkIcon, TrendingUp, FileText, HelpCircle, BarChart3, BookOpen
} from 'lucide-react';
// import { jobListings } from '../../../data/jobListingData';

async function getJobsData(id) {
  const res = await fetch('https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const jobs = await res.json();

  const specificJob = jobs.find(j => String(j.id) === id);
  return specificJob;
}


// The corrected JobDetail component
export default async function JobDetail({ params }) {
  // 1. FIX: Get 'id' directly from params. It's an object, not a Promise.
  const { id } = await params;
  console.log(params); // This will show the params object, which should contain the 'id' property.

  // 2. FIX: Pass the 'id' variable, not the entire 'params' object.
  let job;
  try {
    job = await getJobsData(id);
  } catch (error) {
    console.error('Error fetching job:', error);
    job = null;
  }

  // Reusable component for the top info cards
  const InfoCard = ({ icon, title, value, valueColor = 'text-gray-900' }) => (
    <div className="bg-gray-100/70 p-4 rounded-lg flex items-center space-x-4">
      <div className="bg-white p-2 rounded-full shadow-sm">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-lg font-semibold ${valueColor}`}>{value || 'N/A'}</p>
      </div>
    </div>
  );

  // Reusable table component for the sidebar
  const InfoTable = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        {icon}
        {title}
      </h2>
      <table className="w-full text-left">
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b last:border-b-0">
              <td className="py-2.5 pr-2 text-gray-600">{item.label}</td>
              <td className={`py-2.5 pl-2 text-right font-semibold ${item.highlight ? 'text-red-600' : 'text-gray-900'}`}>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Reusable Links Card component
  const LinksCard = ({ title, icon, items }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        {icon}
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium"
            >
              {item.label}
              <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  // Job not found page
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job with ID <strong>{id}</strong> was not found or there was an error loading the data.</p>
          <Link href="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Jobs
          </Link>
        </div>
      </div>
    );
  }

  // --- Data Preparation ---
  const importantDatesItems = job.importantDates ? Object.entries(job.importantDates).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').trim(),
    value: value,
    highlight: key === 'ApplicationEnd',
  })) : [];

  const applicationFeeItems = job.applicationFee ? Object.entries(job.applicationFee).map(([key, value]) => ({
    label: key,
    value: value,
    highlight: false,
  })) : [];

  const vacancyItems = job.vacancies?.breakdown ? job.vacancies.breakdown.map(item => ({
    label: item.category,
    value: item.count?.toLocaleString() || '0',
    highlight: false,
  })) : [];

  const selectionProcessItems = job.selectionProcess ? job.selectionProcess.map(step => ({
    label: <CheckCircle className="h-5 w-5 text-green-500 inline-block mr-2" />,
    value: step
  })) : [];

  const importantLinksItems = job.importantLinks ? Object.entries(job.importantLinks).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value: value,
  })) : [];

  // New data preparation for additional sections (with safe access)
  const cutoffItems = job.cutoffTrends ? [
    { label: '2024 Expected Cutoff', value: job.cutoffTrends?.expected2024 || 'N/A' },
    { label: '2023 Final Cutoff', value: job.cutoffTrends?.final2023 || 'N/A' },
    { label: '2022 Final Cutoff', value: job.cutoffTrends?.final2022 || 'N/A' },
    { label: '2021 Final Cutoff', value: job.cutoffTrends?.final2021 || 'N/A' },
  ] : [];

  const analysisItems = job.jobAnalysis ? [
    { 
      label: 'Competition Level', 
      value: job.jobAnalysis?.competitionLevel || 'N/A', 
      highlight: job.jobAnalysis?.competitionLevel === 'High' 
    },
    { 
      label: 'Application Trend', 
      value: job.jobAnalysis?.applicationTrend || 'N/A' 
    },
    { 
      label: 'Success Rate', 
      value: job.jobAnalysis?.successRate || 'N/A' 
    },
    { 
      label: 'Difficulty Level', 
      value: job.jobAnalysis?.difficultyLevel || 'N/A' 
    },
  ] : [];

  const faqItems = job.faq ? job.faq.map(item => ({
    question: item.question || '',
    answer: item.answer || ''
  })) : [];

  const syllabusItems = job.jobSyllabus?.topics ? job.jobSyllabus.topics.map(topic => ({
    topic: topic.name || '',
    subtopics: topic.subtopics?.join(', ') || ''
  })) : [];

  const overviewItems = job.jobOverview ? [
    { label: 'Job Type', value: job.jobOverview?.jobType || 'N/A' },
    { label: 'Job Level', value: job.jobOverview?.jobLevel || 'N/A' },
    { label: 'Work Location', value: job.jobOverview?.workLocation || 'N/A' },
    { label: 'Department', value: job.jobOverview?.department || 'N/A' },
    { label: 'Recruitment Type', value: job.jobOverview?.recruitmentType || 'N/A' },
    { label: 'Notification Release', value: job.jobOverview?.notificationRelease || 'N/A' },
  ] : [];


  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.sarkariresult27.com" },
          { name: "Jobs", url: "https://www.sarkariresult27.com/jobs" },
          { name: `${job.title}`, url: `https://www.sarkariresult27.com/jobs/${id}` },
        ]} 
      />
      <HowToSchema
        title="How to Complete Counselling Process 2026"
        process={[]} // Add your actual process array here
      />
      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <div className="mb-6">
            <Link href="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Jobs
            </Link>
          </div>

          {/* --- Main Job Header --- */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div>
                <p className="text-blue-600 font-semibold mb-1">{job.organization || 'Government Organization'}</p>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{job.title || 'Job Title'}</h1>
              </div>
              <a 
                href={job.importantLinks?.applyOnline || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto flex-shrink-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center shadow-sm"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Apply Now
              </a>
            </div>
          </div>

          {/* --- Key Info Bar --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard 
              icon={<Users className="h-6 w-6 text-blue-500" />} 
              title="Total Vacancies" 
              value={job.vacancies?.total?.toLocaleString() || 'N/A'} 
            />
            <InfoCard 
              icon={<Wallet className="h-6 w-6 text-green-500" />} 
              title="Salary" 
              value={job.salary || 'Not specified'} 
            />
            <InfoCard 
              icon={<CalendarDays className="h-6 w-6 text-red-500" />} 
              title="Application Deadline" 
              value={job.importantDates?.ApplicationEnd || 'Check notification'} 
              valueColor="text-red-600" 
            />
          </div>

          {/* --- Two-Column Layout --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Overview Section */}
              {job.jobOverview && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Briefcase className="h-6 w-6 mr-3 text-blue-600" />
                    Job Overview
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {overviewItems.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
                        <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  {job.jobOverview?.description && (
                    <p className="text-gray-700 leading-relaxed mt-4">{job.jobOverview.description}</p>
                  )}
                </div>
              )}

              {job.description && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Briefcase className="h-6 w-6 mr-3 text-blue-600" />
                    Job Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base">{job.description}</p>
                </div>
              )}

              {/* Job Analysis Section */}
              {job.jobAnalysis && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                    Job Analysis
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analysisItems.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 font-medium mb-1">{item.label}</p>
                        <p className={`text-lg font-semibold ${item.highlight ? 'text-red-600' : 'text-gray-800'}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  {job.jobAnalysis?.analysis && (
                    <p className="text-gray-700 leading-relaxed mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      {job.jobAnalysis.analysis}
                    </p>
                  )}
                </div>
              )}
             

              <div className="col-span-1 top-8 space-y-8 lg:hidden">
                {/* Important Dates */}
                {importantDatesItems.length > 0 && (
                  <InfoTable
                    title="Important Dates"
                    icon={<CalendarDays className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={importantDatesItems}
                  />
                )}

                {/* Cutoff Trends Sidebar */}
                {cutoffItems.length > 0 && (
                  <InfoTable
                    title="Cutoff Trends"
                    icon={<TrendingUp className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={cutoffItems}
                  />
                )}

                {/* application fee */}
                {applicationFeeItems.length > 0 && (
                  <InfoTable
                    title="Application Fee"
                    icon={<Wallet className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={applicationFeeItems}
                  />
                )}
                {/* vacancy details */}
                {vacancyItems.length > 0 && (
                  <InfoTable
                    title="Vacancy Details"
                    icon={<Users className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={vacancyItems}
                  />
                )}
                {/* important link */}
                {importantLinksItems.length > 0 && (
                  <LinksCard
                    title="Important Links"
                    icon={<LinkIcon className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={importantLinksItems}
                  />
                )}
              </div>

              {/* Eligibility Criteria */}
              {(job.eligibility || job.ageLimit) && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <UserCheck className="h-6 w-6 mr-3 text-blue-600" />
                    Eligibility Criteria
                  </h2>
                  {job.eligibility && <p className="text-gray-700 mb-4">{job.eligibility}</p>}
                  {job.ageLimit && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                      <p className="font-semibold text-gray-800">Age Limit: <span className="font-normal">{job.ageLimit}</span></p>
                    </div>
                  )}
                </div>
              )}

              {/* Post with Eligibility Table */}
              {job.postAndEligbt && job.postAndEligbt.sections && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-3 text-blue-600" />
                    Post-wise Eligibility
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 font-semibold text-gray-700 border-b">Post Name</th>
                          <th className="p-3 font-semibold text-gray-700 border-b">Vacancy</th>
                          <th className="p-3 font-semibold text-gray-700 border-b">Eligibility</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.postAndEligbt.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-3 text-gray-800 font-medium">{sec.name || 'N/A'}</td>
                            <td className="p-3 text-gray-800">{sec.vacancies || 'N/A'}</td>
                            <td className="p-3 text-gray-800">{sec.Eligibility || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Age Limits by Category */}
              {job.ageLimits && Array.isArray(job.ageLimits) && job.ageLimits.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <UserCheck className="h-6 w-6 mr-3 text-blue-600" />
                    Age Limit Relaxation
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.ageLimits.map((item, i) => (
                      <li key={i}>
                        <span className="font-semibold">{item.category || 'Category'}:</span> {item.count || 'N/A'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Vacancy Category-wise Table */}
              {job.vacanciesCategory && job.vacanciesCategory.sections && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-3 text-blue-600" />
                    Category-wise Vacancy Details
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 font-semibold text-gray-700 border-b">Post Name</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">General</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">OBC</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">EWS</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">SC/ST</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.vacanciesCategory.sections.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-3 text-gray-800 font-medium">{sec.name || 'N/A'}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.general || 'N/A'}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.obc || 'N/A'}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.ews || 'N/A'}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.scst || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Exam Pattern */}
              {job.examPattern && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <ClipboardList className="h-6 w-6 mr-3 text-blue-600" />
                    Exam Pattern
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-semibold">{job.examPattern.totalMarks || 'N/A'}</span> Total
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-semibold">{job.examPattern.duration || 'N/A'}</span> Duration
                    </div>
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg">
                      <span className="font-semibold">{job.examPattern.negativeMarking || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 font-semibold text-gray-700 border-b">Section Name</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">Questions</th>
                          <th className="p-3 font-semibold text-gray-700 border-b text-center">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.examPattern.sections?.map((sec, i) => (
                          <tr key={i} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-3 text-gray-800">{sec.name || 'N/A'}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.questions || 'N/A'}</td>
                            <td className="p-3 text-gray-800 text-center">{sec.marks || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Cutoff Trends Section */}
              {job.cutoffTrends && job.cutoffTrends.yearlyData && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
                    Previous Year Cutoff Trends
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 font-semibold text-gray-700 border-b">Year</th>
                          <th className="p-3 font-semibold text-gray-700 border-b">General Category</th>
                          <th className="p-3 font-semibold text-gray-700 border-b">OBC Category</th>
                          <th className="p-3 font-semibold text-gray-700 border-b">SC/ST Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {job.cutoffTrends.yearlyData.map((data, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 last:border-0">
                            <td className="p-3 text-gray-800 font-semibold">{data.year || 'N/A'}</td>
                            <td className="p-3 text-gray-800">{data.general || 'N/A'}</td>
                            <td className="p-3 text-gray-800">{data.obc || 'N/A'}</td>
                            <td className="p-3 text-gray-800">{data.scst || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {job.cutoffTrends.note && (
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                      <p className="text-sm text-gray-700">{job.cutoffTrends.note}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Job Syllabus Section */}
              {job.jobSyllabus && job.jobSyllabus.topics && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                    Complete Syllabus
                  </h2>
                  <div className="space-y-6">
                    {syllabusItems.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.topic}</h3>
                        <p className="text-gray-700 mb-3">{item.subtopics}</p>
                        {job.jobSyllabus.topics[index]?.weightage && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                            Weightage: {job.jobSyllabus.topics[index].weightage}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  {job.jobSyllabus.importantNotes && (
                    <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Important Notes:</h4>
                      <p className="text-gray-700">{job.jobSyllabus.importantNotes}</p>
                    </div>
                  )}
                </div>
              )}


              {/* Additional information */}
              {job.additionalInfo?.applicationSteps?.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FilePenLine className="h-6 w-6 mr-3 text-blue-600" />
                    How to Apply
                  </h2>
                  <ol className="space-y-4 list-decimal list-inside text-gray-700">
                    {job.additionalInfo.applicationSteps.map((step, index) => (
                      <li key={index} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>
              )}

               {/* FAQ Section */}
              {job.faq && faqItems.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <HelpCircle className="h-6 w-6 mr-3 text-blue-600" />
                    Frequently Asked Questions (FAQs)
                  </h2>
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                          <span className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3">
                            Q
                          </span>
                          {item.question}
                        </h3>
                        <p className="text-gray-700 ml-9  border-l-2 border-blue-300 pl-4">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (Sticky Sidebar) */}
            <div className="lg:col-span-1 lg:sticky top-8 space-y-8 hidden lg:block">
              <div className='space-y-4'>
                {/* Important Dates */}
                {importantDatesItems.length > 0 && (
                  <InfoTable
                    title="Important Dates"
                    icon={<CalendarDays className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={importantDatesItems}
                  />
                )}

                {/* Cutoff Trends Sidebar */}
                {cutoffItems.length > 0 && (
                  <InfoTable
                    title="Cutoff Trends"
                    icon={<TrendingUp className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={cutoffItems}
                  />
                )}

                {/* application fee */}
                {applicationFeeItems.length > 0 && (
                  <InfoTable
                    title="Application Fee"
                    icon={<Wallet className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={applicationFeeItems}
                  />
                )}

                {/* vacancy details */}
                {vacancyItems.length > 0 && (
                  <InfoTable
                    title="Vacancy Details"
                    icon={<Users className="h-5 w-5 mr-2.5 text-blue-600" />}
                    items={vacancyItems}
                  />
                )}
              </div>

              {/* selection Process */}
              {selectionProcessItems.length > 0 && (
                <InfoTable
                  title="Selection Process"
                  icon={<Target className="h-5 w-5 mr-2.5 text-blue-600" />}
                  items={selectionProcessItems}
                />
              )}

              {/* Job Analysis Summary */}
              {analysisItems.length > 0 && (
                <InfoTable
                  title="Quick Analysis"
                  icon={<BarChart3 className="h-5 w-5 mr-2.5 text-blue-600" />}
                  items={analysisItems}
                />
              )}

              {/* important link */}
              {importantLinksItems.length > 0 && (
                <LinksCard
                  title="Important Links"
                  icon={<LinkIcon className="h-5 w-5 mr-2.5 text-blue-600" />}
                  items={importantLinksItems}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}