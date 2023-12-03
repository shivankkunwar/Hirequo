import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(()=>{
      fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response) => response.json())
        .then((data) => setData(data));
  }, [])

  

  
  return (
    <div>

<div className="userdetails-outer m-10">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white  px-12">
        <div className="flex justify-between">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
              <div className="flex">
                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg
                    width="18"
                    height="18"
                    className="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-black font-thin"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive p-5 bg-gray-100 rounded-xl">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 border-b-2 border-gray-200 text-left ">

            <tr>
              <th className='p-3 w-12 mr-5'><input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></th>
              <th className="w-45 p-3 text-sm font-semibold tracking-wide text-left ">
                Name
              </th>
              <th className="w-72 p-3 text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="w-56 p-3 text-sm font-semibold tracking-wide text-left">
                Role
              </th>
              
              <th className="w-72 p-3 text-sm font-semibold tracking-wide text-left">
               Actions
              </th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default App
