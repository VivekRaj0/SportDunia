import { useState } from "react";
import {data} from "../data";
import InfiniteScroll from "react-infinite-scroll-component";

const CollegeList = () => {
  let end=10;
  let start =0;
  const [query, setQuery] = useState("");
  const [dataSource, setDataSource] = useState(data);
  const [order, setOrder] = useState("ASC");
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      start = 10;
      end = data.length;
      setDataSource(...data,data.slice(start,end));
    }, 1500);
  };
  const sorting = (col) => {
    if(order === "ASC") {
      const sorted = [...dataSource].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 :-1
      );
      setDataSource(sorted);
      setOrder("DSC");
    }
    if(order === "DSC") {
      const sorted = [...dataSource].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 :-1
      );
      setDataSource(sorted);
      setOrder("ASC");
    }
  }
  const sortingNum = (col) => {
    if(order === "ASC") {
      const sorted = [...dataSource].sort((a, b) =>
        a > b ? 1 :-1
      );
      setDataSource(sorted);
      setOrder("DSC");
    }
    if(order === "DSC") {
      const sorted = [...dataSource].sort((a, b) =>
        a < b ? 1 :-1
      );
      setDataSource(sorted);
      setOrder("ASC");
    }
  }
  return (
    <div>
      <form className="mt-2 max-w-md ml-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-56 p-4 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            required
            onChange={(e) => setQuery(e.target.value).toUpperCase}
          />
        </div>
      </form>
      <div className="table-wrp block max-h-96 font-'sans': ['Helvetica', 'Arial', 'sans-serif']">
      <InfiniteScroll
        dataLength={data.length}          
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
      <table className="mx-3  w-full mt-2 text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
        <thead className="text-xs text-gray-700 border-b sticky top-0 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-align-center">
            <th className="px-10 py-3" onClick={()=>sortingNum("CD_Rating")}>CD Rating</th>
            <th className="px-6 py-3" onClick={()=>sorting("College")}>Colleges</th>
            <th className="px-6 py-3" onClick={()=>sortingNum("Course_Fee")}>Course Fee</th>
            <th className="px-6 py-3">Placement</th>
            <th className="px-6 py-3" onClick={()=>sortingNum("User_Review")}>User Review</th>
            <th className="px-6 py-3" onClick={()=>sortingNum("Ranking")}>Ranking</th>
          </tr>
        </thead>
        <tbody className="h-96 overflow-y-auto">
          {dataSource.slice(start,end).filter(item => item.College.toLowerCase().includes(query)).map((item, index) => (
            <tr key={index} className=" hover:bg-orange-200 hover:text-blue-500">
              <td className="w-10 px-10 py-3 mb-2">#{item.CD_Rating}</td>
              <td className="px-10 py-3">
                {item.College}
                <div className="pt-20">
                  <span className="pr-20  hover:underline  cursor-pointer">
                    <a>Apply Here</a>
                  </span>
                  <span className="pr-20  hover:underline  cursor-pointer"><a>Download brochure</a></span>
                  <span className=" hover:underline  cursor-pointer"><a>Add to Compare</a></span>
                </div>
              </td>
              <td className="px-6 py-3">Rs. {item.Course_Fee} LPA
              <div className="pt-20"><span className=" hover:underline  cursor-pointer"><a>Add to Compare</a></span></div>
              </td>
              <td className="px-6 py-3"><p className="pb-2">Average:</p>{item.Placement}
              <div className="pt-20"><span className=" hover:underline  cursor-pointer"><a>Add to Compare</a></span></div></td>
              <td className="px-6 py-3">{item.User_Review}</td>
              <td className="px-6 py-3">{item.Ranking}</td>
            </tr>
          ))}
       
        </tbody>
      </table>
      </InfiniteScroll>
      </div>
    </div>
  );
};

export default CollegeList;
