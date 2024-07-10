import axios from 'axios';
import './style.scss';
import { useState } from 'react';

function CreateAccaunt() {
    const [fileName, setFileName] = useState('Choose avatar');
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [baseImage64, setBaseImage64] = useState('');


    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        setBaseImage64(loadEvent.target.result);
    };

    const [reqDataValue, setReqDataValue] = useState({
        password1: '',
        first_name: '',
        last_name: '',
        email: '',
        password2: '',
        phone: '',
        bio: '',
    });

    const formObj = async (event) => {
        event.preventDefault();

        if (reqDataValue.password1 !== reqDataValue.password2) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (!file) return setErrorMessage('Please select a file.');

        setErrorMessage('');

        const formElem = document.getElementById('createAccaunt-form');
        const formData = new FormData(formElem);
        formData.append('avatar', baseImage64);
        try {
            const response = await axios.post('https://nftmarket.pythonanywhere.com/api/v1/auth/register/', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            });
            localStorage.setItem('myAccaunt', JSON.stringify(response.data, null, 1))
            document.getElementById('toHome').click()
            setFileName('Choose avatar');
        } catch (error) {
            console.error('Error submitting the form:', error);
            if (error.response && error.response.data) {
                setErrorMessage(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                setErrorMessage('An error occurred while submitting the form. Please try again.');
            }
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        if (file) {
            setFileName(file.name);
            setFile(file);
        } else {
            setFileName('Choose avatar');
        }
    };

    const handleChange = (e) => {
        setReqDataValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleButtonClick = () => {
        document.getElementById('avatar').click();
    };

    return (
        <div className='createAccaunt-container'>
            <div className='img-container'>
                <img src="/createAccaunt/img1.png" alt="img" />
                <img src="/createAccaunt/img2.png" alt="img" />
                <img src="/createAccaunt/img3.png" alt="img" />
            </div>
            <div className="createAccaunt-content">
                <div className="texts">
                    <h2>Create account</h2>
                    <p>Welcome! Enter your details and start creating, collecting, and selling NFTs.</p>
                </div>

                <form id='createAccaunt-form' onSubmit={formObj}>
                    <div>
                        <label htmlFor="first_name">
                            <img src="/createAccaunt/user.png" alt="user" />
                            <input
                                name='first_name'
                                type="text"
                                placeholder='First name'
                                required
                                value={reqDataValue.first_name}
                                onChange={handleChange}
                            />
                        </label>

                        <label htmlFor="last_name">
                            <img src="/createAccaunt/user.png" alt="user" />
                            <input
                                name='last_name'
                                type="text"
                                placeholder='Last name'
                                required
                                value={reqDataValue.last_name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="password1">
                            <img src="/createAccaunt/lock.png" alt="lock" />
                            <input
                                name='password1'
                                type="password"
                                placeholder='Password'
                                required
                                value={reqDataValue.password1}
                                onChange={handleChange}
                            />
                        </label>

                        <label htmlFor="password2">
                            <img src="/createAccaunt/lock.png" alt="lock" />
                            <input
                                name='password2'
                                type="password"
                                placeholder='Repeat password'
                                required
                                value={reqDataValue.password2}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    {reqDataValue.password1 !== reqDataValue.password2 && (
                        <p className='error-message'>Passwords do not match</p>
                    )}

                    <div>
                        <label htmlFor="email">
                            <img src="/createAccaunt/message.png" alt="email" />
                            <input
                                name='email'
                                type="email"
                                placeholder='Email Address'
                                required
                                value={reqDataValue.email}
                                onChange={handleChange}
                            />
                        </label>

                        <label htmlFor="phone">
                            <img style={{opacity: '0.5'}}  src="/createAccaunt/phone.svg" alt="phone" />
                            <input
                                name='phone'
                                type="tel"
                                placeholder='Phone number'
                                required
                                value={reqDataValue.phone}
                                onChange={handleChange}
                                pattern='[0-9+]+'
                            />
                        </label>
                    </div>

                    <label htmlFor="bio" className='bio'>
                        <img src="/createAccaunt/user.png" alt="user" />
                        <input
                            name='bio'
                            type="text"
                            placeholder='Bio'
                            required
                            value={reqDataValue.bio}
                            onChange={handleChange}
                        />
                    </label>

                    {errorMessage && <p className='error-message'>{errorMessage}</p>}

                    <div>
                        <label className={`avatar-label`}>
                            <button type="button" className="custom-file-button" onClick={handleButtonClick} required>
                                <img src="/createAccaunt/user.png" alt="avatar" />
                                {fileName}
                            </button>
                            <input
                                id="avatar"
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                        </label>

                        <button type='submit'>
                            Create account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAccaunt;

