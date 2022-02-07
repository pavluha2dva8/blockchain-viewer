import { BigNumberish, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import contractAbi from '../contractAbi.json'

const provider = new ethers.providers.Web3Provider((window as any).ethereum)
const contract = new ethers.Contract('0x4f7f1380239450AAD5af611DB3c3c1bb51049c29', contractAbi, provider)

export const getGroups = async (): Promise<[string, BigNumberish][]> => {
  const groupsIds: BigNumberish[] = await contract.callStatic.getGroupIds()
  return await Promise.all(groupsIds.map(async (groupId) => await contract.callStatic.getGroup(groupId)))
}

export const getIndexes = async (indexes: BigNumberish[]): Promise<any> =>
  await Promise.all(indexes.map((indexValue) => contract.callStatic.getIndex(indexValue)))

export const useGroupList = (): { isLoading: boolean; groupList: any[] | null } => {
  const [isLoading, setIsLoading] = useState(false)
  const [groupList, setGroupList] = useState<[string, BigNumberish][] | null>(null)

  useEffect(() => {
    setIsLoading(true)

    getGroups().then((groupList) => {
      setGroupList(groupList)
      setIsLoading(false)
    })
  }, [])

  return { isLoading, groupList }
}

export const useIndexesList = (indexes: BigNumberish[]): { isLoading: boolean; indexList: any[] | null } => {
  const [isLoading, setIsLoading] = useState(false)
  const [indexList, setIndexesList] = useState<any[] | null>(null)

  useEffect(() => {
    setIsLoading(true)

    getIndexes(indexes).then((indexList) => {
      setIndexesList(indexList)
      setIsLoading(false)
    })
  }, [indexes])

  return { isLoading, indexList }
}
