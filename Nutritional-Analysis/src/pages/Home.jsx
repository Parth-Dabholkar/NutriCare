import { Card } from "flowbite-react"

export default function Home() {
  return (
    <div>
      <header className=" w-full h-auto">
        <img className=" w-full h-auto md:h-[900px]" src="../images/ogbackdrop.png" alt="" />
      </header>

      <div className="h-auto w-100 flex flex-wrap flex-col items-center text-center p-10 bg-slate-200">
        <div className="w-full h-auto flex flex-wrap flex-col items-center">
          <p className=" text-slate-700 font-bold text-3xl md:text-5xl text-center">"The Services We Provide"</p>
          <div className=" w-36 h-1 border-b-4 border-slate-950 mt-2 rounded-2xl md:mt-4 mb-12"></div>
          <div className=" w-full h-auto flex flex-wrap justify-evenly gap-8">
              <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="../images/dietrec.jpeg"
              >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Diet Recommender
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Recommends Diet Based on user health conditions. Best suited for people who are starting their journey towards fitness.
              </p>
              </Card>
              <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="../images/nutritionanaly.jpeg"
              >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Food Nutrition Analysis
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Gives all the required analysis of the food you eat. Best suited for people who are calorie conscious.
              </p>
              </Card>
              <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="../images/bmical.jpeg"
              >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                BMI Calculator
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Calculates Body Mass Index (BMI) based on user height and weight. Best suited for people who are gaining or losing weight.
              </p>
              </Card>
              <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="../images/createrecipe.jpeg"
              >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create Recipe
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Create recipes of your own. Share your recipes with people worldwide. Analyse your recipe using our food analysis feature.
              </p>
              </Card>
              <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc="../images/chatbot.jpg"
              >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                ChatBot
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Introducing our revolutionary chatbot: the ultimate solution for all your diet-related challenges. From personalized meal planning to nutritional advice tailored to your goals, our AI-powered assistant delivers expert guidance instantly. 
              </p>
              </Card>
          </div>
        </div>
      </div>

      <div className="h-auto w-100 flex flex-wrap flex-col items-center text-center p-10 bg-slate-300">
        <div className="w-full h-auto flex flex-wrap flex-col items-center">
          <p className=" text-slate-700 font-bold text-3xl md:text-5xl text-center">Leave Us a feedback</p>
          <div className=" w-36 h-1 border-b-4 border-slate-950 mt-2 rounded-2xl md:mt-4 mb-12"></div>
          
        </div>
      </div>
    </div>
  )
}
