import {
  Calendar,
  Clock,
  MapPin,
  Pickaxe,
  User,
  School,
  Eye,
} from "lucide-react";
import { Link } from "react-router";
import { getColor } from "../lib/tagcolor";
import type { propJobType } from "../types/jobType";
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
function JobItem({
  job: {
    jid,
    tags,
    title,
    location,
    experience,
    level,
    types,
    salary,
    last_date,
    company,
  },
  from,
  setJobs,
}: {
  job: propJobType;
  from: string | undefined;
  setJobs: React.Dispatch<React.SetStateAction<propJobType[]>>;
}) {
  const MARK = gql`
    mutation ($jid: ID!) {
      removeNewJob(jid: $jid) {
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

  const [mark, { error: markError, loading: markLoading }] = useMutation(MARK);

  const handleMarkAsRead = async () => {
    let res;
    try {
      res = await mark({ variables: { jid: jid } });
      setJobs(res.data?.removeNewJob);

      toast.success(`Marked as read`);
    } catch (err) {
      console.log(err);

      toast.error(markError?.graphQLErrors[0]?.message || "Undefined Error");
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-300 hover:border-teal-ocean">
      {/* Job Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag: string, index: number) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-medium rounded-full ${getColor(
              tag
            )}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Job Title */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-deep-navy mb-2 hover:text-teal-ocean transition duration-200 cursor-pointer">
            {title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <School className="h-4 w-4 mr-2 text-teal-ocean" />
            <span className="font-medium">{company.name}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {from === "new" && (
            <button
              onClick={handleMarkAsRead}
              disabled={markLoading}
              className="p-2 text-gray-400 hover:text-teal-ocean transition duration-200"
              title="Mark as read"
            >
              <Eye className="h-8 w-8" />
            </button>
          )}
          {/* <button
            onClick={handleAddBookmark}
            disabled={bookmarkLoading}
            className="p-2 text-gray-400 hover:text-clay-red transition duration-200"
            title="Add to bookmarks"
          >
            <Bookmark className="h-8 w-8" />
          </button>
          {from == "bookmark" && (
            <button className="p-2 text-gray-400 hover:text-teal-ocean transition duration-200">
              <BookmarkX className="h-8 w-8" />
            </button>
          )} */}
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-2 text-teal-ocean" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock className="h-4 w-4 mr-2 text-teal-ocean" />
          <span>{experience}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <User className="h-4 w-4 mr-2 text-teal-ocean" />
          <span>{level}</span>
        </div>
        <div className="flex items-center">
          <Pickaxe className="h-4 w-4 mr-2 text-teal-ocean" />
          <span
            className={`px-2 py-1 text-xs font-medium rounded-md border ${getColor(
              types
            )}`}
          >
            {types}
          </span>
        </div>
      </div>

      {/* Salary and Dates */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 border-t border-gray-100">
        <div className="mb-2 sm:mb-0">
          <span className="text-lg font-semibold text-deep-navy">{salary}</span>
          <span className="text-gray-500 text-sm ml-2">per month</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            <span>Apply by: {new Date(last_date).toLocaleDateString()}</span>
          </div>
          {/* <div className="text-gray-500">
                        Posted {getDaysAgo(start_date)}
                      </div> */}
        </div>
      </div>

      {/* Apply Button */}
      <Link to={`/job/${jid}`} className="mt-4 pt-3 border-t border-gray-100">
        <button className="w-full sm:w-auto bg-gradient-to-r from-teal-ocean to-deep-navy hover:from-deep-navy hover:to-teal-ocean text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105">
          Apply Now
        </button>
      </Link>
    </div>
  );
}

export default JobItem;
