 import { useState } from "react";
 import axios from "axios";
 import { useEffect } from "react";
 import { Card } from "flowbite-react";

const DietRecommender = ({ onSubmit }) => {
  function calculateBMR(age, gender, weight, height) {
    let bmr;
  
    if (gender  === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    }
  
    return bmr;
  }
  function calculateMaintenanceCalories(bmr, activityLevel,fitnessGoal ) {
    let activityFactor;
    let fitnessFactor;
    
    switch (activityLevel) {
      case "sedentary":
        activityFactor = 1.2;
        break;
      case 'lightlyActive':
        activityFactor = 1.375;
        break;
      case 'moderatelyActive':
        activityFactor = 1.55;
        break;
      case 'veryActive':
        activityFactor = 1.725;
        break;
      case 'superActive':
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.9;
        break;
    }
    switch (fitnessGoal) {
      case 'extremeweightloss':
        fitnessFactor = 0.64;
        break;
      case 'weightloss':
        fitnessFactor = 0.82;
        break;
      case 'maintainweight':
        fitnessFactor = 1;
        break;
      case 'weightgain':
        fitnessFactor = 1.18;
        break;
      case 'extremeweightgain':
        fitnessFactor = 1.36;
        break;
      default:
        fitnessFactor = 1.36;
        break;
    }
    
  
    return bmr * activityFactor * fitnessFactor ;
  }
  function calculateMacro(fitnessGoal,numberOfCalories)
  {
    let carbohydrateRatio;
    let proteinRatio;
    let fatRatio;

    switch (fitnessGoal) {
      case 'extremeweightloss':
        carbohydrateRatio = 0.3*numberOfCalories;
      proteinRatio = 0.4*numberOfCalories;
      fatRatio = 0.3*numberOfCalories;
      break;
      case 'weightloss':
        carbohydrateRatio = 0.4*numberOfCalories;
      proteinRatio = 0.3*numberOfCalories;
      fatRatio = 0.3*numberOfCalories;
      break;
      case 'maintainweight':
        carbohydrateRatio = 0.5*numberOfCalories;
      proteinRatio = 0.3*numberOfCalories;
      fatRatio = 0.2*numberOfCalories;
      break;
      case 'weightgain':
        carbohydrateRatio = 0.4*numberOfCalories;
      proteinRatio = 0.4*numberOfCalories;
      fatRatio = 0.2*numberOfCalories;
      break;
      case 'extremeweightgain':
        carbohydrateRatio = 0.6*numberOfCalories;
        proteinRatio = 0.3*numberOfCalories;
        fatRatio = 0.1*numberOfCalories;
      break;
      default:
        throw new Error('Invalid fitness level');

      
    } 
    return {carbohydrateRatio,proteinRatio,fatRatio};



  }
  const [timeFrame, setTimeFrame] = useState('day');
    const [targetCalories, setTargetCalories] = useState(2000);
    const [diet, setDiet] = useState('vegetarian');
    const [exclude, setExclude] = useState('shellfish, olives');
    const [meals, setMeals] = useState(null);

  
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting with: ", { age, gender, weight, height, activityLevel, fitnessGoal });
    if (!fitnessGoal) {
      alert("Please select a valid fitness goal.");
      return;
    }

    console.log(calculateMaintenanceCalories(calculateBMR(age, gender, weight, height), activityLevel, fitnessGoal));
    let numberOfCalories = calculateMaintenanceCalories(calculateBMR(age, gender, weight, height), activityLevel, fitnessGoal);
    console.log(calculateMacro(fitnessGoal,numberOfCalories));
    
    
  };
  useEffect(() => {
    const bmr = calculateBMR(age, gender, weight, height);
    const numberOfCalories = calculateMaintenanceCalories(bmr, activityLevel, fitnessGoal);
    axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate', {
        params: {
            timeFrame: 'day',
            targetCalories: numberOfCalories,
            diet: 'vegetarian',
            exclude: 'shellfish, olives'
        },
        headers: {
            'X-RapidAPI-Key': '8badf09664mshc0371c0a35bfbdbp11d064jsn0a161d6d8197',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    })
    .then(response => {
        setMeals(response.data);
        console.log(response.data); // This will log the fetched data from your backend
    })
    .catch(error => {
        console.error(error);
    });
},[timeFrame, targetCalories, diet, exclude]);

    
  
  
  return ( 
    <>
    <form onSubmit={handleSubmit}>
  <label>
    Age:
    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
  </label><br />
  
  <label>
    Gender:
    <select value={gender} onChange={(e) => setGender(e.target.value)}>
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </label><br />
  
  <label>
    Weight (kg):
    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
  </label><br />
  
  <label>
    Height (cm):
    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
  </label><br />
  
  <label>
    Activity Level:
    <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
      <option value="sedentary">Sedentary</option>
      <option value="lightlyActive">Lightly Active</option>
      <option value="moderatelyActive">Moderately Active</option>
      <option value="veryActive">Very Active</option>
      <option value="superActive">Super Active</option>
    </select>
  </label><br />
  
  <label>
    Dietary Preferences:
    <select value={fitnessGoal} onChange={(e) => setFitnessGoal(e.target.value)}>
      <option value="" disabled>Select Dietary Preference</option>
      <option value="extremeweightloss">Extreme weight loss</option>
      <option value="weightloss">Weight loss</option>
      <option value="maintainweight">Maintain weight</option>
      <option value="weightgain">Gain weight</option>
      <option value="extremeweightgain">Extreme weight gain</option>
    </select>
  </label><br />
  
  <label>
    Time Frame:
    <select value={timeFrame} onChange={e => setTimeFrame(e.target.value)}>
      <option value="day">Day</option>
      <option value="week">Week</option>
    </select>
  </label><br />
  
  <label>
    Diet:
    <select value={diet} onChange={e => setDiet(e.target.value)}>
      <option value="vegetarian">Vegetarian</option>
      <option value="vegan">Vegan</option>
      <option value="paleo">Paleo</option>
      <option value="keto">Keto</option>
    </select>
  </label><br />
  
  <label>
    Exclude (comma separated):
    <input type="text" value={exclude} onChange={e => setExclude(e.target.value)} />
  </label><br />
  
  <button type="submit">Submit</button>
</form>

<div>
    {meals && meals.map((meal, index) => (
      <div key={index} className="meal-card">
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <ul>
          {meal.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p><strong>Calories:</strong> {meal.nutrients.calories}</p>
        <p><strong>Fat:</strong> {meal.nutrients.fat}</p>
        <p><strong>Carbohydrates:</strong> {meal.nutrients.carbohydrates}</p>
        <p><strong>Protein:</strong> {meal.nutrients.protein}</p>
      </div>
    ))}
  </div>
    </>
    
  );
};

export default DietRecommender;



 
