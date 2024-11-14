import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.error || "An error occurred. Please try again."
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Product Name",
        accessor: "name",
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
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value === 1 ? "Active" : "Inactive"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-500 mr-2"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-500"
            >
              <i className="fa-solid fa-trash"></i>
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
      data: products,
    });

  const handleEdit = (product) => {
    // Implement edit functionality
    console.log("Edit", product);
  };

  const handleDelete = (productId) => {
    // Implement delete functionality
    console.log("Delete", productId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="">
      {" "}
      <div className="flex flex-col md:flex-row justify-between items-center p-2 gap-3 md:gap-8">
        <div className="flex items-center gap-2">
          <img
            src="/Sidebar/Group.svg"
            alt="homeLogo"
            className="h-6 w-6 md:h-8 md:w-8"
          />
          <h2 className="text-2xl lg:text-4xl font-bold text-black">
            Products
          </h2>
        </div>
        <div className="flex gap-1 md:hidden lg:block">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              className="py-1 lg:py-2 pl-10 pr-3 border-2 rounded-xl w-full xl:w-[60vh] 2xl:w-[70vh] border-[#41414311]"
              placeholder="Search"
            />
          </div>
          <button className="border-2 rounded-xl bg-[#683294] text-white px-1 py-1 text-xs md:hidden whitespace-nowrap">
            Add Products
          </button>
        </div>
        <button className="hidden md:block border-2 rounded-xl bg-[#683294] text-white px-2 py-1 lg:px-2 lg:py-2 whitespace-nowrap ">
          Add Products
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-2 md:mt-3">
        {products.length > 0 ? (
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroupIndex}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-1 py-2 md:px-1 md:py-2 border-b-2 whitespace-nowrap border-gray-300 bg-gray-200  text-[6px]  md:text-[10px]   font-medium text-gray-600 uppercase tracking-wider"
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
                        className="px-1 py-1 md:px-2 md:py-2 whitespace-nowrap text-[6px] md:text-[10px] lg:text-sm border-b border-gray-200 text-center"
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
          <p className="text-gray-700 text-center py-4">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
