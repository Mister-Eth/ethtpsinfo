import React, { useEffect, useState } from 'react'
import './App.css'
import { generateChainData } from './fetch.js'
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import Web3 from 'web3'
import { Streamgraph } from './BarChart' // Make sure to import correctly

const w = new Web3(
  new Web3.providers.WebsocketProvider(
    'wss://mainnet.infura.io/ws/v3/93de6704477f4db299fb46752f19d4df'
  )
)

const inter = 2500

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
            (time) => now - time < inter
          )
          const tps = lastSecondTransactions.length / (inter / 1000)

          // Update the TPS data, shifting the array to the left and adding the new value at the end
          //   setTpsData((prevTpsData) => [...prevTpsData.slice(1), tps])
        })
      })
      .catch((err) => console.error(err))

    // Update TPS data every second, regardless of transactions
    const interval = setInterval(() => {
      setTpsData((prevTpsData) => {
        const now = Date.now()
        const lastSecondTransactions = transactionTimes.filter(
          (time) => now - time < inter
        )
        const tps = lastSecondTransactions.length / (inter / 1000)
        return [...prevTpsData.slice(1), tps]
      })
    }, inter)
  }, [])

  return (
    <ChakraProvider>
      <DarkMode>
        <div className="App">
          <header className="App-header">
            Ethereum is doing {tpsData[tpsData.length - 1].toFixed(0)}{' '}
            transactions per second
            <Streamgraph
              data={tpsData.map((tps, index) => ({ x: index, y: tps }))}
            />
          </header>
          <footer>Work in progress</footer>
        </div>
      </DarkMode>
    </ChakraProvider>
  )
}

export default App
