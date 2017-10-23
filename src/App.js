import React, { Component } from 'react'
import GeneratedToken from '../build/contracts/GeneratedToken.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const generatedToken = contract(GeneratedToken)

    generatedToken.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log('making token')
      generatedToken.new(1000000, "testcoin", "TST", 0, {
        from: accounts[0]
      }).then((instance) => {
        console.log('tokkken made')
        console.log(instance);
      }).catch(e => console.log(e))
    })
  }

  render() {
    return (
      <div className="App">
        <main className="container">
        <h1>Create an ERC20 Token</h1>
        <p>Use this site to create your own fixed-supply ERC20 token.</p>
        <p>Some example use cases:</p>
        <ul>
          <li>Redeemable tickets to a culinary festival, where booths are paid for food/drinks using the token</li>
          <li>Selling rights to your time, where one token can represent one minute</li>
          <li>Distributing "voting shares", where holding tokens allows one to vote</li>
        </ul>
        <p>This tool is completely free to use -- you just need to pay Ether for gas. <a href="https://github.com/macalinao/tokengen">View the source on GitHub.</a></p>
        <form>
          <div className="inputGroup">
            <label><strong>Token name</strong><small>ex. IanCoin</small></label>
            <input type="text"/>
          </div>
          <div className="inputGroup">
            <label><strong>Token symbol</strong><small>ex. IAN</small></label>
            <input type="text"/>
          </div>
          <div className="inputGroup">
            <label><strong>Initial supply</strong><small>Number of tokens to generate</small></label>
            <input type="text"/>
          </div>
          <div className="inputGroup">
            <label><strong>Decimals</strong><small>Number of places to divide the token by. 0 means tokens cannot be divided.</small></label>
            <input type="text"/>
          </div>
          <button>Generate my token</button>
        </form>
        <p>Welcome to 2017, where creating a new cryptocurrency is as simple as creating a new instance of a smart contract.</p>
        <p>Simply enter your token parameters below to get your desired amount of currency. This can be imported into <a href="https://wallet.ethereum.org">Ethereum Wallet</a> or the wallet software of your choosing.</p>
        <p>You can use any Web3-enabled browser to use this tool. I recommend <a href="https://metamask.io">MetaMask</a>.</p>
        <p>This tool is free to use. All you need to pay is gas fees.</p>
        </main>
      </div>
    );
  }
}

export default App
