import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import crown from "../../../assets/crown.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const winners = [
  {
    _id: "w001",
    name: "Ariyan Khan",
    photo: "https://randomuser.me/api/portraits/men/51.jpg",
    contestName: "Minimal Logo Design Challenge",
    contestId: "c001",
    prize: 3000,
    type: "Image Design",
    position: 1,
    winningDate: "2025-12-21",
    message: "Creativity is intelligence having fun!",
  },
  {
    _id: "w002",
    name: "Mehnaz Sultana",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    contestName: "Technology Article Writing",
    contestId: "c002",
    prize: 2500,
    type: "Article Writing",
    position: 1,
    winningDate: "2025-12-26",
    message: "Words can shape the world — one story at a time.",
  },
  {
    _id: "w003",
    name: "Robin Sheikh",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
    contestName: "Short Story Competition",
    contestId: "c005",
    prize: 800,
    type: "Writing",
    position: 1,
    winningDate: "2025-12-19",
    message: "Stories live forever — the writers do too.",
  },
  {
    _id: "w004",
    name: "Nusrat Afsana",
    photo: "https://randomuser.me/api/portraits/women/36.jpg",
    contestName: "UI/UX Mobile App Design",
    contestId: "c006",
    prize: 4000,
    type: "UI/UX Design",
    position: 1,
    winningDate: "2025-12-23",
    message: "Good design is invisible — but powerful.",
  },
  {
    _id: "w005",
    name: "Tahmid Hossain",
    photo: "https://randomuser.me/api/portraits/men/23.jpg",
    contestName: "Best Gaming Review",
    contestId: "c003",
    prize: 1500,
    type: "Gaming Review",
    position: 1,
    winningDate: "2025-12-16",
    message: "Gamers don't die — they level up!",
  },
];

const Winners = () => {
  return (
    <div className="mt-[200px] w-11/12 xl:w-9/12 mx-auto">
      <h2 className="text-5xl text-center font-bold my-14 mb-[200px]">
        Recent Winners
      </h2>
      <div className="flex flex-col-reverse lg:flex-row justify-between">
        <div className="">
          <h3 className="text-4xl font-bold text-blue-500">
            Congratulations to Our Recent
            <br /> Winners! 🏆
          </h3>
          <p className="text-xl font-semibold mt-5">
            Meet this week's top champions who
            <br /> impressed everyone with their talent.
          </p>

          <div className=" flex flex-col gap-7">
            <p className="text-2xl font-bold ">Join today To win:</p>
            <button
              className="block text-center bg-blue-600 text-white py-2 rounded-xl
                     hover:bg-blue-700 transition-colors duration-300"
            >
              Join Now
            </button>
          </div>
        </div>
        <div className="lg:w-[50%] h-[500px] lg:h-[300px] relative ">
          <img
            src={crown}
            className=" absolute -top-40 z-10 right-0 w-[300px]"
            alt=""
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
            className="mySwiper"
          >
            {winners.map((winner, index) => (
              <SwiperSlide key={index}>
                <div className="w-full flex justify-end">
                  <div
                    className="w-[300px] h-[300px] rounded-full shadow-lg shadow-blue-400"
                    style={{
                      backgroundImage: `url(${winner.photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="relative  lg:top-[50%] -right-[300px] lg:-left-[300px] ">
                      <p className="text-2xl font-bold text-amber-600">
                        {winner.name}
                      </p>
                      <p className="text-xl text-blue-400">
                        {winner.contestName} winner
                      </p>
                      <p className="text-xl text-blue-400 font-bold">
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
  );
};

export default Winners;
