function ProgressBar({barWidth,updateBar}) {
    
    const clickProgress = (e) => {
        updateBar(e.pageX);
    }
    return (
        <div className="progress__bar" onClick={(e) => clickProgress(e)}>
            <div className="progress__current" style={{width:barWidth}}></div>
        </div>
    )
}
export default ProgressBar;