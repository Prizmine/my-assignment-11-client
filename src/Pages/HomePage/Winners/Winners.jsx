import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import crown from "../../../assets/crown.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hoocks/UseAxiosSecure";
import { Link } from "react-router";

const Winners = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: winners = [] } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recent-winners");
      return res.data;
    },
  });

  const defaultUserImgageUrl = "../../../assets/default-user.png";

  return (
    <section className="relative py-24 lg:py-40 ">
      <div className="container mx-auto px-4 w-full xl:w-10/12">
        <div className="text-center mb-16 lg:mb-24 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight relative inline-block">
            {/* <span className="absolute inset-x-0 bottom-0 h-2 bg-amber-400/50 transform -skew-x-12"></span> */}
            <span className="relative">Recent Winners</span>
          </h2>
          <p className="text-lg  mt-4 max-w-2xl mx-auto">
            Celebrate our top champions! Their skill and dedication secured
            their victory—and yours could be next.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center relative z-10">
          <div className="lg:w-1/2 p-6 sm:p-8 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-blue-200/50 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl font-bold text-blue-700 leading-snug">
                <span className="text-amber-500">Big Cheers</span> to Our Recent
                Winners! 🏆
              </h3>
              <p className="text-lg text-gray-600">
                Witness the talent that takes the crown. These participants
                impressed everyone with their outstanding performance.
              </p>
            </div>

            <div className="pt-4 border-t border-dashed border-gray-200 space-y-4">
              <p className="text-xl font-bold text-gray-700 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Ready for your winning moment?
              </p>
              <Link
                to={"/all-contests"}
                className="w-full px-10 py-3 text-lg font-semibold bg-blue-600 text-white rounded-xl shadow-xl shadow-blue-400/50
                             hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                Join a Contest Now
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[380px] sm:h-[480px] lg:h-[450px] relative">
            <img
              src={crown}
              className="absolute -top-21 lg:-top-25 left-1/2 transform -translate-x-1/2 w-36 sm:w-48 lg:w-56 z-20"
              alt="Crown icon"
            />
            <Swiper
              spaceBetween={30}
              loop={true}
              navigation={false}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[EffectFade, Navigation, Pagination, Autoplay]}
              className="mySwiper h-full"
            >
              {winners.map((winner, index) => (
                <SwiperSlide key={index} className="flex items-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
                    <div
                      className="w-full h-full rounded-full border-4 border-blue-500 shadow-2xl shadow-blue-400/70 transition-all duration-500 hover:scale-105"
                      style={{
                        backgroundImage: `url(${
                          winner.image || defaultUserImgageUrl
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                               p-3 sm:p-4 bg-white border border-gray-200 rounded-xl shadow-xl shadow-gray-300/50 text-center min-w-[200px] sm:min-w-[250px] transition-all duration-500 hover:shadow-2xl"
                      >
                        <p className="text-xl sm:text-2xl font-extrabold text-amber-600 leading-tight">
                          {winner.name}
                        </p>
                        <p className="text-md sm:text-lg text-blue-500 font-medium mt-1">
                          {winner.contestName} Winner
                        </p>
                        <p className="text-lg text-blue-600 font-bold mt-1">
                          Prize: ৳ {winner.prize}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winners;
