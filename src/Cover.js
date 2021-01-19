

function Cover({photoUrl}) {
    return (
        <div className="player-cover">
            <span>
                <div className="player-cover__item" style={{backgroundImage:`url(${photoUrl})`}}></div>
            </span>
        </div>
    );
}

export default Cover;