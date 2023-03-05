import { createContext, ReactNode, useEffect, useState } from "react";

type ShoppingCartProduct = {
  cartItemId: string
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: number
    priceFormatted: string
    defaultPriceId: string
  }
}

type ShoppingCart = {
  products: ShoppingCartProduct[]
  totalPrice: number
  addProductToCart: (product: ShoppingCartProduct) => void
  removeProductFromCart: (cartItemId: string) => void
}

interface ShoppingCartContextProviderProps {
  children: ReactNode
}

export const ShoppingCartContext = createContext({} as ShoppingCart)

export function ShoppingCartContextProvider({ children }: ShoppingCartContextProviderProps) {
  const [products, setProducts] = useState<ShoppingCartProduct[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  function addProductToCart(product: ShoppingCartProduct) {
    const newProductList = [...products, product]
    localStorage.setItem('@ignite-shop_ShoppingCart', JSON.stringify(newProductList))
    setProducts(newProductList)
  }

  function removeProductFromCart(cartItemId: string) {
    const cartWithoutProductToRemove = products.filter((product) => product.cartItemId !== cartItemId)
    localStorage.setItem('@ignite-shop_ShoppingCart', JSON.stringify(cartWithoutProductToRemove))
    setProducts(cartWithoutProductToRemove)
  }

  useEffect(() => {
    const newTotalPrice = products.reduce((acc, product) => {
      acc.totalPrice += product.product.price

      return acc
    }, { totalPrice: 0 })

    setTotalPrice(newTotalPrice.totalPrice)
  }, [products])

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('@ignite-shop_ShoppingCart'))
    setProducts(products)
  }, [])

  return (
    <ShoppingCartContext.Provider
      value={{ 
        products,
        totalPrice,
        addProductToCart,
        removeProductFromCart
      }}
    >
      { children }
    </ShoppingCartContext.Provider>
  )
}