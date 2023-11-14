import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="bg-warnaBg mx-auto my-0 max-w-lg max-h-full flex flex-col items-center gap-y-10 p-10">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Oops! Page not found</p>
      <Link to="/">
        <button className="bg-[#98694F] px-[20px] py-[10px] md:px-[42px] md:py-[14px] rounded-md text-white ">
          Return to homepage
        </button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
