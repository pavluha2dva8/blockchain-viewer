import React, { CSSProperties, FC, useCallback, useEffect, useState } from 'react'
import { BigNumberish, ethers } from 'ethers'
import { Hearts } from 'react-loader-spinner'

import contractAbi from './contractAbi.json'
import { Header } from './components/Header'
import { IndexInfo } from './components/IndexInfo'
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
  const [deFiIndices, setDeFiIndices] = useState<BigNumberish[] | null>(null)
  const [otherIndices, setOtherIndices] = useState<BigNumberish[] | null>(null)

  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const contract = new ethers.Contract('0x4f7f1380239450AAD5af611DB3c3c1bb51049c29', contractAbi, provider)

  const getGroupById = useCallback(async (groupId: BigNumberish) => await contract.callStatic.getGroup(groupId), [])
  const getIndexData = useCallback(async (index: BigNumberish) => await contract.callStatic.getIndex(index), [])
  const filterGroupByName = (name: string, groups: any[]) => groups.filter((group) => group['name'].includes(name))

  useEffect(() => {
    ;(async () => {
      const groupsIds: BigNumberish[] = await contract.callStatic.getGroupIds()
      const groups = await Promise.all(groupsIds.map(async (groupId) => await getGroupById(groupId)))

      const [deFiGroup] = filterGroupByName('DeFi', groups)
      const [otherGroup] = filterGroupByName('Other', groups)

      const deFiIndices = await Promise.all(
        deFiGroup['indexes'].map(async (deFiIndex: number) => await getIndexData(deFiIndex)),
      )
      const otherIndices = await Promise.all(
        otherGroup['indexes'].map(async (deFiIndex: number) => await getIndexData(deFiIndex)),
      )

      setDeFiIndices(deFiIndices)
      setOtherIndices(otherIndices)
    })()
  }, [getGroupById, getIndexData])

  return (
    <div className="App">
      {!deFiIndices && !otherIndices ? (
        <Hearts
          height={150}
          width={150}
          ariaLabel={'Loading'}
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
        />
      ) : (
        <>
          <Header />
          <h1 style={styles.title}>All Indices</h1>
          <h3>Assets Index</h3>
          {deFiIndices && <IndexInfo indexes={deFiIndices} />}
          <h3>Other Index</h3>
          {otherIndices && <IndexInfo indexes={otherIndices} />}
        </>
      )}
    </div>
  )
}
