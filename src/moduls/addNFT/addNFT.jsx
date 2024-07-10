import './style.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header-front/header';

function AddNFT() {
    const [fileName, setFileName] = useState('Choose NFT');
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [baseImage64, setBaseImage64] = useState('');
    const [myToken, setMyToken] = useState('');
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [chooseCat, setChooseCat] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [ok, setOk] = useState(false)

    useEffect(() => {
        fetch('https://nftmarket.pythonanywhere.com/api/v1/tags/')
            .then(res => res.json())
            .then(data => setTags(data))
            .finally(() => setFetching(false));
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('myAccaunt');
        if (storedToken) setMyToken(JSON.parse(storedToken));
    }, []);

    useEffect(() => {
        fetch('https://nftmarket.pythonanywhere.com/api/v1/categories/')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
                setSelectedCategory(data[0].id)
            })
            .catch(err => console.error(err));
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        tags: [],
        category: '',
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFile(file);

            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setBaseImage64(loadEvent.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFileName('Choose NFT');
            setFile(null);
            setBaseImage64('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const funcCat = (e) => {
        setChooseCat(e.target.value)
    }

    const handleTagsChange = (e) => {
        const options = e.target.options;
        const selectedTags = [];
        for (const option of options) {
            if (option.selected) {
                selectedTags.push(option.value);
            }
        }
        setFormData(prevFormData => ({
            ...prevFormData,
            tags: selectedTags,
            category: chooseCat,
        }));
    };

    const handleButtonClick = () => {
        document.getElementById('newNFT').click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, price, description, tags, category } = formData;

        try {
            const formDataToSend = {
                user: myToken.id,
                name,
                price,
                description,
                tags,
                category: selectedCategory,
                image: baseImage64
            };

            const response = await fetch('https://nftmarket.pythonanywhere.com/api/v1/nfts/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${myToken.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend),
            });

            const apidatas = await response.json()
            if (apidatas.token) {
                setFileName('Choose NFT');
                setFile(null);
                setBaseImage64('');
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    tags: [],
                    category: '',
                });
                setErrorMessage('');
                setOk(true)
            } else {
                setErrorMessage(JSON.stringify(apidatas))
            }

        } catch (error) {
            console.error('Error adding NFT:', error);
            setErrorMessage('Failed to add NFT. Please try again.');
        }
    };

    return (
        <div className="addNFT-container">
            {fetching ?
                <div className='loading'>
                    <p>Loading...</p>
                    <img src="/marketplaceModule/loading.svg" alt="Loading" />
                </div> :
                <div className="container-inner">
                    <div className={`ok ${ok ? 'on' : ''}`}>
                        <div>
                            <h2>Congratulation</h2>
                            <p>New NFT added!</p>
                            <Link to="/myProfile">Ok</Link>
                        </div>
                    </div>

                    <Link to="/myProfile">Go back</Link>
                    <div className="modal">
                        {file && <img src={baseImage64} alt="nft" />}
                        <form id="createAccount-form" onSubmit={(e) => { handleSubmit(e) }}>
                            <label className="nft">
                                <button type="button" className="custom-file-button" onClick={handleButtonClick}>
                                    {fileName}
                                    <img src="/wallet/photo.svg" alt="img" />
                                </button>
                                <input
                                    id="newNFT"
                                    type="file"
                                    name="nft"
                                    onChange={handleFileChange}
                                    required
                                    style={{ display: 'block', position: 'absolute', width: '1px', height: '1px', padding: '1px', transform: 'translateY(-1.5px) translateX(100px)', backgroundColor: 'white', color: 'white' }}
                                />
                            </label>

                            <label htmlFor="name">
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter NFT name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </label>

                            <label htmlFor="price" className="price">
                                <input
                                    min={0.01}
                                    name="price"
                                    step="any"
                                    type="number"
                                    placeholder="Enter price in ETH"
                                    required
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </label>

                            <label htmlFor="description" className="description">
                                <textarea
                                    name="description"
                                    placeholder="Enter description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </label>

                            <label htmlFor="tags">Tags</label>
                            <select name="tags" multiple id="tags" required onChange={handleTagsChange}>
                                {tags.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>

                            <label htmlFor="category">Categories</label>
                            <div id="categories">
                                <select name="category" id="category" required onChange={funcCat} >
                                    {categories.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                            <button type="submit">Add new NFT</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export { AddNFT };
