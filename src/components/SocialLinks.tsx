import React from 'react';

const SocialLinks: React.FC = () => (
  <div className="flex space-x-4">
    {/* GitHub */}
    <a
      href="https://github.com/parodave"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className="p-3 rounded-full backdrop-blur-lg border border-white/10 bg-gradient-to-tr from-black/60 to-black/40 shadow-lg hover:shadow-2xl hover:shadow-white/20 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:border-white/30 hover:bg-gradient-to-tr hover:from-white/10 hover:to-black/40 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      <div className="relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          className="w-5 h-5 text-white group-hover:text-white/90 transition-colors duration-300 fill-current"
        >
          <path
            d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 30.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"
          />
        </svg>
      </div>
    </a>

    {/* LinkedIn */}
    <a
      href="https://linkedin.com/in/karim-h-497634248"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="p-3 rounded-full backdrop-blur-lg border border-blue-500/20 bg-gradient-to-tr from-black/60 to-black/40 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-110 hover:-rotate-2 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer hover:border-blue-500/50 hover:bg-gradient-to-tr hover:from-blue-500/10 hover:to-black/40 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      <div className="relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors duration-300 fill-current"
        >
          <path
            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.42 0 53.62 0 23.75 24.28 0 54.59 0c30.42 0 54.51 24.28 54.51 53.62 0 29.8-24.09 54.48-54.51 54.48zM447.9 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.9-43.8 31.3-2.3 5.6-2.8 13.3-2.8 21.1V448h-92.5s1.2-241.2 0-266.1h92.4v37.7c-.2.3-.5.7-.7 1h.7v-1c12.3-19 34.2-46.1 83.4-46.1 60.9 0 106.6 39.8 106.6 125.2V448z"
          />
        </svg>
      </div>
    </a>
  </div>
);

export default SocialLinks;
