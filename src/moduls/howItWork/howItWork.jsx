import './style.scss'

function HowItWork() {

    return (
        <div className='howItWork'>
            <div className="howItWork-header">
                <h2>How it works</h2>
                <p>Find out how to get started</p>
            </div>

            <div className="howItWork-content">

                <div className='cart'>
                    <img src="/howitWork/wallet.png" alt="wallet" />
                    <div>
                        <h2>Setup Your wallet</h2>
                        <p>Set up your wallet of choice. <br /> Connect it to the Animarket by <br /> clicking the wallet icon in the top <br /> right corner.</p>
                    </div>
                </div>

                <div className='cart'>
                    <img src="/howitWork/collection.png" alt="collection" />
                    <div>
                        <h2>Create Collection</h2>
                        <p>Upload your work and setup your <br /> collection. Add a description, <br /> social links and floor price.</p>
                    </div>
                </div>

                <div className='cart'>
                    <img src="/howitWork/earn.png" alt="earn" />
                    <div>
                        <h2>Start Earning</h2>
                        <p>Choose between auctions and <br /> fixed-price listings. Start earning <br /> by selling your NFTs or trading <br /> others.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWork