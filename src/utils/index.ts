
export const borrowAddressSepolia = '0x1F6E1A9139399c98fd42a0Ee80844a5F75C15EBb';
export const cdsAddressSepolia = '';
export const treasuryAddressSepolia = '';
export const optionsAddressSepolia = '0xAC31e267FC123De9A61F3722a7d09c0c16b1f799';
export const poolAddressSepolia = '0x09732eef05D41773c3fFF7385E30D35605111f8F';

export const borrowAddressBaseSepolia = '0xbA78a0a4897a6E77d8Eec2f0285767124bC8Dc54';
export const cdsAddressBaseSepolia = '';
export const treasuryAddressBaseSepolia = '';
export const optionsAddressBaseSepolia = '0xFDF1C29DAf724Be45Dae1Cd3ABACc595f6ec01E8';

export const eidSepolia = 40161;
export const eidBaseSepolia = 40245;

export const borrowABI = [
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
export const cdsABI = []
export const treasuryABI = []
export const optionsABI = [
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
export const poolABI = [
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