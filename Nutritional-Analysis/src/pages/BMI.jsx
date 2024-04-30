import '../assets/BMICalculator.css'
import { useState, useEffect } from 'react';

export default function BMI() {
    const [weight, setWeight] = useState(75);
    const [height, setHeight] = useState(163);
    const [bmi, setBmi] = useState(0);

    useEffect(() => {
        const heightInMeters = height / 100;
        const newBmi = (weight / Math.pow(heightInMeters, 2)).toFixed(2);
        setBmi(newBmi);
    }, [weight, height]);

    const getBmiCategory = () => {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    };

    const bmiCategory = getBmiCategory();

    const getMeterColor = () => {
        if (bmi < 18.5) {
            return 'rgba(255, 0, 0, 0.5)';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'rgba(0, 255, 0, 0.5)';
        } else if (bmi >= 25 && bmi < 29.9) {
            return 'rgba(255, 255, 0, 0.5)';
        } else {
            return 'rgba(255, 0, 0, 0.5)';
        }
    };

    return (
        <div className="bmi-calculator">
            <div className=" max-w-5xl mx-auto text-center md:text-6xl text-xl m-8 font-mono font-bold">
                <h1 className=""><span className='px-2 py-1 bg-gradient-to-r from-blue-700 via-cyan-700 to-green-500 rounded-lg text-white'>BMI</span> Calculator</h1>
            </div>
            <div className="input-container">
                <div className="input-field">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                        type="number"
                        id="weight"
                        placeholder="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="height">Height (cm)</label>
                    <input
                        type="number"
                        id="height"
                        placeholder="Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
            </div>
            <div className="results-container">
                <div className="bmi-result">
                    BMI: <span>{bmi}</span>
                </div>
                <div className="bmi-category">
                    Category: {bmiCategory}
                </div>
                <div className="meter-container">
                    <div
                        className="meter-fill"
                        style={{
                            width: `${bmi * 100 / 40}%`,
                            background: getMeterColor()
                        }}
                    >
                        <span>{bmi}</span>
                    </div>
                </div>
                {
                    (bmiCategory === 'Overweight' || bmiCategory === 'Obese') &&
                    <div className="warning">
                        You should consider a healthier lifestyle!
                    </div>
                }
            </div>
        </div>
    )
}
