import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AuthCards = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: winners = [] } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recent-winners");
      return res.data;
    },
  });
  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        className="mySwiper authcards"
      >
        {winners.map((winner, index) => (
          <SwiperSlide key={index} className="authSlide">
            <img
              src={winner.image}
              className="w-full h-full object-cover"
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AuthCards;
