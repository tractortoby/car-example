import React from "react";
// import "./styles.css";
const { useReducer } = React;

const initialState = {
  additionalPrice: 0,
  car: {
    price: 26395,
    name: "2019 Ford Mustang",
    image:
      "https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg",
    features: [],
  },
  store: [
    { id: 1, name: "V-6 engine", price: 1500 },
    { id: 2, name: "Racing detail package", price: 1500 },
    { id: 3, name: "Premium sound system", price: 500 },
    { id: 4, name: "Rear spoiler", price: 250 },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "remove_item":
      return {
        ...state,
        additionalPrice: state.additionalPrice - action.item.price,
        car: {
          ...state.car,
          features: state.car.features.filter((x) => x.id !== action.item.id),
        },
        store: [...state.store, action.item],
      };
    case "buy_item":
      return {
        ...state,
        additionalPrice: state.additionalPrice + action.item.price,
        car: { ...state.car, features: [...state.car.features, action.item] },
        store: state.store.filter((x) => x.id !== action.item.id),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function removeFeature(item) {
    dispatch({ type: "remove_item", item });
  }

  function buyItem(item) {
    dispatch({ type: "buy_item", item });
  }

  return (
    <div className="boxes">
      <div className="box">
        <figure className="image is-128x128">
          <img src={state.car.image} />
        </figure>
        <h2>{state.car.name}</h2>
        <p>Amount: ${state.car.price}</p>
        <div className="content">
          <h6>Added features:</h6>
          {state.car.features.length ? (
            <ol type="1">
              {state.car.features.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => removeFeature(item)}
                    className="button"
                  >
                    X
                  </button>
                  {item.name}
                </li>
              ))}
            </ol>
          ) : (
            <p>You can purchase items from the store.</p>
          )}
        </div>
      </div>
      <div className="box">
        <div className="content">
          <h4>Additional Features</h4>
          {state.store.length ? (
            <ol type="1">
              {state.store.map((item) => (
                <li key={item.id}>
                  <button onClick={() => buyItem(item)} className="button">
                    Add
                  </button>
                  {item.name} (+{item.price})
                </li>
              ))}
            </ol>
          ) : (
            <p>Nice looking car!</p>
          )}
        </div>

        <div className="content">
          <h4>Total Amount: ${state.car.price + state.additionalPrice}</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
