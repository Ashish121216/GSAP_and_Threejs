import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import herovideo from "/assets/videos/hero.mp4";
import samllHroVideo from "/assets/videos/smallHero.mp4";
import { useEffect, useState } from "react";
const Hero = () => {
  const [sourceVideo, setSourceVideo] = useState((window.innerWidth<760) ? samllHroVideo :herovideo);
  const handleVideoSrcset = () => {
    if(window.innerWidth < 760){
      setSourceVideo(samllHroVideo);
    }
    else{
      setSourceVideo(herovideo);
    }
  }
  useEffect(() => {
    window.addEventListener("resize",handleVideoSrcset);
    return () => {
      window.removeEventListener("resize",handleVideoSrcset)
    }
  })
  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, y:25, delay: 1.5 });
    gsap.to("#cta", { opacity: 1, y:-50, delay: 1.5 });
  }, []);
  return (
    <section className="w-full h-[100vh-60px] bg-black relative">
      <div className="w-full h-5/6 flex-center flex-col">
        <p id="hero" className="hero-title">
          Iphone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12 mx-16 my-8">
          <video autoPlay muted playsInline={true} key={sourceVideo}>
            <source src={sourceVideo} type="video/mp4"/>
          </video>
        </div>
        <div id="cta" className="flex flex-col justify-center items-center gap-5 opacity-0">
          <a href="#" className="bg-sky-500 rounded-3xl text-sm font-semibold px-5 py-2 border border-transparent hover:bg-transparent hover:border-sky-500 hover:text-sky-500">Buy</a>
          <p className="text-base font-normal">From $199/Month or $999</p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
