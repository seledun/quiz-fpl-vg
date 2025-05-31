export function PlayArea({ isPlayMode }) {

    return(isPlayMode ? 
        <div id="play-area">
            Play
        </div>
        :
        <div id="history-area">
            History
        </div>
    );
}