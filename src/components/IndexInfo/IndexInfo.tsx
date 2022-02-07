import React, { CSSProperties, FC } from 'react'
import { BigNumberish, ethers } from 'ethers'
import { Oval } from 'react-loader-spinner'

import { IndexInfoItem } from '../IndexInfoItem'
import { useIndexesList } from '../../utils'

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

export const IndexInfo: FC<{ indexes: BigNumberish[] }> = ({ indexes }) => {
  const { isLoading, indexList } = useIndexesList(indexes)

  if (isLoading) {
    return (
      <Oval height={50} width={50} ariaLabel={'Loading'} wrapperStyle={{ display: 'flex', justifyContent: 'center' }} />
    )
  }

  if (!indexList) {
    return <>Nothing to show</>
  }

  return (
    <div style={styles.indicesContainer}>
      {indexList.map((index) => {
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
