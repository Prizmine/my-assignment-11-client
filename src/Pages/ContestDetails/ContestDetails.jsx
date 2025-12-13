import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";

const ContestDetails = () => {
  const axiosSecure = UseAxiosSecure();
  const { id } = useParams();
  const { data = {} } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  // console.log(data);
  return (
    <div className="">
      <div className="p-5 md:p-9 bg-black/70 rounded-3xl w-[70%] mx-auto">
        <div className="w-full h-[500px] overflow-hidden mx-auto rounded-2xl shadow-2xl shadow-blue-400/50">
          <img
            src={data.image}
            alt=""
            className="w-full h-full mx-auto object-cover object-center transition-transform duration-500 hover:scale-110 "
          />
        </div>

        <div className=" mt-10 flex flex-col gap-5 text-white">
          <h3 className="text-4xl font-bold text-yellow-500">{data.name}</h3>
          <p className="text-2xl font-semibold">
            Participants count:{" "}
            <span className="text-yellow-500">{data.participants}</span>
          </p>

          <p className="text-xl">
            <span className="font-bold">Task Details:</span> <br></br>
            {data.description}
          </p>
          <p className="text-xl font-bold">
            Prize:
            <span className="text-yellow-500 ml-2">{data.prize}</span> taka
          </p>
        </div>
        {data.status === "confirmed" && (
          <div className="flex justify-between">
            <p className=""></p>
            <button className="btn bg-amber-200 hover:bg-amber-300 mt-5">
              Register Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDetails;
