import { Card } from "flowbite-react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios'
import { useState } from "react";
  
export default function FoodAnalysis() {
    const [value, setValue] = useState("")
    const [calorie, setCalorie] = useState(0)
    const [datas, setDatas] = useState([])
    const [carbs, setCarbs] = useState(0)
    const [fats, setFats] = useState(0)
    const [protiens, setProtiens] = useState(0)
    const [sfats, setSFats] = useState(0)
    const [na, setNa] = useState(0)
    const [k, setK] = useState(0)
    const [cho, setCho] = useState(0)
    const [sugar, setSugar] = useState(0)
    const [fibre, setFibre] = useState(0)
    const [nutriScore, setNutriScore] = useState(0)
    const [txtCol, setTxtCol] = useState("")

    const getAnalysis = async (e) => {
        e.preventDefault()
            const result = await axios({
                method : 'GET',
                url : 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
                params : {
                    query : value
                },
                headers: {
                    'X-RapidAPI-Key': 'c01845fc41msh1a9aedc88f9ecbdp1e1056jsn416d98c2bf09',
                    'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
                }
            })

            const nutrition = result['data'][0]
            const prt = Math.round(((result['data'][0]['protein_g'])*100)/100)
            const satFat = Math.round(((result['data'][0]['fat_saturated_g'])*100)/100)
            const sod = Math.round(((result['data'][0]['sodium_mg'])*0.001*100)/100)
            const sug = Math.round(((result['data'][0]['sugar_g'])*100)/100)
            const fib = Math.round(((result['data'][0]['fiber_g'])*100)/100)
            const calor = result['data'][0]['calories']

            console.log(fib)

            const barData = [
                { name : 'Carbs', amt : Math.round(nutrition.carbohydrates_total_g * 100)/100},
                { name : 'TFats', amt : Math.round(nutrition.fat_total_g * 100)/100},
                { name : 'Prt', amt : Math.round(nutrition.protein_g * 100)/100},
                { name : 'SFats', amt : Math.round(nutrition.fat_saturated_g * 100)/100},
                { name : 'Na', amt : Math.round(nutrition.sodium_mg *0.001* 100)/100},
                { name : 'K', amt : Math.round(nutrition.potassium_mg *0.001* 100)/100},
                { name : 'Chls', amt : Math.round(nutrition.cholesterol_mg *0.001* 100)/100},
                { name : 'Sgr', amt : Math.round(nutrition.sugar_g * 100)/100}
            ]

            setCarbs(Math.round(nutrition.carbohydrates_total_g * 100)/100)
            setFats(Math.round(nutrition.fat_total_g * 100)/100)
            setProtiens(Math.round(nutrition.protein_g * 100)/100)
            setSFats(Math.round(nutrition.fat_saturated_g * 100)/100)
            setNa(Math.round(nutrition.sodium_mg * 0.001 * 100)/100)
            setK(Math.round(nutrition.potassium_mg * 0.001 * 100)/100)
            setCho(Math.round(nutrition.cholesterol_mg * 0.001 * 100)/100)
            setSugar(Math.round(nutrition.sugar_g * 100)/100)
            setCalorie(nutrition.calories)
            setFibre(Math.round(nutrition.fiber_g * 100)/100)
            const finScore = ((prt/calor)*10)+((fib/calor)*5)-((sug/calor)*8)-((satFat/calor)*10)-((sod)*5)
            console.log(finScore)
            setNutriScore(finScore)

            const newCol = finScore < 0.35 ? 'text-red-500' : finScore <= 0.45 ? 'text-yellow-500' : 'text-green-500'
            setTxtCol(newCol) 

            setDatas(barData)
      }

  return (
    <div>
        {/* Search Form */}
        <div className=" m-2 flex flex-col justify-evenly items-center gap-4 w-screen">
            <div className=" max-w-5xl mx-auto text-center md:text-6xl text-xl m-8 font-mono font-bold">
                <h1 className=""><span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>Analyse</span> the Nutrition in your Food</h1>
            </div>
  
            <form className=" w-[600px] mx-auto">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Food Items...." required />
                    <button onClick={getAnalysis}
                     className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Analyze</button>
                </div>
            </form>

            <div>
                <Card
                    className="max-w-lg"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="../images/nutriScore.jpg"
                    >
                    <h5 className={`text-2xl font-bold tracking-tight text-center ${txtCol}`}>
                        {nutriScore} 
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                        Score
                    </p>
                    </Card>
                    <div className=" flex flex-col justify-evenly items-center">
                        <div class="inline-flex items-center m-2">
                            <span class="size-4 inline-block bg-red-500 rounded-full me-2"></span>
                            <span class="text-black"> less than 0.35 : To be consumed occasionaly</span>
                        </div>
                        <div class="inline-flex items-center m-2">
                            <span class="size-4 inline-block bg-yellow-500 rounded-full me-2"></span>
                            <span class="text-black"> between 0.35 and 0.45 : To be consumed in a controlled manner</span>
                        </div>
                        <div class="inline-flex items-center m-2">
                            <span class="size-4 inline-block bg-green-500 rounded-full me-2"></span>
                            <span class="text-black"> above 0.45 : Healthy Food</span>
                        </div>
                    </div>
            </div>

        </div>
        <div className=" mx-auto m-8 flex max-w-7xl gap-4">
            {/* Left Side */}
            <div className=" flex flex-1 flex-col flex-wrap gap-4">
                <div className=" flex flex-row gap-4">
                    <Card className=" max-w-sm w-96"  imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Saturated Fat
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            {sfats} g
                        </p>
                    </Card>
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Carbohydrates
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            {carbs} g
                        </p>
                    </Card>
                </div>
                <div className=" flex flex-row gap-4">
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Fats
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            {fats} g
                        </p>
                    </Card>
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Protiens
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            {protiens} g
                        </p>
                    </Card>
                </div>
                <div className=" flex flex-row gap-4">
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Sodium
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            {na} g
                        </p>
                    </Card>
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Pottasium
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            {k} g
                        </p>
                    </Card>
                </div>
                <div className=" flex flex-row gap-4">
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Sugar
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            {sugar} g
                        </p>
                    </Card>
                    <Card className=" max-w-sm w-96" imgSrc="../images/signupIMG.jpeg" horizontal>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Cholestrol
                        </h5>
                        <p className="font-normal text-slate-700 dark:text-gray-400 text-xl text-center m-2">
                            {cho} g
                        </p>
                    </Card>
                </div>
            </div>
            {/* Right Side */}
            <div className=" flex flex-1 flex-col gap-4">
                <div>
                    <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="../images/dietrec.jpeg"
                    >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {calorie} cal
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Calories
                    </p>
                    </Card>
                </div>
                <div>
                        <BarChart
                            width={500}
                            height={300}
                            data={datas}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amt" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    </BarChart>
                </div>
            </div>  
        </div>
    </div>
  )
}
