import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Handbag, X } from "phosphor-react";
import { BagItem, DialogContent, DialogClose, DialogTitle, BagItemContainer, Quantity, ImageContainer, Total } from "./styles";
import camiseta1 from '../../assets/camisetas/1.png'

export function Sidebar() {
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
            <BagItem>
              <ImageContainer>
                <Image src={camiseta1} width={94} height={94} alt="" />
              </ImageContainer>

              <div>
                <h3>Camiseta Beyong the Limits</h3>
                <span>R$ 79,90</span>

                <a>Remover</a>
              </div>
            </BagItem>

            <BagItem>
              <ImageContainer>
                <Image src={camiseta1} width={94} height={94} alt="" />
              </ImageContainer>

              <div>
                <h3>Camiseta Beyong the Limits</h3>
                <span>R$ 79,90</span>

                <a>Remover</a>
              </div>
            </BagItem>

            <BagItem>
              <ImageContainer>
                <Image src={camiseta1} width={94} height={94} alt="" />
              </ImageContainer>

              <div>
                <h3>Camiseta Beyong the Limits</h3>
                <span>R$ 79,90</span>

                <a>Remover</a>
              </div>
            </BagItem>
          </BagItemContainer>

          <footer>
            <Quantity>
              <span>Quantidade</span>
              <span>3 itens</span>
            </Quantity>
            <Total>
              <span>Valor total</span>
              <span>R$ 270,00</span>
            </Total>

            <button>Finalizar compra</button>
          </footer>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}