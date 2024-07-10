import { useState } from 'react';
import './style.scss';

function EnterEmail() {
    const [messageValue, setMessageValue] = useState('');
    const myAccaunt = JSON.parse(localStorage.getItem('myAccaunt'));

    function handleSub(e) {
        e.preventDefault();

        if (myAccaunt) {
            fetch('https://nftmarket.pythonanywhere.com/api/v1/user_message/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${myAccaunt.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: messageValue })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setMessageValue('');
                })
                .catch(err => console.error(err));
        } else {
            document.getElementById('toCreateAcc').click();
        }
    }

    return (
        <div className='enterEmail-container'>
            <div className="enterEmail">
                <img src="/enterEmail/cosmo.png" alt="cosmo" />

                <div className="email-container">
                    <h2>Join our weekly <br /> digest</h2>
                    <p>Get exclusive promotions & updates <br /> straight to your inbox.</p>
                    <form id='email' onSubmit={handleSub}>
                        <input
                            name='message'
                            type="text"
                            placeholder='Enter offer here'
                            value={messageValue}
                            required
                            onChange={(e) => setMessageValue(e.target.value)}
                        />
                        <button>
                            <div>
                                <img src="/enterEmail/email.png" alt="email" />
                            </div>
                            <p>Send message</p>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EnterEmail;
