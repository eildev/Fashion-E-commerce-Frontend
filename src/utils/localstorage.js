export const getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('fCartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  };
  
  export const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('fCartItems', JSON.stringify(cartItems));
  };