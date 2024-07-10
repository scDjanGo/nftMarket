import './style.scss'


function HightLight() {


    return (
        <div className='hightLight-container'>
            <div className='hightLight-img'>
                <img src="/highlight/bigImg.png" alt="hightLight" />
                <img src="/highlight/bigImg2.png" alt="hightLight" />
                <img src="/highlight/bigImg3.png" alt="hightLight" />
                <div className="bgc"></div>
            </div>
            <div className='auction'>
                <div className='profile'>
                    <div>
                        <img src="/highlight/avatar.png" alt="avatar" />
                        <p>Shroomie</p>
                    </div>
                    <h2>Magic Mashrooms</h2>
                    <button>
                        <img src="/highlight/Eye.png" alt="eye" />
                        <p>See NFT</p>
                    </button>
                </div>

                <div className='timeOut'>
                    <p>Auction ends in:</p>
                    <div>
                        <p>59</p><span>:</span><p>59</p><span>:</span><p>59</p>
                    </div>
                    <ul>
                        <li>Hours</li>
                        <li>Minutes</li>
                        <li>Seconds</li>
                    </ul>
                </div>

                <button className='media-button'>
                    <img src="/highlight/Eye.png" alt="eye" />
                    <p>See NFT</p>
                </button>
            </div>
        </div>
    )
}

export default HightLight