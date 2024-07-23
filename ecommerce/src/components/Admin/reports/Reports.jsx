import React from "react";
import DashNavbar from "../dashboard/components/DashNavbar";

const Reports = () => {
  const data = [
    { id: 1, name: "John Doe", report: "Sales Report", date: "2024-07-23" },
    {
      id: 2,
      name: "Jane Smith",
      report: "Inventory Report",
      date: "2024-07-22",
    },
    {
      id: 3,
      name: "Robert Brown",
      report: "Customer Report",
      date: "2024-07-21",
    },
  ];

  return (
    <div className="w-auto md:w-full lg:w-full xl:w-full mx-3">
      <DashNavbar />
      <div className="border-b-2"></div>
      <h1 className="text-center font-lato font-bold text-xl">Reports</h1>
      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Report</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.report}</td>
                <td className="py-2 px-4 border-b">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
