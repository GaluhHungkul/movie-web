import ClientPopularPage  from '@/components/popularPage/ClientPopularPage'
import React, { Suspense } from 'react'

const PopularityPage = () => {
    
  return (
    <Suspense>
      <ClientPopularPage />
    </Suspense>
  )
}

export default PopularityPage