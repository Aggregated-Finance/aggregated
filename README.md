# Aggregated USD
## The home of stability

The AgFin repo has 2 uses:
 - [React Website](https://aggregated.tk)
 - Hardhat contracts and tests

## React website
### How to install
```
npm install
# or, if using yarn
yarn install
```

### How to start/build
```
# start dev. server
npm start
# or
yarn start

# build react site
npm run build
# or
yarn build
```

### Constants
Aggregated provides a `src/constants.js` file to allow devs to easily test/modify the code to suit their contract addresses.
For now, the only key is `agusd`:
```
module.exports = {
  agusd: "0x000000000000000000000000000000000000dEaD" // <== your new contract address
}
```

## Contract/Tests
### The contract
`contracts/AgUSD.sol` contains the solidity file for AgUSD. The contracts you may want to take a look at are (line #'s may not be accurate):
 - AgUSD => Line 337
 - Cooldown => Line 315
 - AGUSDErrors => Line 6

### Compiling
To compile the contract run `npx hardhat compile`. The output should be:
```
Solidity 0.8.10 is not fully supported yet. You can still use Hardhat, but some features, like stack traces, might not work correctly.

Learn more at https://hardhat.org/reference/solidity-support

Compiled 1 Solidity file successfully
```

### Running tests
All tests are currently located in `tests/AgUSD.js`. Run them with `npx hardhat test tests/AgUSD.js`. The output should be:
```
AgUSD - Basic ERC20 read functions.
  √ Should return AggregatedUSD as the name (3177ms)
  √ Should return AgUSD as the symbol (334ms)
  √ Should return 0 as the totalSupply (263ms)

AgUSD - Basic ERC20 write functions.
  √ Approve and test approval (288ms)

AgUSD - Custom functions
  √ Test cooldown timer (should be over 0) (315ms)
  √ Changing gate availability (352ms)
  √ Changing treasurySend (355ms)
  √ Changing multisig (308ms)


8 passing (5s)
```

## The end!
Make sure to⭐star or 👀 watch the repo to be notified for updates!

Signed, AgTeam.
