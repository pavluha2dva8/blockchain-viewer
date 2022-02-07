import React, { CSSProperties, FC } from 'react'

interface stylesT {
  [key: string]: CSSProperties
}

const styles: stylesT = {
  container: {
    minWidth: 287,
    height: 133,
    padding: 20,
    flexGrow: 1,
    boxSizing: 'border-box',
    background: '#FFFFFF',
    borderRadius: 10,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5), 0px 0px 5px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '20px',
  },
  currencyRatio: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '20px',
    marginTop: 10,
    marginBottom: 20,
  },
  capitalization: {
    fontSize: 15,
    fontWeight: 400,
    lineHeight: '19px',
  },
  percentageChange: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: '17px',
    color: '#03CEA4',
  },
  percentageChangeNegative: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: '17px',
    color: '#ff0000',
  },
  lastRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

interface IndexInfoItemProps {
  title: string
  usdPrice: string
  ethPrice: string
  capitalization: string
  percentageChange: number
}

export const IndexInfoItem: FC<IndexInfoItemProps> = ({
  title,
  usdPrice,
  ethPrice,
  capitalization,
  percentageChange,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>{title}</div>
      <div style={styles.currencyRatio}>
        {usdPrice} / {ethPrice} ETH
      </div>
      <div style={styles.lastRow}>
        <div style={styles.capitalization}>{capitalization}</div>
        <div style={percentageChange >= 0 ? styles.percentageChange : styles.percentageChangeNegative}>
          {percentageChange >= 0 && '+'}
          {percentageChange}%
        </div>
      </div>
    </div>
  )
}
