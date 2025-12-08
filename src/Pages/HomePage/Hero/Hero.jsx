import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { useLoaderData } from "react-router";

function Hero() {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => {
          const hero = item.hero;

          return (
            <SwiperSlide key={index}>
              {/* Background Image */}
              <div
                className="w-full h-[600px] bg-cover bg-center relative flex justify-center items-center md:rounded-4xl"
                style={{ backgroundImage: `url(${hero.image})` }}
              >
                <div>
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 md:rounded-4xl"></div>

                  {/* Content */}
                  <div className="relative z-10 text-white max-w-2xl mx-auto mt-40 px-4">
                    <h1 className="text-4xl font-bold mb-4 animate-fade-in">
                      {hero.title}
                    </h1>

                    <p className="text-lg mb-6 opacity-90">{hero.subtitle}</p>

                    <div className="flex gap-4">
                      <a
                        href={hero.buttons.primary.link}
                        className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-500 transition"
                      >
                        {hero.buttons.primary.text}
                      </a>

                      <a
                        href={hero.buttons.secondary.link}
                        className="px-6 py-3 bg-white/20 backdrop-blur rounded-lg text-white font-semibold hover:bg-white/30 transition"
                      >
                        {hero.buttons.secondary.text}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Hero;
