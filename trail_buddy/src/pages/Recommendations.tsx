import React, { useState } from 'react';
import { mockResources } from '../data/mockData';
import { Resource } from '../types';
import { Play, ExternalLink, Filter, Youtube } from 'lucide-react';

const Recommendations: React.FC = () => {
  const [resources] = useState<Resource[]>(mockResources);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    return categoryMatch;
  });

  const handleResourceAccess = (resource: Resource) => {
    // Open the resource URL in a new tab
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 relative z-10">
          <h1 className="text-3xl font-bold text-gray-900">Learning Resources</h1>
          <p className="text-gray-600 mt-2">Discover curated video content to enhance your learning journey</p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6 mb-8 relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filter by Category</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 relative z-10">
          <p className="text-gray-600">
            Showing {filteredResources.length} video{filteredResources.length !== 1 ? 's' : ''} 
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center space-x-1">
                    <Youtube className="h-3 w-3" />
                    <span>Video</span>
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all">
                    <Play className="h-8 w-8 text-white fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    HD Quality
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 font-medium">{resource.category}</span>
                  <div className="flex items-center space-x-1 text-red-500">
                    <Youtube className="h-4 w-4" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </span>
                  
                  <button 
                    onClick={() => handleResourceAccess(resource)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Youtube className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try selecting a different category to see more content.</p>
          </div>
        )}

        {/* Video Learning Benefits */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 relative z-10">
          <div className="text-center mb-6">
            <Youtube className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Video Learning?</h3>
            <p className="text-gray-600">Discover the power of visual learning with our curated video content</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-red-600 mb-2">Visual</div>
                <p className="text-sm text-gray-600">See concepts in action with visual demonstrations and examples</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-red-600 mb-2">Interactive</div>
                <p className="text-sm text-gray-600">Follow along with hands-on tutorials and practical exercises</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-red-600 mb-2">Flexible</div>
                <p className="text-sm text-gray-600">Learn at your own pace with pause, rewind, and replay options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;