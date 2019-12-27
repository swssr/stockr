import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

const API_URL = "http://localhost:8080/v1/api/stock";

//Helper functions
const emptyString = v => v === "";
const isEmpty = obj => Object.values(obj).some(emptyString);

function AddStock() {
  //To be fetched onload
  const [stock, setStock] = useState([]);
  //Component state
  const [barcodeState, setBarcode] = useState("");
  const [nameState, setName] = useState("");
  const [priceState, setPrice] = useState(0);
  const [countState, setCount] = useState(0);

  const [currentItem, setCurrentItem] = useState({
    barcode: "",
    onStock: false
  });

  const [cart, setCart] = useState([{}]);
  const fetchStock = Axios.get(API_URL);
  //References
  const barcodeInputRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const countRef = useRef();
  const lbcountRef = useRef();

  //UI control state
  const [stockCartEmpty, setStockCartEmpty] = useState(true);
  const [currentItemEmpty, setCurrentItemEmpty] = useState(true);

  //Onload
  useEffect(() => {
    fetchStock.then(res => {
      setStock(res.data);
    });

    //Onload form state
    barcodeInputRef.current.focus();
  }, []);

  //Handlers
  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "count":
        setCount(value);
        break;
      case "barcode":
        setBarcode(value);
        break;
    }

    setCurrentItem({
      ...currentItem,
      barcode: barcodeState,
      name: nameState,
      price: priceState,
      count: countState
    });

    setCurrentItemEmpty(isEmpty(currentItem));
  };

  const onScan = event => {
    handleChange(event);
    const { value } = barcodeInputRef.current;
    const onStock = stock.find(item => item.barcode === value);

    setCount(countState + 1);
    setCurrentItem({ ...currentItem, countState });
    countRef.current.value = countState;

    if (onStock) {
      nameRef.current.value = onStock.name;
      priceRef.current.value = onStock.price;
      lbcountRef.current.textContent = `${onStock.quantity} +`;
    }

    //Focus next input field
    // nameRef.current.focus();
  };

  const handleBtnAddClick = () => {
    if (!isEmpty(currentItem)) {
      console.log(currentItem);
      setCart([...cart, currentItem]);
    }

    console.log(currentItem);
    console.log(cart);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setStockCartEmpty(cart.some(emptyString));
  };

  return (
    <div>
      <h1>Recieve Stock</h1>
      <section onSubmit={handleSubmit}>
        <fieldset>
          <label>Barcode</label>
          <input
            ref={barcodeInputRef}
            onChange={onScan}
            type="text"
            name="barcode"
            placeholder="barcode"
          />
        </fieldset>
        {currentItem.onStock && (
          <>
            <fieldset>
              <label>Name</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                ref={nameRef}
                placeholder="name"
              />
            </fieldset>
            <fieldset>
              <label>Price</label>
              <input
                onChange={handleChange}
                type="text"
                name="price"
                ref={priceRef}
                placeholder="price"
              />
            </fieldset>
            <fieldset>
              <label ref={lbcountRef}>0 +</label>
              <input
                onChange={handleChange}
                type="text"
                name="count"
                ref={countRef}
                placeholder="count"
              />
            </fieldset>
          </>
        )}
        <button onClick={handleBtnAddClick} disabled={currentItemEmpty}>
          Add to cart
        </button>
      </section>
      <form onSubmit={handleSubmit}>
        <h1>Stock Cart</h1>
        <section>
          {cart.map((item, index) => {
            return (
              <figure key={index} className="spring-card">
                <h4>{item.barcode}</h4>
                <h2>{item.name}</h2>
                <h3>{item.price}</h3>
                <h6>{item.count}</h6>
              </figure>
            );
          })}
        </section>
        <button type="submit" onClick={handleSubmit} disabled={stockCartEmpty}>
          ADD STOCK TO INVENTORY
        </button>
      </form>
    </div>
  );
}

function RecieveStock(newStock) {
  const _newStock = JSON.stringify(newStock);
  Axios.post(API_URL, _newStock, {
    headers: {
      "content-type": "application/json"
    }
  }).then(res => {
    alert(JSON.stringify(res));
  });
}

function useForm(initialState) {
  const [state, setState] = useState(initialState);
  const handleChange = event => {
    const { name: fieldName, value: fieldValue } = event.target;
    setState({
      ...state,
      [fieldName]: fieldValue
    });
  };
  const reset = () => setState(initialState);
  return [state, handleChange, reset];
}
export default AddStock;
