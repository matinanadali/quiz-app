import React from 'react';
import allQuestions from './data/allQuestions.json' ;
import allLectures from './data/allLectures.json';

export default function Lectures({onShowQuizClick}) {

  const handlePlayClick = (selectedLectureIndex) => {
    const selectedQuestions = allQuestions[selectedLectureIndex];
    onShowQuizClick(selectedQuestions);
  };
  
  return (
  <>
    <div className='lectures-section'>
      {allLectures.map((lecture, i) => (
        <div className="lecture-box">
          <h2>{lecture['lecture-title']}</h2>
          <button
            disabled={i >= allQuestions.length || allQuestions[i].length === 0}
            className="lectureButton"
            onClick={() => handlePlayClick(i)}
          >
            Play
          </button>
          <button className="lectureButton">
            <a target="_blank"  rel="noreferrer"  href={lecture['presentation-link']}>Go to presentation</a>
          </button>
          <div className='watch-section'>
            <button className="lectureButton">
              <a target="_blank"  rel="noreferrer"  href={lecture['lecture-link-1']}>Watch lecture-Part 1</a>
            </button>
            <button className="lectureButton">
              <a target="_blank"  rel="noreferrer"  href={lecture['lecture-link-2']}>Watch lecture-Part 2</a>
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
  );
}