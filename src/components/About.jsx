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
        toggleActions: 'play none none reverse'
      },
    })
      .from('#about .me', {
        scale: 0.5,
        scrollTrigger: {
          trigger: '#about',
          start: '-30% 10%',
          end: '25% 15%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        },
      }, "<")
  }, [])

  return (
    <section id="about" className="px-10 py-20 flex flex-col-reverse md:flex-row justify-center gap-12 md:mx-10 rounded-lg md:h-[90vh]">
      <div className="me h-full md:w-[30%] mx-auto rounded-t-xl overflow-hidden mask-b-from-80% mask-b-to-transparent">
        <img className="relative left-1/2 top-1/2 -translate-x-1/2 md:-translate-y-1/2 transition-transform duration-300 hover:scale-90 ease-in-out object-center origin-center w-[125%] max-w-none" src="/images/me.png" alt="" />
      </div>
      <div className="flower-container relative rounded h-full md:w-[65%] overflow-hidden mask-b-from-80% mask-b-to-transparent">

        <hr />
        <p className="text-lg mt-2">
          I'm <b>Shubhendu Garai</b>, a passionate <span className='font-extralight text-teal-500'>Website Developer</span> & <span className='font-extralight text-blue-400'>AI/ML Engineer</span> focused on building modern digital experiences and intelligent solutions. I blend creativity with technology to develop interactive web applications and explore the possibilities of AI. <span className='text-purple-400 font-extralight'>Always learning, building, and innovating.</span>
        </p>
        <img className='flower relative -top-12 h-[120%] object-cover object-top' src="/images/flower.png" alt="flowers" />
      </div>
    </section>
  )
}

export default About