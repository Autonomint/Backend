export const borrowAddressSepolia = '0x9E86696B805B739ba42a2Ef91ae4d75380B681aA';
export const cdsAddressSepolia = '0xE01ddEEe242c63f5c3f75fEe871d235FC3D32c3F';
export const treasuryAddressSepolia = '0xd7A5b9386554BC146fBcbdeEA2a5DaF7819676F6';
export const optionsAddressSepolia = '0xc28aED6c4b9C05B457fa2367799B803B02785972';
export const poolAddressSepolia = '0x09732eef05D41773c3fFF7385E30D35605111f8F';

export const borrowAddressBaseSepolia = '0x6502432f446402B8F225E639B95d4d03317A26E4';
export const cdsAddressBaseSepolia = '0x9Eb1FC4bDf917e75D455d70f38d6689b10ec6919';
export const treasuryAddressBaseSepolia = '0x13a7b78e65c7E389cc56Fc66a0342F90730120A8';
export const optionsAddressBaseSepolia = '0x6b6f84c22504c8E1E83d4c55C393Baf57E34D416';

export const usdaAddressModeSepolia = '0xac29627E717185B4bA755eb89247cDDd360d5c5B';

export const eidSepolia = 40161;
export const eidBaseSepolia = 40245;

export const borrowABI= [
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
    "name": "Borrowing_WithdrawUSDaTransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_abondMintFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Borrowing_usdaMintFailed",
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
    "inputs": [
      {
        "internalType": "uint16",
        "name": "optionType",
        "type": "uint16"
      }
    ],
    "name": "InvalidOptionType",
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
    "inputs": [
      {
        "internalType": "uint8",
        "name": "bits",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SafeCastOverflowedUintDowncast",
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
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
        "name": "normalizedAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "depositedTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "ethPrice",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "borrowAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "strikePrice",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "optionsFees",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum IOptions.StrikePrice",
        "name": "strikePricePercent",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "APR",
        "type": "uint8"
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "withdrawTime",
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
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "borrowDebt",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
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
    "inputs": [],
    "name": "admin",
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
      },
      {
        "internalType": "uint256",
        "name": "_depositingAmount",
        "type": "uint256"
      }
    ],
    "name": "depositTokens",
    "outputs": [],
    "stateMutability": "payable",
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
    "name": "getAbondYields",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
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
      },
      {
        "internalType": "address",
        "name": "_globalVariables",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      }
    ],
    "name": "liquidate",
    "outputs": [],
    "stateMutability": "payable",
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
        "internalType": "uint8",
        "name": "_APR",
        "type": "uint8"
      },
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
        "internalType": "address",
        "name": "_borrowLiquidation",
        "type": "address"
      }
    ],
    "name": "setBorrowLiquidation",
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
        "internalType": "uint32",
        "name": "usdaPrice",
        "type": "uint32"
      }
    ],
    "name": "updateRatePerSecByUSDaPrice",
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
    "name": "usda",
    "outputs": [
      {
        "internalType": "contract IUSDa",
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
    "stateMutability": "payable",
    "type": "function"
  }
]

export const cdsABI = [
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
    "inputs": [
      {
        "internalType": "uint16",
        "name": "optionType",
        "type": "uint16"
      }
    ],
    "name": "InvalidOptionType",
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
    "inputs": [
      {
        "internalType": "uint8",
        "name": "bits",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SafeCastOverflowedUintDowncast",
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "depositedUSDa",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "depositedUSDT",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "depositedTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "ethPriceAtDeposit",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "lockingPeriod",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "liquidationAmount",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "optedForLiquidation",
        "type": "bool"
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "withdrawUSDa",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "withdrawTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "withdrawETH",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "ethPriceAtWithdraw",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "optionsFees",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "optionsFeesWithdrawn",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
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
    "inputs": [],
    "name": "admin",
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
        "internalType": "uint128",
        "name": "fees",
        "type": "uint128"
      }
    ],
    "name": "calculateCumulativeRate",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cdsCount",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "cdsDetails",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "hasDeposited",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "usdtAmount",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "usdaAmount",
        "type": "uint128"
      },
      {
        "internalType": "bool",
        "name": "_liquidate",
        "type": "bool"
      },
      {
        "internalType": "uint128",
        "name": "_liquidationAmount",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "lockingPeriod",
        "type": "uint128"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      }
    ],
    "name": "getCDSDepositDetails",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "depositedTime",
            "type": "uint64"
          },
          {
            "internalType": "uint256",
            "name": "depositedAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint64",
            "name": "withdrawedTime",
            "type": "uint64"
          },
          {
            "internalType": "uint256",
            "name": "withdrawedAmount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "withdrawed",
            "type": "bool"
          },
          {
            "internalType": "uint128",
            "name": "depositPrice",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "depositValue",
            "type": "uint128"
          },
          {
            "internalType": "bool",
            "name": "depositValueSign",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "optedLiquidation",
            "type": "bool"
          },
          {
            "internalType": "uint128",
            "name": "InitialLiquidationAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "liquidationAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "liquidationindex",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "normalizedAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint128",
            "name": "lockingPeriod",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "depositedUSDa",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "depositedUSDT",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "withdrawETHAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "ethPriceAtWithdraw",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "optionFees",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "optionFeesWithdrawn",
            "type": "uint256"
          }
        ],
        "internalType": "struct CDSInterface.CdsAccountDetails",
        "name": "",
        "type": "tuple"
      },
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_usda",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "priceFeed",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_usdt",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_multiSign",
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
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_usdaAmount",
        "type": "uint128"
      },
      {
        "internalType": "uint64",
        "name": "usdaPrice",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "usdtPrice",
        "type": "uint64"
      }
    ],
    "name": "redeemUSDT",
    "outputs": [],
    "stateMutability": "payable",
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
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setBorrowLiquidation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setBorrowingContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setGlobalVariables",
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
        "internalType": "uint8",
        "name": "percent",
        "type": "uint8"
      }
    ],
    "name": "setUSDaLimit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "amount",
        "type": "uint64"
      }
    ],
    "name": "setUsdtLimit",
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
    "name": "totalAvailableLiquidationAmount",
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
    "name": "totalCdsDepositedAmount",
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
    "inputs": [
      {
        "internalType": "uint128",
        "name": "index",
        "type": "uint128"
      },
      {
        "components": [
          {
            "internalType": "uint128",
            "name": "liquidationAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "profits",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "ethAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint256",
            "name": "availableLiquidationAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct CDSInterface.LiquidationInfo",
        "name": "liquidationData",
        "type": "tuple"
      }
    ],
    "name": "updateLiquidationInfo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "updateTotalAvailableLiquidationAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_amount",
        "type": "uint128"
      }
    ],
    "name": "updateTotalCdsDepositedAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_amount",
        "type": "uint128"
      }
    ],
    "name": "updateTotalCdsDepositedAmountWithOptionFees",
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
    "name": "usda",
    "outputs": [
      {
        "internalType": "contract IUSDa",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "usdaLimit",
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
    "name": "usdtAmountDepositedTillNow",
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
    "name": "usdtLimit",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_index",
        "type": "uint64"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

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
      },
      {
        "internalType": "address",
        "name": "_globalVariables",
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

export const treasuryABI = [
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
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_AaveDepositAndMintFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_AavePoolAddressZero",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_AaveWithdrawFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_CompoundDepositAndMintFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_CompoundWithdrawFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_EthTransferToCdsLiquidatorFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_WithdrawExternalProtocolInterestFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_ZeroDeposit",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Treasury_ZeroWithdraw",
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
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
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
        "name": "count",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DepositToAave",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "count",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DepositToCompound",
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
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "count",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawFromAave",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "count",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawFromCompound",
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
    "inputs": [],
    "name": "abondUSDaPool",
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
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "approveUSDa",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "approveUsdt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      }
    ],
    "name": "borrowing",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "depositedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalBorrowedAmount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "hasBorrowed",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "hasDeposited",
        "type": "bool"
      },
      {
        "internalType": "uint64",
        "name": "borrowerIndex",
        "type": "uint64"
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
    "name": "calculateYieldsForExternalProtocol",
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
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "_ethPrice",
        "type": "uint128"
      },
      {
        "internalType": "uint64",
        "name": "_depositTime",
        "type": "uint64"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "hasDeposited",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "borrowerIndex",
            "type": "uint64"
          }
        ],
        "internalType": "struct ITreasury.DepositResult",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalanceInTreasury",
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
        "name": "depositor",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      }
    ],
    "name": "getBorrowing",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "totalIndex",
            "type": "uint64"
          },
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "depositedTime",
                "type": "uint64"
              },
              {
                "internalType": "uint128",
                "name": "depositedAmount",
                "type": "uint128"
              },
              {
                "internalType": "uint128",
                "name": "depositedAmountUsdValue",
                "type": "uint128"
              },
              {
                "internalType": "uint64",
                "name": "downsidePercentage",
                "type": "uint64"
              },
              {
                "internalType": "uint128",
                "name": "ethPriceAtDeposit",
                "type": "uint128"
              },
              {
                "internalType": "uint128",
                "name": "borrowedAmount",
                "type": "uint128"
              },
              {
                "internalType": "uint128",
                "name": "normalizedAmount",
                "type": "uint128"
              },
              {
                "internalType": "bool",
                "name": "withdrawed",
                "type": "bool"
              },
              {
                "internalType": "uint128",
                "name": "withdrawAmount",
                "type": "uint128"
              },
              {
                "internalType": "bool",
                "name": "liquidated",
                "type": "bool"
              },
              {
                "internalType": "uint64",
                "name": "ethPriceAtWithdraw",
                "type": "uint64"
              },
              {
                "internalType": "uint64",
                "name": "withdrawTime",
                "type": "uint64"
              },
              {
                "internalType": "uint128",
                "name": "aBondTokensAmount",
                "type": "uint128"
              },
              {
                "internalType": "uint128",
                "name": "strikePrice",
                "type": "uint128"
              },
              {
                "internalType": "uint128",
                "name": "optionFees",
                "type": "uint128"
              },
              {
                "internalType": "uint8",
                "name": "APR",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "totalDebtAmountPaid",
                "type": "uint256"
              }
            ],
            "internalType": "struct ITreasury.DepositDetails",
            "name": "depositDetails",
            "type": "tuple"
          }
        ],
        "internalType": "struct ITreasury.GetBorrowingResult",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "maximum",
        "type": "bool"
      }
    ],
    "name": "getExternalProtocolCumulativeRate",
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
        "name": "_borrowing",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_abondAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_cdsContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_borrowLiquidation",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_usdt",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_globalVariables",
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
    "name": "noOfBorrowers",
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
        "name": "_wethGateway",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_comet",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_aavePoolAddressProvider",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_aToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_weth",
        "type": "address"
      }
    ],
    "name": "setExternalProtocolAddresses",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalVolumeOfBorrowersAmountinUSD",
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
    "name": "totalVolumeOfBorrowersAmountinWei",
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
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      }
    ],
    "name": "transferEthToCdsLiquidators",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "usdaAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
      }
    ],
    "name": "transferFundsToGlobal",
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
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "operation",
        "type": "bool"
      }
    ],
    "name": "updateAbondUSDaPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      },
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "depositedTime",
            "type": "uint64"
          },
          {
            "internalType": "uint128",
            "name": "depositedAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "depositedAmountUsdValue",
            "type": "uint128"
          },
          {
            "internalType": "uint64",
            "name": "downsidePercentage",
            "type": "uint64"
          },
          {
            "internalType": "uint128",
            "name": "ethPriceAtDeposit",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "borrowedAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "normalizedAmount",
            "type": "uint128"
          },
          {
            "internalType": "bool",
            "name": "withdrawed",
            "type": "bool"
          },
          {
            "internalType": "uint128",
            "name": "withdrawAmount",
            "type": "uint128"
          },
          {
            "internalType": "bool",
            "name": "liquidated",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "ethPriceAtWithdraw",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "withdrawTime",
            "type": "uint64"
          },
          {
            "internalType": "uint128",
            "name": "aBondTokensAmount",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "strikePrice",
            "type": "uint128"
          },
          {
            "internalType": "uint128",
            "name": "optionFees",
            "type": "uint128"
          },
          {
            "internalType": "uint8",
            "name": "APR",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "totalDebtAmountPaid",
            "type": "uint256"
          }
        ],
        "internalType": "struct ITreasury.DepositDetails",
        "name": "depositDetail",
        "type": "tuple"
      }
    ],
    "name": "updateDepositDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_bool",
        "type": "bool"
      }
    ],
    "name": "updateHasBorrowed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "updateInterestFromExternalProtocol",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "updateLiquidatedETHCollectedFromCdsWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "updateTotalBorrowedAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      }
    ],
    "name": "updateTotalDepositedAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "updateTotalInterest",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "updateTotalInterestFromLiquidation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "operation",
        "type": "bool"
      }
    ],
    "name": "updateUSDaGainedFromLiquidation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "updateUsdaCollectedFromCdsWithdraw",
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
    "name": "usda",
    "outputs": [
      {
        "internalType": "contract IUSDa",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "usdaGainedFromLiquidation",
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
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "index",
        "type": "uint64"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      },
      {
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      }
    ],
    "name": "withdrawExternalProtocolInterest",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "withdrawFromExternalProtocol",
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
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawInterest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]

export const usdaABI = [
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
        "name": "account",
        "type": "address"
      }
    ],
    "name": "AddressInsufficientBalance",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EndPointUnavailable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EnforcedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ExpectedPause",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FailedInnerCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidDelegate",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidEndpointCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidInitialization",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidLocalDecimals",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "options",
        "type": "bytes"
      }
    ],
    "name": "InvalidOptions",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LzTokenUnavailable",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "eid",
        "type": "uint32"
      }
    ],
    "name": "NoPeer",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msgValue",
        "type": "uint256"
      }
    ],
    "name": "NotEnoughNative",
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
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "OnlyEndpoint",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "eid",
        "type": "uint32"
      },
      {
        "internalType": "bytes32",
        "name": "sender",
        "type": "bytes32"
      }
    ],
    "name": "OnlyPeer",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OnlySelf",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "result",
        "type": "bytes"
      }
    ],
    "name": "SimulationResult",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountLD",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minAmountLD",
        "type": "uint256"
      }
    ],
    "name": "SlippageExceeded",
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
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "eid",
            "type": "uint32"
          },
          {
            "internalType": "uint16",
            "name": "msgType",
            "type": "uint16"
          },
          {
            "internalType": "bytes",
            "name": "options",
            "type": "bytes"
          }
        ],
        "indexed": false,
        "internalType": "struct EnforcedOptionParam[]",
        "name": "_enforcedOptions",
        "type": "tuple[]"
      }
    ],
    "name": "EnforcedOptionSet",
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
        "internalType": "address",
        "name": "inspector",
        "type": "address"
      }
    ],
    "name": "MsgInspectorSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "srcEid",
        "type": "uint32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountReceivedLD",
        "type": "uint256"
      }
    ],
    "name": "OFTReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "guid",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "dstEid",
        "type": "uint32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountSentLD",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amountReceivedLD",
        "type": "uint256"
      }
    ],
    "name": "OFTSent",
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
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "eid",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "peer",
        "type": "bytes32"
      }
    ],
    "name": "PeerSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "preCrimeAddress",
        "type": "address"
      }
    ],
    "name": "PreCrimeSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
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
    "name": "SEND",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SEND_AND_CALL",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
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
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "srcEid",
            "type": "uint32"
          },
          {
            "internalType": "bytes32",
            "name": "sender",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "nonce",
            "type": "uint64"
          }
        ],
        "internalType": "struct Origin",
        "name": "origin",
        "type": "tuple"
      }
    ],
    "name": "allowInitializePath",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
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
    "name": "approvalRequired",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "burnFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burnFromUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_eid",
        "type": "uint32"
      },
      {
        "internalType": "uint16",
        "name": "_msgType",
        "type": "uint16"
      },
      {
        "internalType": "bytes",
        "name": "_extraOptions",
        "type": "bytes"
      }
    ],
    "name": "combineOptions",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimalConversionRate",
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
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endpoint",
    "outputs": [
      {
        "internalType": "contract ILayerZeroEndpointV2",
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
        "internalType": "uint32",
        "name": "eid",
        "type": "uint32"
      },
      {
        "internalType": "uint16",
        "name": "msgType",
        "type": "uint16"
      }
    ],
    "name": "enforcedOptions",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "enforcedOption",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_lzEndpoint",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_delegate",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "srcEid",
            "type": "uint32"
          },
          {
            "internalType": "bytes32",
            "name": "sender",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "nonce",
            "type": "uint64"
          }
        ],
        "internalType": "struct Origin",
        "name": "",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "isComposeMsgSender",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_eid",
        "type": "uint32"
      },
      {
        "internalType": "bytes32",
        "name": "_peer",
        "type": "bytes32"
      }
    ],
    "name": "isPeer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "srcEid",
            "type": "uint32"
          },
          {
            "internalType": "bytes32",
            "name": "sender",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "nonce",
            "type": "uint64"
          }
        ],
        "internalType": "struct Origin",
        "name": "_origin",
        "type": "tuple"
      },
      {
        "internalType": "bytes32",
        "name": "_guid",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "_message",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "_executor",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_extraData",
        "type": "bytes"
      }
    ],
    "name": "lzReceive",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint32",
                "name": "srcEid",
                "type": "uint32"
              },
              {
                "internalType": "bytes32",
                "name": "sender",
                "type": "bytes32"
              },
              {
                "internalType": "uint64",
                "name": "nonce",
                "type": "uint64"
              }
            ],
            "internalType": "struct Origin",
            "name": "origin",
            "type": "tuple"
          },
          {
            "internalType": "uint32",
            "name": "dstEid",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "guid",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "executor",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "message",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "extraData",
            "type": "bytes"
          }
        ],
        "internalType": "struct InboundPacket[]",
        "name": "_packets",
        "type": "tuple[]"
      }
    ],
    "name": "lzReceiveAndRevert",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "srcEid",
            "type": "uint32"
          },
          {
            "internalType": "bytes32",
            "name": "sender",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "nonce",
            "type": "uint64"
          }
        ],
        "internalType": "struct Origin",
        "name": "_origin",
        "type": "tuple"
      },
      {
        "internalType": "bytes32",
        "name": "_guid",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "_message",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "_executor",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "_extraData",
        "type": "bytes"
      }
    ],
    "name": "lzReceiveSimulate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "msgInspector",
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
    "inputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "nextNonce",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "nonce",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "oApp",
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
    "name": "oAppVersion",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "senderVersion",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "receiverVersion",
        "type": "uint64"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "oftVersion",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      },
      {
        "internalType": "uint64",
        "name": "version",
        "type": "uint64"
      }
    ],
    "stateMutability": "pure",
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
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "eid",
        "type": "uint32"
      }
    ],
    "name": "peers",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "peer",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "preCrime",
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
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "dstEid",
            "type": "uint32"
          },
          {
            "internalType": "bytes32",
            "name": "to",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "amountLD",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minAmountLD",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "extraOptions",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "composeMsg",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "oftCmd",
            "type": "bytes"
          }
        ],
        "internalType": "struct SendParam",
        "name": "_sendParam",
        "type": "tuple"
      }
    ],
    "name": "quoteOFT",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "minAmountLD",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxAmountLD",
            "type": "uint256"
          }
        ],
        "internalType": "struct OFTLimit",
        "name": "oftLimit",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "int256",
            "name": "feeAmountLD",
            "type": "int256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          }
        ],
        "internalType": "struct OFTFeeDetail[]",
        "name": "oftFeeDetails",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "amountSentLD",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountReceivedLD",
            "type": "uint256"
          }
        ],
        "internalType": "struct OFTReceipt",
        "name": "oftReceipt",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "dstEid",
            "type": "uint32"
          },
          {
            "internalType": "bytes32",
            "name": "to",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "amountLD",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minAmountLD",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "extraOptions",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "composeMsg",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "oftCmd",
            "type": "bytes"
          }
        ],
        "internalType": "struct SendParam",
        "name": "_sendParam",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "_payInLzToken",
        "type": "bool"
      }
    ],
    "name": "quoteSend",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "nativeFee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lzTokenFee",
            "type": "uint256"
          }
        ],
        "internalType": "struct MessagingFee",
        "name": "msgFee",
        "type": "tuple"
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
        "components": [
          {
            "internalType": "uint32",
            "name": "dstEid",
            "type": "uint32"
          },
          {
            "internalType": "bytes32",
            "name": "to",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "amountLD",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minAmountLD",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "extraOptions",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "composeMsg",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "oftCmd",
            "type": "bytes"
          }
        ],
        "internalType": "struct SendParam",
        "name": "_sendParam",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "nativeFee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lzTokenFee",
            "type": "uint256"
          }
        ],
        "internalType": "struct MessagingFee",
        "name": "_fee",
        "type": "tuple"
      },
      {
        "internalType": "address",
        "name": "_refundAddress",
        "type": "address"
      }
    ],
    "name": "send",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "guid",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "nonce",
            "type": "uint64"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "nativeFee",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "lzTokenFee",
                "type": "uint256"
              }
            ],
            "internalType": "struct MessagingFee",
            "name": "fee",
            "type": "tuple"
          }
        ],
        "internalType": "struct MessagingReceipt",
        "name": "msgReceipt",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "amountSentLD",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountReceivedLD",
            "type": "uint256"
          }
        ],
        "internalType": "struct OFTReceipt",
        "name": "oftReceipt",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setBorrowingContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setCdsContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_delegate",
        "type": "address"
      }
    ],
    "name": "setDelegate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_eid",
        "type": "uint32"
      }
    ],
    "name": "setDstEid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "eid",
            "type": "uint32"
          },
          {
            "internalType": "uint16",
            "name": "msgType",
            "type": "uint16"
          },
          {
            "internalType": "bytes",
            "name": "options",
            "type": "bytes"
          }
        ],
        "internalType": "struct EnforcedOptionParam[]",
        "name": "_enforcedOptions",
        "type": "tuple[]"
      }
    ],
    "name": "setEnforcedOptions",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_msgInspector",
        "type": "address"
      }
    ],
    "name": "setMsgInspector",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_eid",
        "type": "uint32"
      },
      {
        "internalType": "bytes32",
        "name": "_peer",
        "type": "bytes32"
      }
    ],
    "name": "setPeer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_preCrime",
        "type": "address"
      }
    ],
    "name": "setPreCrime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sharedDecimals",
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
    "name": "symbol",
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
    "name": "token",
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
    "name": "totalSupply",
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
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
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
    "inputs": [],
    "name": "unpause",
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
