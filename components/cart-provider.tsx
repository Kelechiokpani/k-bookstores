// "use client";
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   type ReactNode,
// } from "react";
// import { useToast } from "@/components/ui/use-toast";

// export type CartItem = {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// };

// type CartContextType = {
//   cartItems: CartItem[];
//   wishlist: string[];

//   addToCart: (item: Omit<CartItem, "quantity">) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;

//   toggleWishlist: (id: string) => void;
//   isInWishlist: (id: string) => boolean;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [wishlist, setWishlist] = useState<string[]>([]);

//   const { toast } = useToast();

//   // Load from localStorage
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const savedCart = localStorage.getItem("cart");
//     const savedWishlist = localStorage.getItem("wishlist");

//     if (savedCart) {
//       try {
//         setCartItems(JSON.parse(savedCart));
//       } catch {
//         console.error("Cart parse error");
//       }
//     }

//     if (savedWishlist) {
//       try {
//         setWishlist(JSON.parse(savedWishlist));
//       } catch {
//         console.error("Wishlist parse error");
//       }
//     }
//   }, []);

//   // Persist cart
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Persist wishlist
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   // CART FUNCTIONS
//   const addToCart = (item: Omit<CartItem, "quantity">) => {
//     let message = "";

//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);

//       if (existingItem) {
//         message = `${item.name} quantity updated to ${
//           existingItem.quantity + 1
//         }`;
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       } else {
//         message = `${item.name} added to your cart`;
//         return [...prevItems, { ...item, quantity: 1 }];
//       }
//     });

//     toast({
//       title: "Item added to cart",
//       description: message,
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setCartItems((prevItems) => {
//       const itemToRemove = prevItems.find((i) => i.id === id);
//       if (itemToRemove) {
//         toast({
//           title: "Item removed",
//           description: `${itemToRemove.name} removed from your cart`,
//         });
//       }
//       return prevItems.filter((item) => item.id !== id);
//     });
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) {
//       removeFromCart(id);
//       return;
//     }

//     setCartItems((prevItems) =>
//       prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     toast({
//       title: "Cart cleared",
//       description: "All items have been removed from your cart",
//     });
//   };

//   // WISHLIST FUNCTIONS
//   // const toggleWishlist = (id: string) => {
//   //   setWishlist((prev) =>
//   //     prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//   //   );
//   // };

//   const toggleWishlist = (id: string) => {
//     setWishlist((prev) => {
//       let updated;

//       if (prev.includes(id)) {
//         updated = prev.filter((item) => item !== id);
//       } else {
//         updated = [...prev, id];
//       }

//       localStorage.setItem("wishlist", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const isInWishlist = (id: string) => wishlist.includes(id);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         wishlist,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         toggleWishlist,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }


"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useToast } from "@/components/ui/use-toast";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  wishlist: any[];

  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toast } = useToast();

  // Load from localStorage (runs only in browser)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (err) {
      console.error("Storage parse error:", err);
    }
  }, []);

  // Persist cart
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist wishlist
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // CART FUNCTIONS
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    let message = "";

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        message = `${item.name} quantity updated to ${
          existingItem.quantity + 1
        }`;
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        message = `${item.name} added to your cart`;
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    toast({
      title: "Item added to cart",
      description: message,
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.id === id);

      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} removed from your cart`,
        });
      }

      return prevItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  // WISHLIST FUNCTIONS
  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
