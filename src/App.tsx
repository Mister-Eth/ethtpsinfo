import React, { useEffect, useState } from 'react'
import './App.css'
import { generateChainData } from './fetch.js'
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { Stream } from './components'
import Web3 from 'web3'
import { BarChart } from './BarChart' // Make sure to import correctly

const w = new Web3(
  new Web3.providers.WebsocketProvider(
    'wss://mainnet.infura.io/ws/v3/93de6704477f4db299fb46752f19d4df'
  )
)

function App() {
  const [tpsData, setTpsData] = useState(Array(60).fill(0)) // Initialize with 60 data points

  useEffect(() => {
    generateChainData().then((data) => console.log(data))
    const transactionTimes: number[] = []

    const subscription = w.eth
      .subscribe('newPendingTransactions', (err: any, block: any) => {
        if (err) console.log(err)
      })
      .then((subscription) => {
        subscription.on('data', (tx) => {
          const now = Date.now()
          transactionTimes.push(now)
          // Filter transactions in the last second
          const lastSecondTransactions = transactionTimes.filter(
            (time) => now - time < 1000
          )
          const tps = lastSecondTransactions.length

          // Update the TPS data, shifting the array to the left and adding the new value at the end
          setTpsData((prevTpsData) => [...prevTpsData.slice(1), tps])
        })
      })
      .catch((err) => console.error(err))

    // Update TPS data every second, regardless of transactions
    const interval = setInterval(() => {
      setTpsData((prevTpsData) => {
        const now = Date.now()
        const lastSecondTransactions = transactionTimes.filter(
          (time) => now - time < 1000
        )
        const tps = lastSecondTransactions.length
        return [...prevTpsData.slice(1), tps]
      })
    }, 1000)
  }, [])

  return (
    <ChakraProvider>
      <DarkMode>
        <div className="App">
          <header className="App-header">
            Ethereum is doing {tpsData[tpsData.length - 1].toFixed(1)}{' '}
            transactions per second
            <BarChart
              data={tpsData.map((tps, index) => ({ x: index, y: tps }))}
            />
          </header>
        </div>
      </DarkMode>
    </ChakraProvider>
  )
}

export default App
