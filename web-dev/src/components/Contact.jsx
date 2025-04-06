import React from "react";
const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 w-full flex items-center justify-center">
      <div className="flex flex-col items-center max-w-3xl gap-5 border-2 border-slate-300 rounded-lg shadow-2xl shadow-slate-500 p-3 w-2xl h-2/3 bg-blue-800 text-white">
        <h1 className="text-3xl font-bold text-center mt-5">
          You can reach me on
        </h1>
        <ul className="text-lg gap-2">
          <li>
            Mobile No <span className="px-10">: 9953161116</span>
          </li>
          <li>
            Email ID <span className="px-15">: vineetsingh.next@gmail.com</span>
          </li>
          <li>
            Github <span className="px-18">: vineetsingh23</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
