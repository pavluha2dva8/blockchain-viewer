import React, { CSSProperties, FC } from 'react'
import { Oval } from 'react-loader-spinner'

import { Header } from './components/Header'
import { IndexInfo } from './components/IndexInfo'
import { useGroupList } from './utils'
import './App.css'

interface stylesT {
  [key: string]: CSSProperties
}

const styles: stylesT = {
  title: {
    fontFamily: 'Playfair Display',
    fontSize: 54,
    fontWeight: 700,
    lineHeight: '61px',
    textAlign: 'center',
  },
}

export const App: FC = () => {
  const { isLoading, groupList } = useGroupList()

  if (isLoading || !groupList) {
    return (
      <Oval
        height={100}
        width={100}
        ariaLabel={'Loading'}
        wrapperStyle={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      />
    )
  }

  return (
    <div className="App">
      <Header />
      <h1 style={styles.title}>All Indices</h1>

      {groupList.map((group) => (
        <div key={group.name}>
          <h3>{group.name}</h3>
          <IndexInfo indexes={group.indexes} />
        </div>
      ))}
    </div>
  )
}
