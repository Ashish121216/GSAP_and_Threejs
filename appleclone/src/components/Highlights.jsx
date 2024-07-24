import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";
const Highlights = () => {
  useGSAP(() =>  
    gsap.to("#title",{opacity:1, y:0, delay:1.5}),
    gsap.to(".link",{opacity : 1, y : 0, delay : 1.5, stagger:0.25})
  );
  return (
    <div>
      <section id="#highlights" className="w-screen bg-zinc-950 h-full ">
        <div className="screen-max-width">
          <div className="w-full md:flex justify-between items-end mb-6 ml-6">
            <h1 id="title" className="text-3xl font-bold text-zinc-500  opacity-0">Get the Highlights.</h1>
            <div className="flex items-end pr-12 gap-4">
              <p className="link">
                Watch the film
                <img src="/assets/images/watch.svg"
                 alt="watch" 
                 width={12}
                 height={12}/>
              </p>
              <p className="link">
                Watch the Event
                <img src="/assets/images/right.svg" 
                alt="right"
                width={6}
                height={6} />
              </p>
            </div>
          </div>
          <VideoCarousel/>
        </div>
      </section>
    </div>
  )
}

export default Highlights
