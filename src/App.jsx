import { useEffect, useState } from 'react'
import './App.css'
import Product from './components/Product'
import { nanoid } from 'nanoid'

function App() {

  const budgetFromSessionStorage = sessionStorage.getItem("budget")
  const productsFromSessionStorage = JSON.parse(sessionStorage.getItem("products"))

  const [ budget, setBudget ] = useState(budgetFromSessionStorage || 0)
  const [ remain, setRemain ] = useState()
  const [ products, setProducts ] = useState(productsFromSessionStorage || [])
  const [ budgetInput, setBudgetInput ] = useState("")
  // const [ isBudgetInputNotANumber, setIsBudgetInputNotANumber ] = useState(false)
  const [ productNameInput, setProductNameInput ] = useState("")
  const [ productPriceInput, setProductPriceInput ] = useState("")

  sessionStorage.setItem("budget", budget)
  sessionStorage.setItem("products", JSON.stringify(products))

  const addBudget = () => {
    // if (isNaN(budgetInput)) {
    //   setIsBudgetInputNotANumber(true)
    //   return
    // }
    // setIsBudgetInputNotANumber(false)
    setBudget(budgetInput)
    setRemain(budgetInput)
    setBudgetInput("")
  }


  const addProduct = () => {
    setProducts([...products, {id: nanoid(), name: productNameInput, price: productPriceInput, status: true}])
    // setRemain(remain - productPriceInput)
    setProductNameInput("")
    setProductPriceInput("")
  }

  useEffect(() => {    
    const selectedProducts = products.filter((product) => product.status === true)
    const selectPrices = selectedProducts.map(product => parseInt(product.price))
    const sumOfActiveProductsPrices = selectPrices.reduce((a, b) => a + b, 0);

    setRemain(budget-sumOfActiveProductsPrices)

  }, [products])

  const changeStatus = (id) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) =>
        product.id === id ? { ...product, status: !product.status } : product
      );
    });
  }

  const deleteItem = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
  }

  const resetAll = () => {
    setBudget(0)
    setProducts([])
  }

  return (
    <div id="App">
      <div id="inputs">
        <div id="title">
          <h1>Mit tudok venni ?</h1>
        </div>
        <div>
          <input type="text" placeholder='Ennyi pénzem van' value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)}></input>
          <button onClick={addBudget}>OK</button>
          {/* {isBudgetInputNotANumber && <p>Csak számot írhatsz be!</p>} */}
        </div>
        <div>
          <input type="text" placeholder='Ezt megveszem' value={productNameInput} onChange={(e) => setProductNameInput(e.target.value)}></input>
          <input type="text" placeholder='Ennyibe kerül'value={productPriceInput} onChange={(e) => setProductPriceInput(e.target.value)} ></input>
          <button onClick={addProduct}>OK</button>
        </div>
      </div>
      <div className="budget">
        <h2>Összes</h2>
        <h2>{budget}</h2>
      </div>
      <div id="products-container">
        {products.length && products.map((product) => <Product 
          key={product.id} 
          product={product}
          changeStatus={changeStatus} 
          deleteItem={deleteItem}
        />)}

      </div>
      <div className='budget'>
        <h2>Marad</h2>
        <h2>{remain ? remain : ""}</h2>
      </div>
      <div className='reset'>
        <button onClick={() => resetAll()}>TÖRLÉS</button>
      </div>
    </div>
  )
}

export default App
