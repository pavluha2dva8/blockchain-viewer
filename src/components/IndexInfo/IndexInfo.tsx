import React, { CSSProperties, FC } from 'react'
import { ethers } from 'ethers'

import { IndexInfoItem } from '../IndexInfoItem'

interface stylesT {
  [key: string]: CSSProperties
}

const styles: stylesT = {
  indicesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },
}

export const IndexInfo: FC<{ indexes: any[] }> = ({ indexes }) => {
  return (
    <div style={styles.indicesContainer}>
      {indexes.map((index) => {
        const usdPrice = (index['usdPriceInCents'].toNumber() / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        })
        const ethPrice = ethers.utils.formatEther(index['ethPriceInWei'])
        const capitalization = (index['usdCapitalization'].toNumber() / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
        const percentageChange = index['percentageChange'].toNumber()

        return (
          <IndexInfoItem
            key={index['name']}
            title={index['name']}
            usdPrice={usdPrice}
            ethPrice={ethPrice}
            capitalization={capitalization}
            percentageChange={percentageChange}
          />
        )
      })}
    </div>
  )
}
