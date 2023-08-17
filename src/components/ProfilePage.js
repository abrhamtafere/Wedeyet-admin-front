import React, { useState } from 'react';

const Profile = () => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="h-full bg-gray-200 p-8">
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="relative">
          <button
            onClick={() => setOpenSettings(!openSettings)}
            className="absolute right-12 mt-4 rounded border border-gray-400 p-2 text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
            title="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              ></path>
            </svg>
          </button>
          {openSettings && (
            <div
              onClick={() => setOpenSettings(false)}
              className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl"
            >
              <div className="py-2 border-b">
                <p className="text-gray-400 text-xs px-6 uppercase mb-1">
                  Settings
                </p>
                <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-700">Share Profile</span>
                </button>
                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-700">Block User</span>
                </button>
                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 20h.01M12 20a8 8 0 110-16 8 8 0 010 16zm0 0v0z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-700">Report User</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="px-8 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">Frontend Developer</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">About</h3>
            <p className="text-gray-600">
              I'm a frontend developer with a passion for creating beautiful and
              user-friendly web interfaces.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Experience</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Senior Frontend Developer at ABC Company</li>
              <li>Frontend Engineer at XYZ Tech</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Education</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Bachelor's Degree in Computer Science</li>
              <li>Web Development Certification from PQR Academy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;