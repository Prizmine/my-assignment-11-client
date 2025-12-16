import React from "react";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import UseAuth from "../../Hoocks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const { user, role, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/roles`);
      return res.data;
    },
  });

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user?.email || !role) {
    return null;
  }

  const handleRoleChange = async (id, roleValue) => {
    try {
      const res = await axiosSecure.patch(`/roles/${id}?email=${user.email}`, {
        role: roleValue,
      });

      if (res.data.modifiedCount) {
        toast.success("Successfully updated");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update role", error.code);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-9 min-h-[70vh]">
      <h4 className="text-2xl font-bold mb-6 text-center">Manage Users</h4>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {data.map((singleUser, index) => {
              const modalId = `modal_desktop_${singleUser._id}`;

              return (
                <tr key={singleUser._id}>
                  <th>{index + 1}</th>
                  <td>{singleUser.displayName}</td>
                  <td>{singleUser.email}</td>
                  <td>{singleUser.role || "user"}</td>
                  <td>
                    <button
                      className="btn text-2xl"
                      onClick={() =>
                        document.getElementById(modalId).showModal()
                      }
                    >
                      <MdOutlineArrowDropDownCircle />
                    </button>

                    <dialog id={modalId} className="modal modal-middle">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Manage User</h3>

                        <div className="mt-4">
                          <p className="text-lg break-all">
                            Change role of: {singleUser.email}
                          </p>

                          <select
                            defaultValue={singleUser.role || "user"}
                            className="select mt-2 w-full"
                            onChange={(e) =>
                              handleRoleChange(singleUser._id, e.target.value)
                            }
                          >
                            <option value="admin">Admin</option>
                            <option value="creator">Creator</option>
                            <option value="user">User</option>
                          </select>
                        </div>

                        <div className="modal-action">
                          <form method="dialog" className="w-full">
                            <button className="btn w-full">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((singleUser) => {
          const modalId = `modal_mobile_${singleUser._id}`;

          return (
            <div
              key={singleUser._id}
              className="border rounded-xl p-4 shadow bg-base-100"
            >
              <div className="mb-2">
                <h3 className="font-bold text-lg">{singleUser.displayName}</h3>
                <p className="text-sm text-gray-500 break-all">
                  {singleUser.email}
                </p>
              </div>

              <p className="text-sm mb-3">
                <strong>Role:</strong>{" "}
                <span className="badge badge-outline">
                  {singleUser.role || "user"}
                </span>
              </p>

              <button
                className="btn btn-sm btn-outline w-full"
                onClick={() => document.getElementById(modalId).showModal()}
              >
                Manage Role
              </button>

              <dialog
                id={modalId}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Manage User</h3>

                  <div className="mt-4">
                    <p className="text-lg break-all">
                      Change role of: {singleUser.email}
                    </p>

                    <select
                      defaultValue={singleUser.role || "user"}
                      className="select mt-2 w-full"
                      onChange={(e) =>
                        handleRoleChange(singleUser._id, e.target.value)
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="creator">Creator</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  <div className="modal-action">
                    <form method="dialog" className="w-full">
                      <button className="btn w-full">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageUsers;
