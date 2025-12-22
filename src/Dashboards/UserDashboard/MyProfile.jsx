import React, { useState } from "react";
import UseAuth from "../../Hoocks/UseAuth";
import { useOutletContext } from "react-router";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { participations, wins } = useOutletContext();
  const { user, upDateUserProfile } = UseAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  const totalParticipations = participations.length;
  const totalWins = wins.length;

  const winPercentage =
    totalParticipations > 0
      ? Math.round((totalWins / totalParticipations) * 100)
      : 0;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      await upDateUserProfile({
        displayName: name,
        photoURL: photo,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-base-100 rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center">
        <img
          src={user?.photoURL}
          alt="profile"
          className="w-32 h-32 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="bg-base-100 rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Winning Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-600/20 rounded-lg p-4 text-center">
            <p className="font-medium">Participations</p>
            <p className="text-2xl font-bold">{totalParticipations}</p>
          </div>

          <div className="bg-green-600/20 rounded-lg p-4 text-center">
            <p className="font-medium">Wins</p>
            <p className="text-2xl font-bold">{totalWins}</p>
          </div>

          <div className="bg-blue-600/20 rounded-lg p-4 text-center">
            <p className="font-medium">Win Percentage</p>
            <p className="text-2xl font-bold">{winPercentage}%</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${winPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-base-100 rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="btn bg-blue-600 text-white w-full"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
