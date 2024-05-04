import './App.css'
import React, { useState, useEffect } from 'react'
import starFill from './assets/Star_fill.svg'
import starDisabled from './assets/Star.svg'

export default function App () {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const url =
      'https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json'

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setProducts(data)
      })
      .catch(error => {
        setError(error.message)
        console.error('Fetch error:', error)
      })
  }, [])

  return (
    <div className='container'>
      <header className='header'></header>
      <div className='content'>
        <section className='heading'>
          <h1>Our Collection</h1>
          <p>
            Introducing our Coffee Collection, a selection of unique coffees
            from different roast types and origins, expertly roasted in small
            batches and shipped fresh weekly.
          </p>
          <div className='buttonGroup'>
            <button>All Products</button>
            <button>Available Now</button>
          </div>
        </section>
        <section className='products'>
          {error && <p className='error-message'>Error: {error}</p>}
          {products.map((product, index) => (
            <div key={index} className='product-item'>
              <div className='image-container'>
                <img
                  className='imageProduct'
                  src={product.image}
                  alt={product.name}
                />
                {product.popular && <span className='etiqueta'>Popular</span>}
              </div>

              <div className='describe'>
                <h3 className='productTitle element'>{product.name}</h3>
                <p className='element price'>{`${product.price}`}</p>
                {product.rating ? (
                  <h3 className='rating productTitle' id='star'>
                    <img src={starFill} className='element' />{' '}
                    <span className='element'>{product.rating} </span>
                    <span className='element votes'>
                      ({product.votes} votes)
                    </span>
                  </h3>
                ) : (
                  <h3 className='rating productTitle' id='star'>
                    <img src={starDisabled} alt='' />{' '}
                    <span className='votes'>No ratings</span>
                  </h3>
                )}
                {!product.available && (
                  <span className='soldout'>Sold out</span>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
