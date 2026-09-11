import React from 'react'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const Favourites = () => {
  return (
    <div className="text-3xl text-center pt-28 lg:pt-40 pl-4 lg:pl-75">Favourites</div>
  )
}

export default Favourites