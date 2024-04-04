
export const borrowAddressSepolia = '0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb'
export const optionsAddressSepolia = '0xAC31e267FC123De9A61F3722a7d09c0c16b1f799'
export const poolAddressSepolia = '0x09732eef05D41773c3fFF7385E30D35605111f8F';

export const borrowAddressMumbai = '0xbA78a0a4897a6E77d8Eec2f0285767124bC8Dc54'
export const optionsAddressMumbai = '0xFDF1C29DAf724Be45Dae1Cd3ABACc595f6ec01E8'

export const borrowABISepolia = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      }
    ],
    "name": "AddressEmptyCode",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_DepositFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_GettingETHPriceFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_LiquidateBurnFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_LiquidateEthTransferToCdsFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_WithdrawAMINTTransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_WithdrawBurnFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_WithdrawEthTransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_abondMintFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_amintMintFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "ERC1967InvalidImplementation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ERC1967NonPayable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FailedInnerCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidInitialization",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotInitializing",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UUPSUnauthorizedCallContext",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "slot",
        "type": "bytes32"
      }
    ],
    "name": "UUPSUnsupportedProxiableUUID",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "depositedAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "borrowAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "normalizedAmount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "version",
        "type": "uint64"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "liquidationAmount",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "profits",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "ethAmount",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "availableLiquidationAmount",
        "type": "uint256"
      }
    ],
    "name": "Liquidate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "borrowDebt",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "withdrawAmount",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "noOfAbond",
        "type": "uint128"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "APY",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DOMAIN_SEPARATOR",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PERMIT_TYPEHASH",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "UPGRADE_INTERFACE_VERSION",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "abond",
    "outputs": [
      {
        "internalType": "contract IABONDToken",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "amint",
    "outputs": [
      {
        "internalType": "contract IAMINT",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "calculateCumulativeRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentEthPrice",
        "type": "uint256"
      }
    ],
    "name": "calculateRatio",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cds",
    "outputs": [
      {
        "internalType": "contract CDSInterface",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cdsAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum IOptions.StrikePrice",
        "name": "_strikePercent",
        "type": "uint8"
      },
      {
        "internalType": "uint64",
        "name": "_strikePrice",
        "type": "uint64"
      },
      {
        "internalType": "uint256",
        "name": "_volatility",
        "type": "uint256"
      }
    ],
    "name": "depositTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLTV",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLastEthVaultValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUSDValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_cds",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_abondToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_multiSign",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_priceFeedAddress",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "chainId",
        "type": "uint64"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastCDSPoolValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastCumulativeRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastEthVaultValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "_index",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "currentEthPrice",
        "type": "uint64"
      }
    ],
    "name": "liquidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "multiSign",
    "outputs": [
      {
        "internalType": "contract IMultiSign",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "noOfLiquidations",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "options",
    "outputs": [
      {
        "internalType": "contract IOptions",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "priceFeedAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ratePerSec",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "aBondAmount",
        "type": "uint128"
      }
    ],
    "name": "redeemYields",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_ratePerSec",
        "type": "uint128"
      }
    ],
    "name": "setAPR",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_admin",
        "type": "address"
      }
    ],
    "name": "setAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_bondRatio",
        "type": "uint64"
      }
    ],
    "name": "setBondRatio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_LTV",
        "type": "uint8"
      }
    ],
    "name": "setLTV",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_options",
        "type": "address"
      }
    ],
    "name": "setOptions",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_treasury",
        "type": "address"
      }
    ],
    "name": "setTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_timeLimit",
        "type": "uint64"
      }
    ],
    "name": "setWithdrawTimeLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalNormalizedAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "treasury",
    "outputs": [
      {
        "internalType": "contract ITreasury",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "treasuryAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "updateLastEthVaultValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_toAddress",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "_index",
        "type": "uint64"
      }
    ],
    "name": "withDraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
export const optionsABISepolia = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      }
    ],
    "name": "AddressEmptyCode",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "ERC1967InvalidImplementation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ERC1967NonPayable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FailedInnerCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidInitialization",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotInitializing",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UUPSUnauthorizedCallContext",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "slot",
        "type": "bytes32"
      }
    ],
    "name": "UUPSUnsupportedProxiableUUID",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "version",
        "type": "uint64"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "UPGRADE_INTERFACE_VERSION",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_ethPrice",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "_ethVolatility",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "enum Options.StrikePrice",
        "name": "_strikePrice",
        "type": "uint8"
      }
    ],
    "name": "calculateOptionPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "depositedAmount",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "strikePrice",
        "type": "uint128"
      },
      {
        "internalType": "uint64",
        "name": "ethPrice",
        "type": "uint64"
      }
    ],
    "name": "calculateStrikePriceGains",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_treasuryAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_cdsAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_borrowingAddress",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
export const poolABISepolia = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickLower',
        type: 'int24',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickUpper',
        type: 'int24',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
    ],
    name: 'Burn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickLower',
        type: 'int24',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickUpper',
        type: 'int24',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount0',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount1',
        type: 'uint128',
      },
    ],
    name: 'Collect',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount0',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount1',
        type: 'uint128',
      },
    ],
    name: 'CollectProtocol',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'paid0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'paid1',
        type: 'uint256',
      },
    ],
    name: 'Flash',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint16',
        name: 'observationCardinalityNextOld',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'observationCardinalityNextNew',
        type: 'uint16',
      },
    ],
    name: 'IncreaseObservationCardinalityNext',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint160',
        name: 'sqrtPriceX96',
        type: 'uint160',
      },
      { indexed: false, internalType: 'int24', name: 'tick', type: 'int24' },
    ],
    name: 'Initialize',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickLower',
        type: 'int24',
      },
      {
        indexed: true,
        internalType: 'int24',
        name: 'tickUpper',
        type: 'int24',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'amount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256',
      },
    ],
    name: 'Mint',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'feeProtocol0Old',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'feeProtocol1Old',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'feeProtocol0New',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'feeProtocol1New',
        type: 'uint8',
      },
    ],
    name: 'SetFeeProtocol',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'amount0',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'amount1',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'uint160',
        name: 'sqrtPriceX96',
        type: 'uint160',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'liquidity',
        type: 'uint128',
      },
      { indexed: false, internalType: 'int24', name: 'tick', type: 'int24' },
    ],
    name: 'Swap',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
      { internalType: 'uint128', name: 'amount', type: 'uint128' },
    ],
    name: 'burn',
    outputs: [
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
      { internalType: 'uint128', name: 'amount0Requested', type: 'uint128' },
      { internalType: 'uint128', name: 'amount1Requested', type: 'uint128' },
    ],
    name: 'collect',
    outputs: [
      { internalType: 'uint128', name: 'amount0', type: 'uint128' },
      { internalType: 'uint128', name: 'amount1', type: 'uint128' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint128', name: 'amount0Requested', type: 'uint128' },
      { internalType: 'uint128', name: 'amount1Requested', type: 'uint128' },
    ],
    name: 'collectProtocol',
    outputs: [
      { internalType: 'uint128', name: 'amount0', type: 'uint128' },
      { internalType: 'uint128', name: 'amount1', type: 'uint128' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [{ internalType: 'uint24', name: '', type: 'uint24' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeGrowthGlobal0X128',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeGrowthGlobal1X128',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'flash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: 'observationCardinalityNext',
        type: 'uint16',
      },
    ],
    name: 'increaseObservationCardinalityNext',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidity',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxLiquidityPerTick',
    outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
      { internalType: 'uint128', name: 'amount', type: 'uint128' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'observations',
    outputs: [
      { internalType: 'uint32', name: 'blockTimestamp', type: 'uint32' },
      { internalType: 'int56', name: 'tickCumulative', type: 'int56' },
      {
        internalType: 'uint160',
        name: 'secondsPerLiquidityCumulativeX128',
        type: 'uint160',
      },
      { internalType: 'bool', name: 'initialized', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32[]', name: 'secondsAgos', type: 'uint32[]' },
    ],
    name: 'observe',
    outputs: [
      { internalType: 'int56[]', name: 'tickCumulatives', type: 'int56[]' },
      {
        internalType: 'uint160[]',
        name: 'secondsPerLiquidityCumulativeX128s',
        type: 'uint160[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    name: 'positions',
    outputs: [
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      {
        internalType: 'uint256',
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
      },
      { internalType: 'uint128', name: 'tokensOwed0', type: 'uint128' },
      { internalType: 'uint128', name: 'tokensOwed1', type: 'uint128' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'protocolFees',
    outputs: [
      { internalType: 'uint128', name: 'token0', type: 'uint128' },
      { internalType: 'uint128', name: 'token1', type: 'uint128' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'feeProtocol0', type: 'uint8' },
      { internalType: 'uint8', name: 'feeProtocol1', type: 'uint8' },
    ],
    name: 'setFeeProtocol',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slot0',
    outputs: [
      { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' },
      { internalType: 'int24', name: 'tick', type: 'int24' },
      { internalType: 'uint16', name: 'observationIndex', type: 'uint16' },
      {
        internalType: 'uint16',
        name: 'observationCardinality',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'observationCardinalityNext',
        type: 'uint16',
      },
      { internalType: 'uint8', name: 'feeProtocol', type: 'uint8' },
      { internalType: 'bool', name: 'unlocked', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
    ],
    name: 'snapshotCumulativesInside',
    outputs: [
      { internalType: 'int56', name: 'tickCumulativeInside', type: 'int56' },
      {
        internalType: 'uint160',
        name: 'secondsPerLiquidityInsideX128',
        type: 'uint160',
      },
      { internalType: 'uint32', name: 'secondsInside', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'bool', name: 'zeroForOne', type: 'bool' },
      { internalType: 'int256', name: 'amountSpecified', type: 'int256' },
      { internalType: 'uint160', name: 'sqrtPriceLimitX96', type: 'uint160' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [
      { internalType: 'int256', name: 'amount0', type: 'int256' },
      { internalType: 'int256', name: 'amount1', type: 'int256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int16', name: '', type: 'int16' }],
    name: 'tickBitmap',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tickSpacing',
    outputs: [{ internalType: 'int24', name: '', type: 'int24' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int24', name: '', type: 'int24' }],
    name: 'ticks',
    outputs: [
      { internalType: 'uint128', name: 'liquidityGross', type: 'uint128' },
      { internalType: 'int128', name: 'liquidityNet', type: 'int128' },
      {
        internalType: 'uint256',
        name: 'feeGrowthOutside0X128',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'feeGrowthOutside1X128',
        type: 'uint256',
      },
      { internalType: 'int56', name: 'tickCumulativeOutside', type: 'int56' },
      {
        internalType: 'uint160',
        name: 'secondsPerLiquidityOutsideX128',
        type: 'uint160',
      },
      { internalType: 'uint32', name: 'secondsOutside', type: 'uint32' },
      { internalType: 'bool', name: 'initialized', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token0',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token1',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]

export const borrowABIMumbai = [{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_cds","type":"address"},{"internalType":"address","name":"_protocolToken","type":"address"},{"internalType":"address","name":"_priceFeedAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Borrowing_DepositFailed","type":"error"},{"inputs":[],"name":"Borrowing_GettingETHPriceFailed","type":"error"},{"inputs":[],"name":"Borrowing_LiquidateBurnFailed","type":"error"},{"inputs":[],"name":"Borrowing_LiquidateEthTransferToCdsFailed","type":"error"},{"inputs":[],"name":"Borrowing_MUSDMintFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawBurnFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawEthTransferFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawMUSDTransferFailed","type":"error"},{"inputs":[],"name":"Borrowing_pTokenMintFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"index","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"borrowAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"normalizedAmount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"liquidationIndex","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"cdsProfits","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"ethAmount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"name":"Liquidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"borrowDebt","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"noOfAbond","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"APY","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Trinity","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateCumulativeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cds","outputs":[{"internalType":"contract CDSInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cdsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositToAaveProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositToCompoundProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_ethPrice","type":"uint128"},{"internalType":"uint64","name":"_depositTime","type":"uint64"},{"internalType":"uint64","name":"_strikePrice","type":"uint64"}],"name":"depositTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAPY","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLTV","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUSDValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"initializeTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastCDSPoolValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCumulativeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthVaultValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthprice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTotalCDSPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint64","name":"_index","type":"uint64"},{"internalType":"uint64","name":"currentEthPrice","type":"uint64"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"noOfLiquidations","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"options","outputs":[{"internalType":"contract IOptions","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeedAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolToken","outputs":[{"internalType":"contract IProtocolToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_apy","type":"uint8"}],"name":"setAPY","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_LTV","type":"uint8"}],"name":"setLTV","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_options","type":"address"}],"name":"setOptions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_timeLimit","type":"uint64"}],"name":"setWithdrawTimeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAmintSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDiracSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalNormalizedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateLastEthVaultValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toAddress","type":"address"},{"internalType":"uint64","name":"_index","type":"uint64"},{"internalType":"uint64","name":"_ethPrice","type":"uint64"},{"internalType":"uint64","name":"_withdrawTime","type":"uint64"}],"name":"withDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromAaveProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"}],"name":"withdrawFromCompoundProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTimeLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"}]
export const cdsABIMumbai = [{"inputs":[{"internalType":"address","name":"_trinity","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"address","name":"_usdt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"depositedAmint","type":"uint128"},{"indexed":false,"internalType":"uint64","name":"index","type":"uint64"},{"indexed":false,"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"depositVal","type":"uint128"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"withdrewAmint","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"withdrawETH","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Trinity_token","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amintLimit","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowing","outputs":[{"internalType":"contract IBorrowing","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"fees","type":"uint128"}],"name":"calculateCumulativeRate","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cdsCount","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cdsDetails","outputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"bool","name":"hasDeposited","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"usdtAmount","type":"uint128"},{"internalType":"uint128","name":"amintAmount","type":"uint128"},{"internalType":"bool","name":"_liquidate","type":"bool"},{"internalType":"uint128","name":"_liquidationAmount","type":"uint128"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ethVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fallbackEthPrice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"}],"name":"getCDSDepositDetails","outputs":[{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"withdrawedTime","type":"uint64"},{"internalType":"uint128","name":"withdrawedAmount","type":"uint128"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"depositPrice","type":"uint128"},{"internalType":"uint128","name":"depositValue","type":"uint128"},{"internalType":"bool","name":"optedLiquidation","type":"bool"},{"internalType":"uint128","name":"InitialLiquidationAmount","type":"uint128"},{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"liquidationindex","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"}],"internalType":"struct CDSTest.CdsAccountDetails","name":"","type":"tuple"},{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCumulativeRate","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthPrice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"liquidationIndex","type":"uint128"}],"name":"liquidationIndexToInfo","outputs":[{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"profits","type":"uint128"},{"internalType":"uint128","name":"ethAmount","type":"uint128"},{"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"_amintAmount","type":"uint128"},{"internalType":"uint64","name":"amintPrice","type":"uint64"},{"internalType":"uint64","name":"usdtPrice","type":"uint64"}],"name":"redeemUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"percent","type":"uint8"}],"name":"setAmintLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setBorrowingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"amount","type":"uint64"}],"name":"setUsdtLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_timeLimit","type":"uint64"}],"name":"setWithdrawTimeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAvailableLiquidationAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCdsDepositedAmount","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"index","type":"uint128"},{"components":[{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"profits","type":"uint128"},{"internalType":"uint128","name":"ethAmount","type":"uint128"},{"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"internalType":"struct CDSTest.LiquidationInfo","name":"liquidationData","type":"tuple"}],"name":"updateLiquidationInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateTotalAvailableLiquidationAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_amount","type":"uint128"}],"name":"updateTotalCdsDepositedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdt","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtAmountDepositedTillNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"_index","type":"uint64"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTimeLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
export const treasuryABIMumbai = [{"inputs":[{"internalType":"address","name":"_borrowing","type":"address"},{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_cdsContract","type":"address"},{"internalType":"address","name":"_wethGateway","type":"address"},{"internalType":"address","name":"_cEther","type":"address"},{"internalType":"address","name":"_aavePoolAddressProvider","type":"address"},{"internalType":"address","name":"_aToken","type":"address"},{"internalType":"address","name":"_usdt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Treasury_AaveDepositAndMintFailed","type":"error"},{"inputs":[],"name":"Treasury_AavePoolAddressZero","type":"error"},{"inputs":[],"name":"Treasury_AaveWithdrawFailed","type":"error"},{"inputs":[],"name":"Treasury_CompoundDepositAndMintFailed","type":"error"},{"inputs":[],"name":"Treasury_CompoundWithdrawFailed","type":"error"},{"inputs":[],"name":"Treasury_EthTransferToCdsLiquidatorFailed","type":"error"},{"inputs":[],"name":"Treasury_ZeroDeposit","type":"error"},{"inputs":[],"name":"Treasury_ZeroWithdraw","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositToAave","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositToCompound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromAave","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromCompound","type":"event"},{"inputs":[],"name":"aToken","outputs":[{"internalType":"contract IATOKEN","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aavePoolAddressProvider","outputs":[{"internalType":"contract IPoolAddressesProvider","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aaveWETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approveAmint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approveUsdt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"borrow","outputs":[{"internalType":"contract IBorrowing","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"borrowing","outputs":[{"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"internalType":"uint256","name":"totalBorrowedAmount","type":"uint256"},{"internalType":"bool","name":"hasBorrowed","type":"bool"},{"internalType":"bool","name":"hasDeposited","type":"bool"},{"internalType":"uint64","name":"borrowerIndex","type":"uint64"},{"internalType":"uint128","name":"totalPTokens","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cEther","outputs":[{"internalType":"contract ICEther","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cdsContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compoundAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint128","name":"_ethPrice","type":"uint128"},{"internalType":"uint64","name":"_depositTime","type":"uint64"}],"name":"deposit","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"depositToAave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositToCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalanceInTreasury","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"}],"name":"getBorrowing","outputs":[{"internalType":"uint64","name":"","type":"uint64"},{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"downsidePercentage","type":"uint64"},{"internalType":"uint128","name":"ethPriceAtDeposit","type":"uint128"},{"internalType":"uint128","name":"borrowedAmount","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"internalType":"uint8","name":"withdrawNo","type":"uint8"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"internalType":"bool","name":"liquidated","type":"bool"},{"internalType":"uint64","name":"ethPriceAtWithdraw","type":"uint64"},{"internalType":"uint64","name":"withdrawTime","type":"uint64"},{"internalType":"uint128","name":"pTokensAmount","type":"uint128"},{"internalType":"uint64","name":"strikePrice","type":"uint64"}],"internalType":"struct Treasury.DepositDetails","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"noOfBorrowers","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum Treasury.Protocol","name":"","type":"uint8"}],"name":"protocolDeposit","outputs":[{"internalType":"uint64","name":"depositIndex","type":"uint64"},{"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"internalType":"uint256","name":"totalCreditedTokens","type":"uint256"},{"internalType":"uint256","name":"depositedUsdValue","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setBorrowingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalInterest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInterestFromLiquidation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVolumeOfBorrowersAmountinUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVolumeOfBorrowersAmountinWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"transferEthToCdsLiquidators","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"trinity","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"},{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"downsidePercentage","type":"uint64"},{"internalType":"uint128","name":"ethPriceAtDeposit","type":"uint128"},{"internalType":"uint128","name":"borrowedAmount","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"internalType":"uint8","name":"withdrawNo","type":"uint8"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"internalType":"bool","name":"liquidated","type":"bool"},{"internalType":"uint64","name":"ethPriceAtWithdraw","type":"uint64"},{"internalType":"uint64","name":"withdrawTime","type":"uint64"},{"internalType":"uint128","name":"pTokensAmount","type":"uint128"},{"internalType":"uint64","name":"strikePrice","type":"uint64"}],"internalType":"struct Treasury.DepositDetails","name":"depositDetail","type":"tuple"}],"name":"updateDepositDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"updateHasBorrowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateTotalBorrowedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalDepositedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateTotalInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateTotalInterestFromLiquidation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalPTokensDecrease","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalPTokensIncrease","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdt","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wethGateway","outputs":[{"internalType":"contract IWrappedTokenGatewayV3","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint64","name":"_ethPrice","type":"uint64"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromAave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"}],"name":"withdrawFromCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
export const optionsABIMumbai = [{"inputs":[{"internalType":"uint8","name":"percent","type":"uint8"}],"name":"depositOption","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint128","name":"strikePrice","type":"uint128"},{"internalType":"uint64","name":"ethPrice","type":"uint64"}],"name":"withdrawOption","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"pure","type":"function"}]
