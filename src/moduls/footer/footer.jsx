import './style.scss'
import axios from 'axios'
import { useState } from 'react'

function Footer() {
    const [message, setMesage] = useState(false)
    const myAccaunt = JSON.parse(localStorage.getItem('myAccaunt'))
    let myRole = null

    if(myAccaunt) {
        myRole = myAccaunt.role
    }


    function handelSub (e) {
        e.preventDefault()
        axios.post(`https://nftmarket.pythonanywhere.com/api/v1/user_message/`, {
            message: message
        })
    }

    return (
        <div className='footer-container'>

            <div className="social">
                <div className="zag">
                    <img src="/footer/Storefront.png" alt="Storefront" />
                    <h2>NFT   Marketplace</h2>
                </div>
                <p>NFT marketplace UI created <br /> with Anima for Figma.</p>
                <p>Join our community</p>
            </div>

            <ul>
                <li>Explore</li>
                <li>Marketplace</li>
                <li>Rankings</li>
                <li>Connect a wallet</li>
            </ul>


            <div className={`email-container ${myRole && myRole === 'admin' ? '' : 'none'}`}>
                <h2>Join our weekly digest</h2>
                <p>Get exclusive promotions & updates <br /> straight to your inbox.</p>
            </div>
        </div>
    )
}

export default Footer