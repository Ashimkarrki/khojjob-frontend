import {
  ArrowLeft,
  MapPin,
  Calendar,
  School,
  Clock,
  User,
  Pickaxe,
  ExternalLink,
  Mail,
  Globe,
  CheckCircle,
  Share2,
} from "lucide-react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { getColor } from "../lib/tagcolor";
import Bookmark from "../components/Bookmark";

const Job = () => {
  const { jid } = useParams();

  const GET_JOB = gql`
    query ($jid: ID!) {
      getJob(jid: $jid) {
        jid
        tags
        link
        email
        experience
        description
        salary
        level
        title
        responsibility
        start_date
        last_date
        types
        requirements
        location
        website
        cid
        company {
          name
          location
          website
        }
      }
    }
  `;
  const { loading, data } = useQuery(GET_JOB, {
    variables: { jid: jid },
  });
  const job = data?.getJob;
  const company = data?.getJob?.company;

  const getDaysAgo = (dateString: string) => {
    const jobDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - jobDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Job link copied to clipboard!");
    }
  };
  const responsibility = job?.responsibility?.trim().split("\n");
  const requirements = job?.requirements?.trim().split("\n");

  if (loading) {
    return "loading";
  }
  // return "hi";
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button className="flex items-center text-teal-ocean hover:text-deep-navy transition duration-200 mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Jobs
            </button>
            <div className="text-sm text-gray-500">
              Posted {getDaysAgo(job.start_date)} • {job.location}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getColor(
                      tag
                    )}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title and Company */}
              <h1 className="text-3xl font-bold text-deep-navy mb-4">
                {job.title}
              </h1>

              <div className="flex items-center mb-6">
                <School className="h-5 w-5 mr-2 text-teal-ocean" />
                <span className="text-xl font-semibold text-gray-700">
                  {company.name || "nothing"}
                </span>
              </div>

              {/* Job Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-3 text-teal-ocean" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-3 text-teal-ocean" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-3 text-teal-ocean" />
                  <span>{job.level}</span>
                </div>
                <div className="flex items-center">
                  <Pickaxe className="h-4 w-4 mr-3 text-teal-ocean" />
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md border ${getColor(
                      job.types
                    )}`}
                  >
                    {job.types}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-200">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-3 text-teal-ocean" />
                  <a
                    href={`mailto:${job.email}`}
                    className="text-teal-ocean hover:text-deep-navy transition duration-200"
                  >
                    {job.email}
                  </a>
                </div>
              </div>

              {/* Salary and Dates */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-200">
                <div className="mb-4 sm:mb-0">
                  <span className="text-2xl font-bold text-deep-navy">
                    {job.salary}
                  </span>
                  <span className="text-gray-500 ml-2">per month</span>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-teal-ocean" />
                    <span>
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {responsibility.map((res: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal-ocean mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-sunset-orange mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-deep-navy mb-4">
                Benefits & Perks
              </h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-sand-gold mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6  top-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Bookmark jid={jid} />

                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center py-3 px-4 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition duration-300"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>

                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3 px-4 border-2 border-sand-gold text-sand-gold hover:bg-sand-gold hover:text-white rounded-lg transition duration-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Company Site
                </a>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-deep-navy mb-4">
                About {company?.name}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <School className="h-4 w-4 mr-3 text-teal-ocean" />
                  <span className="text-sm">{company?.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-3 text-teal-ocean" />
                  <span className="text-sm">Based in {company?.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-teal-ocean hover:text-deep-navy transition duration-200"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">Visit Company Website</span>
                </a>
              </div>
            </div>

            {/* Application Deadline */}
            <div className="bg-gradient-to-r from-clay-red to-sunset-orange rounded-xl shadow-md p-6 text-white">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="font-semibold">Application Deadline</span>
              </div>
              <div className="text-2xl font-bold mb-1">
                {new Date(job.last_date).toLocaleDateString()}
              </div>
              <div className="text-sm opacity-90">
                {Math.ceil(
                  (new Date(job.last_date).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days remaining
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
