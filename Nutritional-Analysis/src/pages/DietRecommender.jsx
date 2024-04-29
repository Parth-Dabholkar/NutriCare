import { useState, useEffect } from "react";
import axios from "axios";

const DietRecommender = () => {
  const calculateBMR = (age, gender, weight, height) => {
    let bmr;

    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else if (gender === "female") {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    } else {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    }

    return bmr;
  };

  const calculateMaintenanceCalories = (bmr, activityLevel, fitnessGoal) => {
    let activityFactor;
    let fitnessFactor;

    switch (activityLevel) {
      case "sedentary":
        activityFactor = 1.2;
        break;
      case "lightlyActive":
        activityFactor = 1.375;
        break;
      case "moderatelyActive":
        activityFactor = 1.55;
        break;
      case "veryActive":
        activityFactor = 1.725;
        break;
      case "superActive":
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.2;
        break;
    }

    switch (fitnessGoal) {
      case "extremeweightloss":
        fitnessFactor = 0.64;
        break;
      case "weightloss":
        fitnessFactor = 0.82;
        break;
      case "maintainweight":
        fitnessFactor = 1;
        break;
      case "weightgain":
        fitnessFactor = 1.18;
        break;
      case "extremeweightgain":
        fitnessFactor = 1.36;
        break;
      default:
        fitnessFactor = 1;
        break;
    }

    return bmr * activityFactor * fitnessFactor;
  };

  const calculateMacro = (fitnessGoal, numberOfCalories) => {
    let carbohydrateRatio;
    let proteinRatio;
    let fatRatio;

    switch (fitnessGoal) {
      case "extremeweightloss":
        carbohydrateRatio = 0.3;
        proteinRatio = 0.4;
        fatRatio = 0.3;
        break;
      case "weightloss":
        carbohydrateRatio = 0.4;
        proteinRatio = 0.3;
        fatRatio = 0.3;
        break;
      case "maintainweight":
        carbohydrateRatio = 0.5;
        proteinRatio = 0.3;
        fatRatio = 0.2;
        break;
      case "weightgain":
        carbohydrateRatio = 0.4;
        proteinRatio = 0.4;
        fatRatio = 0.2;
        break;
      case "extremeweightgain":
        carbohydrateRatio = 0.6;
        proteinRatio = 0.3;
        fatRatio = 0.1;
        break;
      default:
        throw new Error("Invalid fitness goal");
    }

    return { carbohydrateRatio, proteinRatio, fatRatio };
  };

  const [timeFrame, setTimeFrame] = useState("day");
  const [diet, setDiet] = useState("vegetarian");
  const [exclude, setExclude] = useState("shellfish, olives");
  const [meals, setMeals] = useState([]);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const bmr = calculateBMR(age, gender, weight, height);
    const numberOfCalories = calculateMaintenanceCalories(bmr, activityLevel, fitnessGoal);

    console.log("BMR:", bmr);
    console.log("Calories:", numberOfCalories);

    const macros = calculateMacro(fitnessGoal, numberOfCalories);
    console.log("Macros:", macros);

    axios
      .get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate", {
        params: {
          timeFrame: timeFrame,
          targetCalories: numberOfCalories,
          diet: diet,
          exclude: exclude,
        },
        headers: {
          "X-RapidAPI-Key": '8badf09664mshc0371c0a35bfbdbp11d064jsn0a161d6d8197',
          "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      })
      .then((response) => {
        setMeals(response.data.meals);
        console.log("Meals:", response.data.meals);
      })
      .catch((error) => {
        console.error("Error fetching meal plan:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col justify-center items-center">
      <div className=" max-w-5xl mx-auto text-center md:text-5xl text-xl p-6 m-8 font-mono font-bold border-b-2 border-slate-300">
        <h1 className=""><span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>Diet</span> Recommender</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
        {/* Input fields for age, gender, weight, height, activity level, etc. */}
        <div className="flex flex-col md:flex-row md:space-x-4 justify-evenly items-center">
          <div>
            <label className="block">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border rounded-md px-2 py-1"
            />
          </div>
          <div>
            <label className="block">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 justify-evenly items-center">
          <div>
            <label className="block">Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border rounded-md px-2 py-1"
            />
          </div>
          <div>
            <label className="block">Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border rounded-md px-2 py-1"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 justify-evenly items-center">
          <div>
            <label className="block">Activity Level:</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightlyActive">Lightly Active</option>
              <option value="moderatelyActive">Moderately Active</option>
              <option value="veryActive">Very Active</option>
              <option value="superActive">Super Active</option>
            </select>
          </div>
          <div>
            <label className="block">Fitness Goal:</label>
            <select
              value={fitnessGoal}
              onChange={(e) => setFitnessGoal(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="" disabled>
                Select Fitness Goal
              </option>
              <option value="extremeweightloss">Extreme Weight Loss</option>
              <option value="weightloss">Weight Loss</option>
              <option value="maintainweight">Maintain Weight</option>
              <option value="weightgain">Gain Weight</option>
              <option value="extremeweightgain">Extreme Weight Gain</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 justify-evenly items-center">
          <div>
            <label className="block">Time Frame:</label>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
            </select>
          </div>
          <div>
            <label className="block">Diet:</label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="paleo">Paleo</option>
              <option value="keto">Keto</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 justify-evenly items-center">
          <div>
            <label className="block">Exclude (comma separated):</label>
            <input
              type="text"
              value={exclude}
              onChange={(e) => setExclude(e.target.value)}
              className="border rounded-md px-2 py-1"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 justify-evenly items-center">
            <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
            >
            Submit
            </button>
        </div>
      </form>

      {meals.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Meal Plan</h2>
          <ul className="space-y-4">
            {meals.map((meal, index) => (
              <li key={index} className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{meal.title}</h3>
                  <p>{meal.description}</p>
                </div>
                <div>
                  <a className=" text-blue-500" href={meal.sourceUrl}>Explore More</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DietRecommender;
