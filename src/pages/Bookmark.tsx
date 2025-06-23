import { useEffect, useState } from "react";
import { Search, Bookmark, Trash2 } from "lucide-react";
import { gql, useMutation, useQuery } from "@apollo/client";
import type { propJobType } from "../types/jobType";
import JobItem from "../components/JobItem";
import toast from "react-hot-toast";
import { Link } from "react-router";
const Bookmarks = () => {
  const CLEAR_BOOKMARKS = gql`
    mutation {
      removeAllBookmark {
        count
      }
    }
  `;
  const GET_ALL_BOOKMARK = gql`
    {
      getAllBookMark {
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
  const { data, loading } = useQuery(GET_ALL_BOOKMARK, {
    fetchPolicy: "network-only",
  });
  const [remove_all, { loading: clearLoading, error }] =
    useMutation(CLEAR_BOOKMARKS);
  const [jobs, setJobs] = useState<propJobType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setJobs(data?.getAllBookMark || []);
  }, [data]);

  const clearAllBookmarks = async () => {
    try {
      const res = await remove_all();
      toast.success(
        `Removed ${res?.data?.removeAllBookmark?.count || 0} bookmarks`
      );
      setJobs([]);
    } catch {
      toast.error(error?.graphQLErrors[0]?.message || "Undefined Error");
    }
  };

  if (loading) {
    return "Loading......";
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-deep-navy to-teal-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Bookmark className="h-10 w-10 text-sand-gold mr-3 fill-current" />
              <h1 className="text-4xl font-bold text-white">My Bookmarks</h1>
            </div>
            <p className="text-xl text-gray-200 mb-8">
              Your saved job opportunities, Ashimkarrki
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search your bookmarked jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-sand-gold focus:border-transparent text-gray-900 placeholder-gray-500 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-deep-navy">
              {jobs.length} Bookmarked Jobs
            </h2>
          </div>

          {jobs.length > 0 && (
            <div className="mt-4 sm:mt-0">
              <button
                disabled={clearLoading}
                onClick={clearAllBookmarks}
                className="flex items-center px-4 py-2 text-clay-red hover:bg-clay-red hover:text-white border border-clay-red rounded-lg transition duration-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        {jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job) => {
              return (
                <JobItem
                  key={job.jid}
                  job={job}
                  setJobs={setJobs}
                  from={"bookmark"}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No bookmarked jobs found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Start exploring jobs and bookmark the ones you're interested in"}
            </p>
            <Link to={"/alljobs"}>
              <button className="bg-gradient-to-r from-teal-ocean to-deep-navy hover:from-deep-navy hover:to-teal-ocean text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Browse Jobs
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
