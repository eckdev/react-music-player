function ProgressTop({ artistName, trackName,durationText }) {
    return (
        <div className="progress__top">
            <div className="album-info">
                <div className="album-info__name">{artistName}</div>
                <div className="album-info__track">{trackName}</div>
            </div>
            <div className="progress__duration">{durationText}</div>
        </div>
    )
}
export default ProgressTop;