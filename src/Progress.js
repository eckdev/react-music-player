
import ProgressTop from './ProgressTop'
import ProgressBar from './ProgressBar'

function Progress({ artistName, trackName,progressRef,currentTimeText,durationText,barWidth,updateBar }) {
    return (        
        <div className="progress" ref={progressRef}>
            <ProgressTop artistName={artistName} trackName={trackName} durationText={durationText}></ProgressTop>
            <ProgressBar barWidth={barWidth} updateBar={updateBar}></ProgressBar>
            <div className="progress__time">{currentTimeText}</div>
        </div>
    )
}

export default Progress