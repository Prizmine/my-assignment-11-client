import React from "react";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import UseAuth from "../../Hoocks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const ManageContests = () => {
  const { user, role, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests`);
      return res.data;
    },
  });

  // {
  // "_id": "693bb106c9d6ae8b58ed8718",
  // "name": "Minimal Logo Design Challenge",
  // "image": "https://images.unsplash.com/photo-1527430253228-e93688616381",
  // "description": "Create a clean and minimal logo for a fictional tech startup.",
  // "price": 200,
  // "prize": 3000,
  // "taskInstruction": "Submit your logo in PNG format with transparent background.",
  // "type": "Image Design",
  // "deadline": "2025-12-20T23:59:59",
  // "creatorEmail": "creator1@mail.com",
  // "participants": 12,
  // "winner": null,
  // "status": "approved"
  // },

  console.log(data);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user?.email || !role) {
    return null;
  }

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/contests/${id}`, {
        status: status,
      });

      if (res.data.modifiedCount) {
        toast.success("Successfully updated");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update role", error.code);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl p-9 min-h-[70vh]">
      <h4>Manage Users</h4>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Contest Name</th>
              <th>Creator Email</th>
              <th>Type</th>
              <th>Status</th>

              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {data.map((contest, index) => {
              return (
                <tr
                  key={contest._id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <th className="text-sm">{index + 1}</th>

                  <td className="font-medium text-sm sm:text-base">
                    {contest.name}
                  </td>

                  <td className="text-xs sm:text-sm break-all">
                    {contest.creatorEmail}
                  </td>

                  <td className="text-sm capitalize">{contest.type}</td>

                  <td>
                    <span
                      className={`badge badge-sm sm:badge-md capitalize ${
                        contest.status === "approved"
                          ? "badge-success"
                          : contest.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {contest.status || "pending"}
                    </span>
                  </td>

                  <td className="flex gap-2">
                    <button
                      onClick={() => {
                        handleStatusChange(contest._id, "approved");
                      }}
                      className="btn btn-sm text-xl text-green-500"
                    >
                      <RiVerifiedBadgeFill />
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(contest._id, "rejected");
                      }}
                      className="btn btn-sm text-sm text-yellow-600"
                    >
                      <ImCross />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(contest._id);
                      }}
                      className="btn btn-sm text-xl text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;
