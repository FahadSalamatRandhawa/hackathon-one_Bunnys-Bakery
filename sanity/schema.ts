import { type SchemaTypeDefinition } from 'sanity'
import Product from './Product'
import BunnyBakery from './BunnyBakery'
import NavBar from './NavBar'
import socialMedia from './logo'
import { ProductVariants } from './ProductVariants'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product,BunnyBakery,NavBar,socialMedia,ProductVariants],
}
