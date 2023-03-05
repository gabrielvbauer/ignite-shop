import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { toast } from 'react-toastify'
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { useContext, useState } from "react";
import Head from "next/head";
import { ShoppingCartContext } from "../../context/ShoppinCartContext";

export interface ProductProps {
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

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { addProductToCart } = useContext(ShoppingCartContext)

  async function handleAddItemToCart() {
    addProductToCart({
      cartItemId: `${product.id}-${new Date().toISOString()}`,
      product: product
    })
    toast('Produto adicionado à sacola', {type: "success", theme: "dark"})
  }

  if (isFallback) {}

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>  
      </Head>
      
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='' />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormatted}</span>

          <p>{product.description}</p>

          <button onClick={handleAddItemToCart}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: price.unit_amount,
        priceFormatted: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}