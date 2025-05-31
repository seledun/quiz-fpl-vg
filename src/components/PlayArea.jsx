import { Button } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";

export function PlayArea({ isPlayMode }) {

    return(isPlayMode ? 
        <div id="play-area">
            <span id="play-area-question">What</span>
            <div id="play-area-buttons">
                <Button variant="primary">Answer 1</Button>
                <Button variant="primary">Answer 2</Button>
                <Button variant="primary">Answer 3</Button>
            </div>
            <ProgressBar striped variant="success" now={100} />
            <div id="play-area-remaining-time">10 s</div>
        </div>
        :
        <div id="history-area">
            History
        </div>
    );
}