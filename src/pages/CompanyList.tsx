import { useState } from "react";
import { Search, MapPin, Building2 } from "lucide-react";
import { Link } from "react-router";
import { gql, useQuery } from "@apollo/client";
import { getColor } from "../lib/tagcolor";
const AllCompany = () => {
  const GET_COMPANY = gql`
    {
      getAllCompany {
        name
        location
        workson
        cid
      }
    }
  `;
  const { data, loading } = useQuery(GET_COMPANY);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return "Loading...";
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-deep-navy to-teal-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Companies in Nepal
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover tech companies hiring in Nepal
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search companies, locations, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-4 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-sand-gold focus:border-transparent text-gray-900 placeholder-gray-500 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-deep-navy">
            {data.getAllCompany.length} Companies Found
          </h2>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.getAllCompany.map((company) => (
            <Link
              to={`/company/${company.cid}`}
              key={company.cid}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden group cursor-pointer"
            >
              <div className="p-6">
                {/* Company Header */}
                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 bg-gradient-to-r from-teal-ocean to-deep-navy rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                      {company.name
                        .split(" ")
                        .map((word: string) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy group-hover:text-teal-ocean transition duration-200">
                        {company.name}
                      </h3>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-teal-ocean" />
                    <span className="text-sm">{company.location}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {company.workson.map((tag: string, index: number) => (
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
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {data.getAllCompany.length === 0 && (
          <Link to="/company" className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No companies found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AllCompany;
