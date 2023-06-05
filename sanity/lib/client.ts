import { createClient } from 'next-sanity'

//import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion:'v2023-06-01',
  dataset:'production',
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token:process.env.BUNNY_BAKERY_SANITY_TOKEN,
  useCdn:true,
})
