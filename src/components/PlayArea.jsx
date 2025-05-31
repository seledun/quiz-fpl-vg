import { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

export function PlayArea({ isPlayMode }) {
    const [index, setIndex] = useState(-1);
    const [timer, setTimer] = useState(100);
    const [quiz, setQuiz] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [availableAnswers, setAvailableAnswers] = useState([]);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef(null);

    const clearTimer = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const nextQuestion = () => {
        clearTimer();
        if (index + 1 >= quiz.length) {
            setFinished(true);
            return;
        }
        setIndex(prev => prev + 1);
    };

    /**
     * Counts all the correct responses
     * @returns Correct answer count of the current session
     */
    const getCorrectAnswers = () => {
        if (quizAnswers) {
            let count = 0;
            quizAnswers.forEach((answer) => {
                if (answer) count++;
            });
            return count;
        }
        return 0;
    }

    /**
     * Starts a timer for the question,
     * when the timer elapses the answer is marked as wrong
     * and the next question is presented.
     * @returns void
     */
    const startTimer = () => {
        clearTimer();
        setTimer(100);
        timerRef.current = setInterval(() => {
            const nextIndex = index + 1;
            setTimer(prev => {
                if (prev - 2 <= 0) {
                    clearTimer();
                    if (nextIndex !== index) {
                        if (nextIndex >= quiz.length) {
                            setFinished(true);
                            return 100;
                        }
                        setIndex(nextIndex);
                        return 100;
                    }
                } else {
                    return prev - 2;
                }
            })
        }, 200);
    };

    const verifyAnswer = (question, answer) => {
        quizAnswers[question] = quiz && quiz[question]['correct_answer'] === answer ? true : false;
        nextQuestion();
    }

    const fetchQuiz = () => {
        setLoading(true);
        axios.get('https://opentdb.com/api.php?amount=10')
            .then(response => {
                setQuiz(response.data.results);
                setQuizAnswers(new Array(response.data.results.length));
            })
            .catch(error => {
                console.error("Error fetching trivia questions", error.message);
            });
        setLoading(false);
    }

    const restartGame = () => {
        setFinished(false);
        setIndex(-1);
        fetchQuiz();
    };

    useEffect(() => {
        if (quiz && index === -1) {
            setIndex(0);
        }
    }, [quiz, index]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    /**
     * Store the past 10 quiz results in localstorage, 
     * old results get pruned with unshift and slice
     */
    useEffect(() => {
        if (finished && quizAnswers) {
            let history = JSON.parse(localStorage.getItem("history"));
            if (!history) history = [];
            history.unshift(getCorrectAnswers());
            localStorage.setItem("history", JSON.stringify(history.slice(0, 10)));
        }
    }, [finished]);

    useEffect(() => {
        if (!quiz || index < 0 || index >= quiz.length) {
            return;
        }

        const questions = [
            ...quiz[index]['incorrect_answers'],
            quiz[index]['correct_answer']
        ].sort(() => Math.random() - 0.5); // Used to shuffle the answers before mapping

        setAvailableAnswers(questions);
        startTimer();

    }, [index, quiz]);

    return (
        isPlayMode ? (
            loading ? (
                <Spinner />
            ) : (
                !finished ? (
                    <div id="play-area">
                        <h2>Question {index + 1} out of {quiz?.length}</h2>
                        <span
                            id="play-area-question"
                            dangerouslySetInnerHTML={{
                                __html: index >= 0 && quiz?.[index]?.question
                                    ? quiz[index].question
                                    : "..."
                            }}
                        ></span>
                        <div id="play-area-buttons" className="row gy-0">
                            <div className="col-12 col-lg-6">
                                {availableAnswers.map((ans, idx) => (
                                    <Button
                                        key={idx}
                                        variant="primary"
                                        className="answer-button w-100 mb-2"
                                        dangerouslySetInnerHTML={{ __html: ans }}
                                        onClick={() => verifyAnswer(index, ans)}
                                    ></Button>
                                ))}
                            </div>
                        </div>
                        <ProgressBar striped variant="success" now={timer} />
                        <div id="play-area-remaining-time">{(timer / 10).toFixed(1)} s</div>
                    </div>
                ) : (
                    <div id="play-area">
                        <h2>Finished!</h2>
                        <h3>You scored {getCorrectAnswers()} out of {quiz.length} points</h3>
                        <Button id="btn-play-again" onClick={() => restartGame()}>Play again</Button>
                    </div>
                )
            )
        ) : (
            <div id="history-area">
                <h2>Past runs</h2>
                
            </div>
        ));
}