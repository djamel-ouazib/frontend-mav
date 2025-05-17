import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Récupère les produits du panier au chargement de l'application
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cart");
        // On ajoute une propriété quantity par défaut à 1
        const productsWithQuantity = response.data.map((product) => ({
          ...product,
          quantity: 1,
        }));
        setCartProducts(productsWithQuantity);
      } catch (error) {
        console.error("Erreur lors de la récupération du panier :", error);
      }
    };
    fetchCart();
  }, []);

  // Calculer le nombre total d'articles
  const totalItems = cartProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  // Fonctions pour mettre à jour le panier (ajouter, modifier la quantité, supprimer)
  const addToCart = async (product) => {
    try {
      // Envoie la requête POST au backend
      const response = await axios.post("http://localhost:3000/api/cart", product);
  
      if (response.status === 201) {
        const savedProduct = response.data.cartItem;
  
        // Ajoute le produit retourné (avec l'_id correct) au state
        setCartProducts((prev) => [...prev, { ...savedProduct, quantity: 1 }]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };
  

  const updateQuantity = (id, newQuantity) => {
    setCartProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, quantity: newQuantity } : p))
    );
  };

  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/cart/${id}`
      );
      if (response.status === 200) {
        setCartProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        totalItems,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
