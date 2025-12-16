import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router";
import UseAuth from "../../Hoocks/UseAuth";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyContests = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const {
    data: contestData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-contests", user?.email, currentPage, itemsPerPage],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const contests = contestData.contests || [];
  const totalContestsCount = contestData.count || 0;

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/contests/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-contests", user?.email, currentPage, itemsPerPage],
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Contest deleted successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: `An error occurred while deleting: ${error.message}`,
      });
    },
  });

  const handleDelete = (id, status) => {
    if (status === "approved" || status === "rejected") {
      Swal.fire({
        icon: "warning",
        title: "Cannot Delete!",
        text: "You can only delete contests that are in 'Pending' status.",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this contest?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Contest is loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to fetch data.
      </div>
    );
  }

  const totalPages = Math.ceil(totalContestsCount / itemsPerPage);
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        🏆 My Created Contests ({totalContestsCount})
      </h2>

      {totalContestsCount === 0 ? (
        <div className="flex justify-center">
          <div>
            <span>You haven't created any contests yet.</span>
            <Link to="/creator-dashboard" className="btn btn-sm btn-info ml-4">
              Create New Contest
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-base-100 rounded-lg shadow-xl">
            <table className="table table-zebra w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price/Prize</th>
                  <th>Status</th>
                  <th className="text-center">Submission</th>
                  <th className="text-center">Edit</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest, index) => (
                  <tr key={contest._id}>
                    <th>{firstIndex + index + 1}</th>
                    <td className="font-medium">{contest.name}</td>
                    <td>{contest.type}</td>
                    <td>
                      ${contest.price} / ${contest.prize}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          contest.status === "pending"
                            ? "badge-warning"
                            : contest.status === "approved"
                            ? "badge-success"
                            : "badge-error"
                        } text-white`}
                      >
                        {contest.status}
                      </span>
                    </td>

                    <td className="text-center">
                      {contest.status === "approved" ? (
                        <Link
                          to={`/creator-dashboard/see-submitions/${contest._id}`}
                          className="btn btn-sm btn-outline btn-info"
                        >
                          <FaEye />
                        </Link>
                      ) : (
                        <button className="btn btn-sm btn-disabled">
                          <FaEye />
                        </button>
                      )}
                    </td>

                    <td className="text-center">
                      {contest.status === "pending" ? (
                        <Link
                          to={`/creator-dashboard/edit-contest/${contest._id}`}
                          className="btn btn-sm btn-outline btn-primary"
                        >
                          <FaEdit />
                        </Link>
                      ) : (
                        <button className="btn btn-sm btn-disabled">
                          <FaEdit />
                        </button>
                      )}
                    </td>

                    <td className="text-center">
                      <button
                        onClick={() =>
                          handleDelete(contest._id, contest.status)
                        }
                        className={`btn btn-sm btn-outline btn-error ${
                          contest.status !== "pending" ? "btn-disabled" : ""
                        }`}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {contests.map((contest) => (
              <div
                key={contest._id}
                className="border rounded-xl p-4 shadow bg-base-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{contest.name}</h3>
                  <span
                    className={`badge ${
                      contest.status === "pending"
                        ? "badge-warning"
                        : contest.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    } text-white`}
                  >
                    {contest.status}
                  </span>
                </div>

                <p className="text-sm mb-1">
                  <strong>Type:</strong> {contest.type}
                </p>
                <p className="text-sm mb-3">
                  <strong>Price / Prize:</strong> ${contest.price} / $
                  {contest.prize}
                </p>

                <div className="flex justify-between gap-2">
                  {contest.status === "approved" ? (
                    <Link
                      to={`/creator-dashboard/see-submitions/${contest._id}`}
                      className="btn btn-sm btn-outline btn-info flex-1"
                    >
                      <FaEye />
                    </Link>
                  ) : (
                    <button className="btn btn-sm btn-disabled flex-1">
                      <FaEye />
                    </button>
                  )}

                  {contest.status === "pending" ? (
                    <Link
                      to={`/creator-dashboard/edit-contest/${contest._id}`}
                      className="btn btn-sm btn-outline btn-primary flex-1"
                    >
                      <FaEdit />
                    </Link>
                  ) : (
                    <button className="btn btn-sm btn-disabled flex-1">
                      <FaEdit />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(contest._id, contest.status)}
                    className={`btn btn-sm btn-outline btn-error flex-1 ${
                      contest.status !== "pending" ? "btn-disabled" : ""
                    }`}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="join">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="join-item btn"
                >
                  « Previous
                </button>

                {[...Array(totalPages)].map((_, page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page + 1)}
                    className={`join-item btn ${
                      currentPage === page + 1 ? "btn-active btn-primary" : ""
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="join-item btn"
                >
                  Next »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyContests;
