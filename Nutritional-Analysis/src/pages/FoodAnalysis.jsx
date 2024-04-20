import { Card } from "flowbite-react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import data from '../assets/data.js';
import { useState } from "react";

const [search,setSearch] = useState('');

const data01 = [
    { name: 'Carbohydrates', value: 400 },
    { name: 'Fats', value: 300 },
    { name: 'Protiens', value: 300 },
    { name: 'Saturated Fats', value: 200 },
    { name: 'Sodium', value: 200 },
    { name: 'Pottasium', value: 200 },
    { name: 'Cholestrol', value: 200 },
    { name: 'Sugar', value: 200 },
  ];

export default function FoodAnalysis() {
  return (
    <div>
        {/* Search Form */}
        <div className="m-2">
            <div className=" max-w-5xl mx-auto text-center md:text-6xl text-xl m-8 font-mono font-bold">
                <h1 className=""><span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>Analyse</span> the Nutrition in your Food</h1>
            </div>
  
            <form class="max-w-md mx-auto">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input onChange={(e)=>setSearch(e.target.value)}type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Food Items...." required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

        </div>
        <div className=" mx-auto m-8 flex max-w-7xl gap-4">
            {/* Left Side */}
            <div className=" flex flex-1 flex-col flex-wrap gap-4">
                <div className=" flex flex-row gap-4">
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Saturated Fat
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            0.0
                        </p>
                    </Card>
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Carbohydrates
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            0.0
                        </p>
                    </Card>
                </div>
                <div className=" flex flex-row gap-4">
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Fats
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            0.0
                        </p>
                    </Card>
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Protiens
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            0.0
                        </p>
                    </Card>
                </div>
                <div className=" flex flex-row gap-4">
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Sodium
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            0.0
                        </p>
                    </Card>
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Pottasium
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            0.0
                        </p>
                    </Card>
                </div>
                <div className=" flex flex-row gap-4">
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Sugar
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            0.0
                        </p>
                    </Card>
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Cholestrol
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            0.0
                        </p>
                    </Card>
                </div>
            </div>
            {/* Right Side */}
            <div className=" flex flex-1 flex-col">
                <div>
                    calorie
                </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={800} height={800}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data01}
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                label
                            />
                        <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
            </div>  
        </div>
    </div>
  )
}
