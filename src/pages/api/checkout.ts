import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

type LineItemsType = {
  price: string
  quantity: number
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const products = req.body.products

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!products) {
    return res.status(400).json({ error: 'Price not found' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const lineItems = products.reduce((acc, product) => {
    let itemInList = acc.find((item) => item.price === product)

    if (itemInList !== undefined) {
      acc[acc.indexOf(itemInList)] = {
        price: product,
        quantity: itemInList.quantity + 1
      }
    } else {
      acc.push({
        price: product,
        quantity: 1
      })
    }

    return acc
  }, [])

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: lineItems
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}