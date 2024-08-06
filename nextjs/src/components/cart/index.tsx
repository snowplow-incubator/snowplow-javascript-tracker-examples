import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { useCartStore } from "@/store";
import { Recommendations } from "../recommendations";
import { useEffect } from "react";
import { trackCheckoutStepSpec } from "@/lib/tracking/snowplow";

export function Cart() {
  const cartProducts = useCartStore((state) => state.cartProducts);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const cartId = useCartStore((state) => state.cartId);

  async function handleCheckout() {
    const res = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartProducts,
        totalAmount,
        cartId,
      }),
    });
    trackCheckoutStepSpec({
      step: 2,
      payment_method: "card",
    });
    const body = await res.json();

    window.location.href = body.url;
  }

  useEffect(() => {
    if (!cartProducts.length) {
      return;
    }

    trackCheckoutStepSpec({
      step: 1,
    });
  }, [cartProducts.length, cartProducts, totalAmount]);

  return (
    <>
      <div className={styles.cartPage}>
        <div className={styles.cartContainer}>
          <div className={styles.cart}>
            <div className={styles.productsCol}>
              <div className={styles.membersNotice}>
                <div className={styles.membersNoticeContent}>
                  <h4>Free shipping for members.</h4>
                  Become a Snowplow member and get fast and free deliveries.{" "}
                  <Link href="/">Join us</Link> or <br />
                  <Link href="/">Log in</Link>
                </div>
              </div>
              <h4 className={styles.cartTitle}>Cart</h4>
              <div className={styles.products}>
                {cartProducts.length
                  ? cartProducts.map((product) => (
                      <div key={product.id} className={styles.productContainer}>
                        <div className={styles.product}>
                          <figure className={styles.productImage}>
                            <Image
                              width={150}
                              height={150}
                              alt="shoe"
                              src={product.imgSrc}
                            ></Image>
                          </figure>
                          <div className={styles.productInfo}>
                            <div className={styles.productDetails}>
                              <span>{product.name}</span>
                              <div className={styles.detail}>
                                {product.category}
                              </div>
                              <div className={styles.detail}>
                                {product.variant}
                              </div>
                              <div className={styles.detail}>
                                {product.size}, Quantity{" "}
                                {product.quantityInCart}
                              </div>
                            </div>
                            <div className={styles.productPrice}>
                              <span>
                                ${product.price * (product.quantityInCart || 1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : "No products in your cart"}
              </div>
            </div>
            <div className={styles.paymentCol}>
              <aside className={styles.paymentContainer}>
                <h4>Overview</h4>
                <div className={styles.paymentDetailContainer}>
                  Subtotal
                  <div className={styles.paymentDetailSummary}>
                    ${totalAmount.toFixed(2)}
                  </div>
                </div>
                <div className={styles.paymentDetailContainer}>
                  Shipping cost
                  <div className={styles.paymentDetailSummary}>Free</div>
                </div>
                <div className={styles.totalContainer}>
                  <span>Total</span>
                  <span className={styles.total}>
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className={styles.actions}>
                  <section>
                    <button
                      className={styles.checkoutButton}
                      type="submit"
                      role="link"
                      onClick={handleCheckout}
                      disabled={!cartProducts.length}
                    >
                      Checkout
                    </button>
                  </section>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Recommendations containerClass={styles.noPadding} />
    </>
  );
}
