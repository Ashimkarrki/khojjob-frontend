import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { useQuery, gql } from "@apollo/client";
import JobItem from "../components/JobItem";
import type { propJobType } from "../types/jobType";

const JobsList = () => {
  const GET_ALL_JOB = gql`
    {
      getAllJob {
        jid
        location
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
  `;
  const { data, loading } = useQuery(GET_ALL_JOB);
  const [jobs, setJobs] = useState<propJobType[]>([]);
  useEffect(() => {
    setJobs(data?.getAllJob || []);
  }, [data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  if (loading) {
    return "loading";
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-deep-navy to-teal-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Job Opportunities
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover the job openings in Nepal's tech industry
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-12 py-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-sand-gold focus:border-transparent text-gray-900 placeholder-gray-500 text-lg"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="p-2 text-gray-400 hover:text-teal-ocean transition duration-200"
                  >
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-deep-navy">
              {jobs.length} Jobs
            </h2>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="space-y-6">
          {jobs.map((job: propJobType) => {
            return (
              <JobItem key={job.jid} job={job} from="list" setJobs={setJobs} />
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-teal-ocean text-teal-ocean font-semibold py-3 px-8 rounded-lg hover:bg-teal-ocean hover:text-white transition duration-300">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsList;
