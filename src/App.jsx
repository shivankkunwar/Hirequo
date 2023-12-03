import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import "./App.css";

function App() {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  
  const filteredData = Data.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  function handleSearch(e){
    setSearch(e.target.value);
  }

  //pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePrevClick = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // deleting and editing
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});
  const handleDelete = (id) => {
    setData(Data.filter((user) => user.id !== id));
    console.log("deletes");
  };
  const handleEdit = (id) => {
    setEditingId(id);
    setEditingData(Data.find((user) => user.id === id));
  };

  const handleSave = (id) => {
    setData(Data.map((user) => (user.id === id ? editingData : user)));
    setEditingId(null);
    setEditingData({});
  };

  const handleNameChange = (e) => {
    setEditingData({ ...editingData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEditingData({ ...editingData, email: e.target.value });
  };

  const handleRoleChange = (e) => {
    setEditingData({ ...editingData, role: e.target.value });
  };

  // selected rows

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div>
      <div className="userdetails-outer mx-10">
        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white  px-12">
          <div className="flex justify-between">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
              <div className="flex justify-between flex-wrap items-stretch w-full h-full mb-6 relative">
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
                  onChange={(e)=>setSearch(e.target.value)}


                 
                />
              </div>
            </div>
            <div
              className="flex bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => {
                setData(Data.filter((user) => !selectedRows.includes(user.id)));
                setSelectedRows([]);
              }}
            >
              <MdDeleteForever size="30px" />
            </div>
          </div>
        </div>
        <div className="table-responsive border bg-gray-100 ">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b-2 border-gray-200 text-left ">
              <tr>
                <th className="p-3 w-12 mr-5">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={currentData.every((user) =>
                      selectedRows.includes(user.id)
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(currentData.map((user) => user.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </th>
                <th className="w-45 p-3 text-sm font-semibold tracking-wide text-left ">
                  Name
                </th>
                <th className=" p-3 text-sm font-semibold tracking-wide text-left">
                  Email
                </th>
                <th className="w-56 p-3 text-sm font-semibold tracking-wide text-left">
                  Role
                </th>

                <th className="w-52 p-3 text-sm font-semibold tracking-wide text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user, i) => (
                <tr
                  key={user.id}
                  className={`bg-white border-b border-gray-200 ${
                    selectedRows.includes(user.id) ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="p-3 w-12 mr-5">
                    {" "}
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={selectedRows.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([...selectedRows, user.id]);
                        } else {
                          setSelectedRows(
                            selectedRows.filter((id) => id !== user.id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editingData.name || ""}
                        onChange={handleNameChange}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="email"
                        value={editingData.email || ""}
                        onChange={handleEmailChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        name="role"
                        value={editingData.role || ""}
                        onChange={handleRoleChange}
                      />
                    ) : (
                      user.role
                    )}
                  </td>

                  <td className="w-20 p-3  text-sm text-gray-700 flex justify-between">
                    {editingId === user.id ? (
                      <button onClick={() => handleSave(user.id)}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Save
                        </button>
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(user.id)}>
                        <FaRegEdit size="15px" />
                      </button>
                    )}{" "}
                    <MdOutlineDelete
                      size="20px"
                      color="red"
                      onClick={() => handleDelete(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="m-2 flex pl-0 rounded list-none flex-wrap">
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            style={{ display: totalPages <= 1 ? "none" : "block" }}
          >
            <GrFormPrevious size="20px" />
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number + 1)}
              className={
                currentPage === number + 1
                  ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              }
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            style={{ display: totalPages <= 1 ? "none" : "block" }}
          >
            <GrFormNext size="20px" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
