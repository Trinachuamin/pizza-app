import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// Header Component
function Header() {
    const date = new Date();
    const showTime = date.getHours();
    const isOpen = showTime >= 10 && showTime <= 22;
  
    return (
      <header className="header">
        <h1>Trina's Pizza Co.</h1>
        {isOpen && <h2>Authentic Italian Cuisine</h2>}
      </header>
    );
  }

// Pizza Component
function Pizza({ name, ingredients, price, image }) {
  return (
    <div className="pizza">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <p className="price">${price}</p>
    </div>
  );
}

// Menu Component
function Menu() {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

  // Filter pizzas based on the search query
  const filteredPizzas = pizzaData.filter(
    (pizza) =>
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="menu">
      <h2>Our Menu</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a pizza..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
        className="search-bar"
      />

      {/* Display filtered pizzas */}
      <div className="pizza-grid">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza, index) => (
            <Pizza
              key={index}
              name={pizza.name}
              ingredients={pizza.ingredients}
              price={pizza.price}
              image={pizza.photoName}
            />
          ))
        ) : (
          <p>No pizzas found</p> // Message when no pizzas match the search
        )}
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
    const [orderMessage, setOrderMessage] = useState(""); // State to hold the order confirmation message
    const date = new Date();
    const showTime = date.getHours();
    const isOpen = showTime >= 10 && showTime <= 22;
  
    // Function to handle Order button click
    const handleOrderClick = () => {
      setOrderMessage("Thank you for your order! We will process it shortly.");
    };
  
    return (
      <footer className="footer">
        {isOpen ? (
          <>
            <p>We're currently open</p>
            <button onClick={handleOrderClick}>Order</button>
            {orderMessage && <p>{orderMessage}</p>}
          </>
        ) : (
          <p>Sorry, we're closed</p>
        )}
      </footer>
    );
  }

// App Component
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
