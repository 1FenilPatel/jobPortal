import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';

const JobListing = () => {
  const [loading, setLoading] = useState(true);
  const { allJobs } = useSelector((store) => store.job);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Memoize derived data
  const cities = useMemo(() => {
    return [...new Set(allJobs.map((job) => job.location))];
  }, [allJobs]);

  const jobTitles = useMemo(() => {
    return [...new Set(allJobs.map((job) => job.title))];
  }, [allJobs]);

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      return (
        (selectedCity === '' || job.location === selectedCity) &&
        (selectedTitle === '' || job.title === selectedTitle) &&
        (searchQuery === '' ||
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [allJobs, searchQuery, selectedCity, selectedTitle]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedTitle('');
  };

  if (loading) {
    return <BarLoader className="mb-4 mx-auto" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="container mx-auto px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center pb-8 gradient-title">
        Latest Job Openings
      </h1>

      {/* Search & Filter Section */}
      <div className="p-6 rounded-lg shadow-lg mb-3">
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 px-4 text-md border rounded-md bg-transparent text-white outline-none"
          />

          {/* City Dropdown */}
          <select
            className="h-12 px-4 text-md border rounded-md bg-transparent text-white outline-none"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="" className="bg-black text-white">Select City</option>
            {cities.map((city, index) => (
              <option className="bg-black text-white" key={index} value={city}>{city}</option>
            ))}
          </select>

          {/* Job Title Dropdown */}
          <select
            className="h-12 px-4 text-md border rounded-md bg-transparent text-white outline-none"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          >
            <option value="" className="bg-black text-white">Select Job Title</option>
            {jobTitles.map((title, index) => (
              <option className="bg-black text-white" key={index} value={title}>{title}</option>
            ))}
          </select>

          <Button
            variant="red"
            type="button"
            onClick={clearFilters}
            className="h-12 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Clear Filters
          </Button>
        </form>
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center text-center py-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-700">No Jobs Found</h2>
          <p className="text-lg text-gray-500 mt-3">Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListing;
