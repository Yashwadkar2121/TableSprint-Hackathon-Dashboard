import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";

function SubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subcategory");
        setSubCategories(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.error || "An error occurred. Please try again."
        );
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Sub Category Name",
        accessor: "sub_category_name",
      },
      {
        Header: "Category Name",
        accessor: "category_name",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <img
            src={`http://localhost:5000/${value}`}
            alt="Sub Category"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value === 1 ? "Active" : "Inactive"),
      },
      {
        Header: "Sequence",
        accessor: "sequence",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-500 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: subCategories,
    });

  const handleEdit = (subCategory) => {
    // Implement edit functionality
    console.log("Edit", subCategory);
  };

  const handleDelete = (subCategoryId) => {
    // Implement delete functionality
    console.log("Delete", subCategoryId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-[#5C218B] min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Sub Categories</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        {subCategories.length > 0 ? (
          <table {...getTableProps()} className="min-w-full">
            <thead>
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroupIndex}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"
                      key={columnIndex}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                        key={cellIndex}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">No subcategories available.</p>
        )}
      </div>
    </div>
  );
}

export default SubCategory;
