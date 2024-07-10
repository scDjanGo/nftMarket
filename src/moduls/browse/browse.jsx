import './style.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


function Browse() {
    const [categorys, setCategorys] = useState(null)
    const [fetching, setFetching] = useState(true)


    useEffect(() => {
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/categories/`)
            .then(res => res.json())
            .then(data => {
                setCategorys(data)
            })
            .catch(err => console.error(err))
            .finally(() => setFetching(false))
    }, [])

    return (
        <div className='browse-container'>

            {fetching ?
                <div className='loading'>
                    <p>Loading...</p>
                    <img src="/marketplaceModule/loading.svg" alt="Loading" />
                </div>
                :
                <>
                    <h2>Browse Categories</h2>
                    <div className='cat-container'>

                        <div className='categories'>

                            {categorys && categorys.map((cat, index) => (

                                <Link key={index} to={`/category/${cat.name}`}>
                                    <img src={cat.image} alt="art" />
                                    <p>{cat.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div></>
            }
        </div>
    )
}

export default Browse