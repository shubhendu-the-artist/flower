import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function About() {
  
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('#about .flower', {
      y: 200,
      duration: 1,
      scrollTrigger: {
        trigger: '#about',
        start: '-30% 10%',
        end: '25% 15%',
        scrub: 1,
        markers: true,
        toggleActions: 'play none none reverse'
      },
    })
  },[])

  return (
    <div id="about" className="p-10 flex gap-12 mx-10 rounded-lg h-[90vh]">
      <div className="me h-full w-[30%] rounded-t-xl overflow-hidden mask-b-from-80% mask-b-to-transparent">
        <img className="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-90 ease-in-out object-center origin-center w-[125%] max-w-none" src="/images/me.png" alt="" />
      </div>
      <div className="flower-container relative rounded h-full w-[65%] overflow-hidden mask-b-from-80% mask-b-to-transparent">
        <p>About Me</p>
        <hr />
        <p className="text-lg">
          I am a passionate web developer with a strong interest in creating dynamic and user-friendly web applications. With a background in computer science and hands-on experience in front-end and back-end development, I enjoy tackling complex problems and turning ideas into reality. My goal is to continuously learn and grow as a developer while contributing to innovative projects that make a positive impact.
        </p>
        <img className='flower relative -top-12 h-[120%] object-cover object-top' src="/images/flower.png" alt="flowers" />
      </div>
    </div>
  )
}

export default About