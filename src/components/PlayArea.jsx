import { Button, Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";

export function PlayArea({ isPlayMode }) {

    return (isPlayMode ? (
        <div id="play-area">
            <span id="play-area-question">What</span>
            <div id="play-area-buttons" className="row gy-0">
                <div className="col-12 col-lg-6">
                    <Button variant="primary" className="answer-button w-100 mb-2">Answer 1</Button>
                    <Button variant="primary" className="answer-button w-100">Answer 2</Button>
                </div>
                <div className="col-12 col-lg-6">
                    <Button variant="primary" className="answer-button w-100 mb-2">Answer 3</Button>
                    <Button variant="primary" className="answer-button w-100">Answer 4</Button>
                </div>
            </div>
            <ProgressBar striped variant="success" now={100} />
            <div id="play-area-remaining-time">10 s</div>
        </div>
    ) : (
        <div id="history-area">
            History
        </div>
    ));
}