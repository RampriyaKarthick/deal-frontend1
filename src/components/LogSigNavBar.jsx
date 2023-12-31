import React from 'react'
import { Link } from 'react-router-dom';

function LogSigNavBar() {
  return (
    <nav className="bg-blue-700 fixed top-0 left-0 w-full z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center h-16"> {/* Updated line */}
        <div className="flex"></div>
        <div className="flex items-center">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
  
          <Link
            to="/profile"
            className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  </nav>
  
  )
}

export default LogSigNavBar