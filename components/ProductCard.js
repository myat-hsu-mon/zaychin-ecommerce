import { Card } from 'react-bootstrap'
import Quantity from './Quantity'
import Link from 'next/link'
import slug from 'slug'
import styles from '../scss/ProductCard.module.scss'
import { useRouter } from 'next/router'

function ProductCard({
  product,
  horizontal,
  href,
  hideQuantitySelector,
  cartKey,
  onClick,
}) {
  let L = Link
  if (href) {
    L = 'a'
  } else if (onClick) {
    L = 'div'
  }
  return (
    <Card className={`product-card ${horizontal && styles.horizontalCard}`}>
      <L
        href={href || `/products/[productId]/[productName]`}
        as={`/products/${product.id}/${slug(product.name)}`}
        passHref
        onClick={onClick}
      >
        <a className={`${horizontal && styles.horizontal}`}>
          <Card.Img src={product.thumb + `?${new Date().toISOString().split('T')[0]}`} alt={product.name}/>
          <div>
            <Card.Title
              as={'h6'}
              className={`text-secondary ${!horizontal && 'text-center'} ${styles.productTitle}`}
            >
              {product.mm_name || product.name}
            </Card.Title>
          </div>
        </a>
      </L>
      {!hideQuantitySelector && (
        <Quantity
          // displayPrice={!horizontal}
          horizontal={horizontal}
          product={product}
          cartKey={cartKey}
        />
      )}
    </Card>
  )
}
export default ProductCard
