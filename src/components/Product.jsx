import './Product.css'
import PropTypes from 'prop-types'

const Product = ({product, changeStatus, deleteItem}) => {
  
  const { name, price, status, id } = product

  return (
    <div className='product-line'>
      <div 
        className={ status ? "product" : "product strike"} 
        // style={{textDecoration: status ? "none" : "line-through"}}
      >
        <h3>{name}</h3>
        <h3>{price}</h3>
      </div>
      <button onClick={() => changeStatus(id)} >{status ? "NEM KELL" : "KELL"}</button>
      <button onClick={() => deleteItem(id)} >X</button>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object,
  changeStatus: PropTypes.func,
  deleteItem: PropTypes.func
}

export default Product