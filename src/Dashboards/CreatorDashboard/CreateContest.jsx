import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hoocks/UseAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import { toast } from "react-toastify";

const CreateContest = () => {
  const { user } = UseAuth();
  const [selectDate, setSelectDate] = useState(null);
  const { register, handleSubmit } = useForm();

  const axiosSecure = UseAxiosSecure();

  const handleCreateContest = async (data) => {
    if (!selectDate) {
      toast.error("Please select a deadline");
      return;
    }

    data.deadline = selectDate;
    data.createdAt = new Date();
    data.creatorEmail = user.email;

    try {
      const res = await axiosSecure.post("/contests", data);

      if (res.data?.insertedId) {
        toast.success("Contest created successfully");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      <form onSubmit={handleSubmit(handleCreateContest)} className="mt-[50px]">
        <h3 className="text-[28px] font-extrabold">
          Enter your Contest details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <fieldset className="fieldset">
              <label className="label">Contest Name</label>
              <input
                type="text"
                {...register("name")}
                className="input w-full"
                placeholder="Contest Name"
              />
              <label className="label">Contest Thumbnail</label>
              <input
                type="text"
                {...register("image")}
                className="input w-full"
                placeholder="URl"
              />
              <label className="label">Contest Price</label>
              <input
                type="number"
                {...register("price")}
                className="input w-full"
                placeholder="Contest Price"
              />
              <label className="label">Contest Prize</label>
              <input
                type="number"
                {...register("prize")}
                className="input w-full"
                placeholder="Contest Prize"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label">Contest Type</label>
                  <select
                    {...register("type")}
                    defaultValue="Select Contest Type"
                    className="select appearance-none w-full"
                  >
                    <option disabled={true}>Select Contest Type</option>
                    <option>Game Testing</option>
                    <option>Designing</option>
                    <option>Creation</option>
                    <option>Gaming</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="label">Set Deadline</label>
                  <DatePicker
                    selected={selectDate}
                    onChange={(date) => setSelectDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className="w-full input"
                  ></DatePicker>
                </div>
              </div>
              <label className="label">Task Instructions</label>
              <textarea
                className="w-full resize-none h-20 input"
                {...register("taskInstruction")}
              ></textarea>
            </fieldset>
          </div>

          <div className=""></div>
        </div>

        <input
          type="submit"
          className="btn btn-primary text-black"
          value="Create Contest"
        />
      </form>
    </div>
  );
};

export default CreateContest;
