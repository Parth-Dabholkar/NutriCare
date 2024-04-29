export default function About() {
  return (
    <div className=" flex flex-col justify-evenly items-center">
      <div className=" max-w-5xl mx-auto text-center md:text-5xl text-xl p-6 m-8 font-mono font-bold border-b-2 border-slate-300">
        <h1 className=""><span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>About</span> us..</h1>
      </div>
      <div className=" w-[750px] m-2 text-center">
        <p className=" text-blue-900 text-xl font-semibold font-mono italic border-b-2 border-slate-300 p-4">
        "Discover the insights behind your meals with our cutting-edge nutritional analysis. We break down every bite, helping you make informed and healthier choices."
        </p>
      </div>
      <div className=" text-center font-serif w-[900px] border-b-2 border-slate-300 p-4 m-2">
          <h2 className=" text-2xl font-semibold m-2">Who We Are</h2>
          <p className=" text-lg">
          NutriCare is a nutritional analysis website established in January 2024, driven by a dedicated team of five members who share a passion for diet and fitness. We are a group of health enthusiasts with diverse backgrounds in nutrition, fitness, and wellness. Our goal is to empower individuals with the knowledge they need to make healthier dietary choices. By providing in-depth nutritional analysis, we aim to be your trusted partner in achieving a balanced and fulfilling lifestyle.
          </p>
      </div>
      <div className=" text-center font-serif w-[900px] border-b-2 border-slate-300 p-4 m-2">
          <h2 className=" text-2xl font-semibold m-2">How We Care</h2>
          <p className=" text-lg">
          At NutriCare, we believe in personalized guidance and support. Our approach is centered on understanding your unique needs and goals, ensuring that the insights we provide are tailored to help you succeed. Our commitment to caring goes beyond data analysis; we engage with our users, listen to their feedback, and continually improve our services. With NutriCare, you can trust that your journey to better health is backed by a team that genuinely cares about your well-being.          </p>
      </div>
      <div className=" flex justify-between items-center m-4">
        <img className=" max-w-lg" src="../images/collage.JPG" alt="" />
        <img className=" max-w-[16rem]" src="../images/createrecipe.jpeg" alt="" />
      </div>
    </div>
  )
}
