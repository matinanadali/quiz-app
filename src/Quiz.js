import React, { useState } from 'react';
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
var r = document.querySelector(':root');

export default function Quiz( {onBackToLecturesClick, questions }) {
	const images = {
		"image1" : image1,
		"image2" : image2,
		"image3" : image3,
		"image4" : image4,
		"image5" : image5,
		"image6" : image6
	}
	function delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	  }
	 
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentScore, setCurrentScore] = useState(0);
	const [showScore, setShowScore] = useState(false);

	const [buttonColors, setButtonColors] = useState(Array(questions[currentQuestion].answerOptions.length).fill("")); // Adjust the array length based on the number of answer options

	const handleAnswerClick = (isCorrect, index) => {
		if (isCorrect) {
		setCurrentScore(currentScore + 1);
		}
		// Update button colors based on correctness
		const newButtonColors = [...buttonColors];
		const correctButtonIndex = questions[currentQuestion].answerOptions.findIndex((option) => option.isCorrect === true);
		if (isCorrect) {
			newButtonColors[index] = "#009933";
			r.style.setProperty('--line-color', '#009933');
		} else {
			newButtonColors[index] = "#b30000";
			newButtonColors[correctButtonIndex] = "#009933";
			r.style.setProperty('--line-color', '#cc0000');
		}
		setButtonColors(newButtonColors);
		handleNextQuestion();
	};
    
	const handleNextQuestion = async () => {
		await delay(500);
		const line = document.getElementsByClassName("bottom-line")[0];
		line.classList.add("bottom-line-active");
		await delay(3000);
		resetButtonColors();
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
		setShowScore(true);
		}
	}
	
	const resetButtonColors = () => {
		// Reset button colors to default (empty string)
		setButtonColors(Array(questions[currentQuestion].answerOptions.length).fill(""));
		const line = document.getElementsByClassName("bottom-line")[0];
		line.classList.remove("bottom-line-active");
	};
	
 
	
	return (
		<>
		  <div className='quiz'>
			{showScore ? (
			  <div className='score-section'>
				<div>	You scored {currentScore} out of {questions.length} </div>
				<div className='buttonsContainer'>
				<button className='answerButton' onClick={onBackToLecturesClick}>Back to lectures</button>
				<button className='answerButton'>Check anwers</button>
				</div>
			
			  </div>
			) : (
			  <div className="question-box">
				<div className='question-section'>
				  <div className='question-count'>
					<span>Question {currentQuestion + 1}</span>/{questions.length}
				  </div>
				  <div className='question-text'>{questions[currentQuestion].questionText}</div>
				  
				  <div>
				{ 
				(questions[currentQuestion].questionImage) ?  <img
				className="questionImage"
				src={images[questions[currentQuestion].questionImage]}
				alt={questions[currentQuestion].questionImage}
				
			  /> : <div></div>
				}

    </div>
				</div>
				<div className='answer-section'> 
					{
					questions[currentQuestion].typeQuestion ? 
					(	<form>
						<input placeholder="Type your anwer" />
						<button type="submit">Submit</button>
						</form> )
					 :
				
			(	questions[currentQuestion].answerOptions.map((answerOption, i) => (
					<button
					  className="answerButton"
					  style={{ borderColor: buttonColors[i] }}
					  onClick={() => {
						handleAnswerClick(answerOption.isCorrect, i);
					  }}
					>
					  {answerOption.answerText}
					</button>
				  )))}
				</div>
				
			  </div>
			)}
			<hr className="bottom-line" />
		  </div> 
		</>
	  );
				 
}
