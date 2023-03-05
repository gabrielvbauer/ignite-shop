import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Handbag, X } from "phosphor-react";
import { BagItem, DialogContent, DialogClose, DialogTitle, BagItemContainer, Quantity, ImageContainer, Total } from "./styles";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppinCartContext";
import axios from "axios";
import { toast } from "react-toastify";

export function Sidebar() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { products, totalPrice, removeProductFromCart } = useContext(ShoppingCartContext)

  function handleRemoveProductFromCart(id: string) {
    removeProductFromCart(id)
  }

  async function handleBuyProducts() {
    setIsCreatingCheckoutSession(true)

    try {
      const response = await axios.post('/api/checkout', {
        products: products.map((product) => product.product.defaultPriceId)
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      toast('Falha ao conectar ao checkout', {
        type: "error",
        theme: "dark"
      })
      console.log(error)
    }
    
    setIsCreatingCheckoutSession(false);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <Handbag size={24} weight="bold" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <DialogContent>
          <DialogClose>
            <X size={24} weight={"bold"} />
          </DialogClose>
          <DialogTitle>Sacola de compras</DialogTitle>

          <BagItemContainer>
            {products.map((product) => (
              <BagItem key={product.cartItemId}>
                <ImageContainer>
                  <Image src={product.product.imageUrl} width={94} height={94} alt="" />
                </ImageContainer>

                <div>
                  <h3>{product.product.name}</h3>
                  <span>{product.product.priceFormatted}</span>

                  <a onClick={() => handleRemoveProductFromCart(product.cartItemId)}>Remover</a>
                </div>
              </BagItem>
            ))}
          </BagItemContainer>

          <footer>
            <Quantity>
              <span>Quantidade</span>
              <span>{products.length} itens</span>
            </Quantity>
            <Total>
              <span>Valor total</span>
              <span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalPrice / 100)}
              </span>
            </Total>

            <button onClick={handleBuyProducts} disabled={isCreatingCheckoutSession}>Finalizar compra</button>
          </footer>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}