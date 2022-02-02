import React, { CSSProperties, FC } from 'react'
interface stylesT {
  [key: string]: CSSProperties
}

const styles: stylesT = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 153,
    height: 32,
    borderRadius: 10,
    background: '#E5E5E5',
  },
  logo: {
    fontWeight: 600,
  },
}

export const Header: FC = () => {
  return (
    <header style={styles.header}>
      <span style={styles.logo}>Logotype</span>
      <button style={styles.button}>Connect wallet</button>
    </header>
  )
}
