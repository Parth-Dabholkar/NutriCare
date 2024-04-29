import { Card } from "flowbite-react"
import axios from 'axios'
import { useState } from "react";

export default function Home() {
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/send-feedback', { email, message });
      setFeedbackSent(true);
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('An error occurred while sending feedback.');
    }
  }

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
          <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
    <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Feedback</h2>
    <p className="mb-5 leading-relaxed text-gray-600">If you had any issues or you liked our product, please share
        with us!
    </p>
    {feedbackSent ? (
        <p className="text-green-500">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm leading-7 text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="text-sm leading-7 text-gray-600">Message</label>
            <textarea
              id="message"
              name="message"
              className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" type="submit">
            Send
          </button>
          <p className="mt-3 text-xs text-gray-500">Feel free to connect with us on social media platforms.</p>
        </form>
      )}
</div>
          
        </div>
      </div>
    </div>
  )
}

