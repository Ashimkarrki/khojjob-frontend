import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Globe,
  //   Building2,
  Pickaxe,
  ExternalLink,
  Search,
} from "lucide-react";
import type { propJobType } from "../types/jobType";
import { Link, useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { getColor } from "../lib/tagcolor";
import JobItem from "../components/JobItem";
const CompanyPage = () => {
  const { cid } = useParams();
  const GET_COMPANY = gql`
    query ($id: ID!) {
      getCompany(companyId: $id) {
        name
        location
        workson
        cid
        description
        website
        jobs {
          jid
          location
          website
          tags
          experience
          salary
          title
          level
          start_date
          last_date
          types
          company {
            name
          }
        }
      }
    }
  `;

  const { data, loading } = useQuery(GET_COMPANY, {
    variables: { id: cid },
  });
  console.log(data);

  const company = data?.getCompany;
  const jobs = company?.jobs;
  console.log(jobs);

  const [searchTerm, setSearchTerm] = useState("");

  // const getDaysAgo = (dateString: string) => {
  //   const jobDate = new Date(dateString);
  //   const today = new Date();
  //   const diffTime = Math.abs(today.getTime() - jobDate.getTime());
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays === 1) return "1 day ago";
  //   if (diffDays <= 7) return `${diffDays} days ago`;
  //   if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  //   return `${Math.ceil(diffDays / 30)} months ago`;
  // };

  // const filteredJobs = jobs.filter(
  //   (job) =>
  //     job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     job.tags.some((tag) =>
  //       tag.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  // );
  if (loading) {
    return "Loading....";
  }
  // return "hello";
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to={"/allcompany"}>
              <button className="flex items-center text-teal-ocean hover:text-deep-navy transition duration-200 mr-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Companies
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              {/* Company Logo and Name */}
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 bg-gradient-to-r from-teal-ocean to-deep-navy rounded-xl flex items-center justify-center text-white font-bold text-xl mr-6">
                  {company.name
                    .split(" ")
                    .map((word: string) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-deep-navy mb-2">
                    {company.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2 text-teal-ocean" />
                    <span className="text-lg">{company.location}</span>
                  </div>

                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-teal-ocean hover:text-deep-navy transition duration-200"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>Visit Website</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>

              {/* Company Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {company.workson.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getColor(
                      tag
                    )}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Company Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-deep-navy mb-3">
                  About {company.name}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {company.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Jobs Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-deep-navy mb-2">
                Open Positions
              </h2>
              <p className="text-gray-600">
                {jobs.length} jobs available at {company.name}
              </p>
            </div>

            {/* Job Search */}
            <div className="mt-4 sm:mt-0 w-full sm:w-80">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-ocean focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {jobs.map((job: propJobType) => (
              <JobItem job={job} key={job.jid} />
            ))}
          </div>

          {/* Empty State */}
          {jobs.length === 0 && (
            <div className="text-center py-8">
              <Pickaxe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
