import React from 'react'
import collectionStyle from '../scss/Collection.module.scss'
import ProductCard from '../components/ProductCard'
import Img from './Img'
import Link from 'next/link'
import slug from 'slug'

export default function CollectionSection({ collection }) {
  let renderContent = <div className='text-center p-4'>Nothing to show</div>
  if (collection.type === 'product' || collection.type === 'single_category') {
    renderContent = (
      <div className='d-flex flex-row flex-nowrap'>
        {collection.items.map((product, index) => {
          return (
            <div className={collectionStyle.collectionProductCard} key={index}>
              <ProductCard product={product} />
            </div>
          )
        })}
      </div>
    )
  } else if (collection.type === 'collection') {
    renderContent = (
      <div className='d-flex flex-row flex-nowrap'>
        {collection.items.map((collect, index) => {
          return (
            <Link
              href={`/collections/[collectionId]/[collectionName]`}
              as={`/collections/${collect.id}/${slug(collect.title)}`}
              key={index}
            >
              <a
                className={`text-reset ${collectionStyle.collectionCategoryCard}`}
              >
                <Img src={collect.cover} />
                <h6>{collect.title}</h6>
              </a>
            </Link>
          )
        })}
      </div>
    )
  } else {
    renderContent = (
      <div className='d-flex flex-row flex-nowrap'>
        {collection.items.map((category, index) => {
          return (
            <Link
              href={`/categories/[categoryId]/products`}
              as={`/categories/${category.id}/products`}
              key={index}
            >
              <a
                className={`text-reset ${collectionStyle.collectionCategoryCard}`}
              >
                <Img src={category.thumbnail} />
                <h6>{category.mm_title || category.title}</h6>
              </a>
            </Link>
          )
        })}
      </div>
    )
  }
  return (
    <div className={collectionStyle.collection}>
      <div
        className={`d-flex justify-content-between ${collectionStyle.collectionHeader}`}
      >
        <h6>{collection.mm_title || collection.title}</h6>
        <span>
          <Link
            href={collection.id === 0 ? `/sales` : `/collections/[collectionId]/[collectionName]`}
            as={collection.id === 0 ? `/sales` : `/collections/${collection.id}/${slug(collection.title)}`}
          >
            <a>အားလုံးကြည့်ရန်</a>
          </Link>
        </span>
      </div>
      <div className={collectionStyle.collectionContent}>{renderContent}</div>
    </div>
  )
}
