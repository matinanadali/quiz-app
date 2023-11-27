import React, { useState } from 'react';
import back_icon from './images/back_icon.png'
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import image8 from "./images/image8.png";
import image9 from "./images/image9.png";
import image10 from "./images/image10.png";
import image11 from "./images/image11.png";
import image12 from "./images/image12.png";
import image13 from "./images/image13.png";
import image14 from "./images/image14.png";
import image15 from "./images/image15.png";
import image16 from "./images/image16.png";
import image17 from "./images/image17.png";
import image18 from "./images/image18.png";
import image19 from "./images/image19.png";
import image20 from "./images/image20.png";
import image21 from "./images/image21.png";
var r = document.querySelector(':root');

export default function Quiz( {onBackToLecturesClick, questions }) {
	
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentScore, setCurrentScore] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [buttonColors, setButtonColors] = useState(Array(questions[currentQuestion].answerOptions.length).fill("")); 
	
	const images = {
		"image1" : image1,
		"image2" : image2,
		"image3" : image3,
		"image4" : image4,
		"image5" : image5,
		"image6" : image6,
		"image7" : image7,
		"image8" : image8,
		"image9" : image9,
		"image10" : image10,
		"image11" : image11,
		"image12" : image12,
		"image13" : image13,
		"image14" : image14,
		"image15" : image15,
		"image16" : image16,
		"image17" : image17,
		"image18" : image18,
		"image19" : image19,
		"image20" : image20,
		"image21" : image21
	}
	
	function delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}	
	
	const handleAnswerClick = (isCorrect, index) => {
		const buttons = document.getElementsByClassName("answerButton");
		for(let i = 0; i < buttons.length; i++) {
			buttons[i].disabled = true;
		}
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

	const handleSubmitText = (enteredText, correctText, questionIndex) => {
		const input = document.getElementById("input" + questionIndex);
		const correctAnswer = document.getElementById("correctAnswer" + questionIndex);
		if (enteredText === correctText) {
			setCurrentScore(currentScore + 1);
			input.style.borderColor = "#009933";
			input.style.borderWidth = "4px";
			r.style.setProperty('--line-color', '#009933');
		} else {
			correctAnswer.style.visibility = "visible";
			input.style.borderColor =  "#b30000";
			r.style.setProperty('--line-color', '#cc0000');
		}
		handleNextQuestion();
	}


	const handleNextQuestion = async () => {
		const buttons = document.getElementsByClassName("answerButton");
		await delay(500);
		const line = document.getElementsByClassName("bottom-line")[0];
		line.classList.add("bottom-line-grow");
		await delay(3000);
		resetButtonColors();
		const nextQuestion = currentQuestion + 1;
		
		if (nextQuestion < questions.length) {
		  setCurrentQuestion(nextQuestion);
		} else {
		  setShowScore(true);
		}
		for(let i = 0; i < buttons.length; i++) {
			buttons[i].disabled = false;
		}
	  };
	
	const resetButtonColors = () => {
		setButtonColors(Array(questions[currentQuestion].answerOptions.length).fill(""));
		const line = document.getElementsByClassName("bottom-line")[0];
		line.classList.remove("bottom-line-grow");
	};
	
	return (
		<div className='quiz'>
			{showScore ? (
			  	<div className='score-section'>
					<div>	You scored {currentScore} out of {questions.length} </div>
					<div className='buttonsContainer'>
						<button className='answerButton' onClick={onBackToLecturesClick}>Back to lectures</button>
					</div>
			  	</div>
			) : (
			    <div className="question-box">
					<div className='question-section'>
					<button className='backtolectures'  onClick={onBackToLecturesClick}><img alt="" src={back_icon} className='back-icon' />Back to lectures</button>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					<div> 
						{ questions[currentQuestion].questionImage ?  
							<img
							className="questionImage"
							src={images[questions[currentQuestion].questionImage]}
							alt={questions[currentQuestion].questionImage}
							/> : 
						<div></div>
						}
					</div>
					</div>
					<div className='answer-section'> 
					{ questions[currentQuestion].typeQuestion ? 
						(<>
							<form onSubmit={(event)=> event.preventDefault()}>
						<input placeholder="Type your answer" id={"input" + currentQuestion}/>
						<button type="submit" onClick={()=>handleSubmitText(document.getElementById("input" + currentQuestion).value, questions[currentQuestion].typeQuestion, currentQuestion)}>Submit</button>
						</form>
						<div style={{visibility : 'hidden'}} className='correctAnswer' id={"correctAnswer" + currentQuestion}>Correct answer: {questions[currentQuestion].typeQuestion} </div></> )
					:
						(
						questions[currentQuestion].answerOptions.map((answerOption, i) => (
						<button
						className="answerButton"
						style={{ borderColor: buttonColors[i] }}
						onClick={() => {
							handleAnswerClick(answerOption.isCorrect, i);
						}}
						>{answerOption.answerText}
						</button>
				  		))
						)}
					</div>
				
			    </div>
				)
			}
			<hr className="bottom-line" />
		</div> 
	);			 
}
