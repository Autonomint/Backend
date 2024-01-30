
export const amintAddressSepolia =  '0x1347ED038461D00Df065B6F491b838999e84f6Cc'
export const abondAddressSepolia = '0xB65E9bb1D7cF59f73c102400c55A0CDbB6A562Cc'
export const cdsAddressSepolia = '0x5CF2316F8a1d10B29B6a294Ef5445FAB0fd052A2'
export const borrowAddressSepolia = '0x2745155BB6d1f83f9477c0EA01a4b09e05571033'
export const treasuryAddressSepolia = '0x2d02bEE765f2A32ceE7eE5402533c469060d9190'
export const optionsAddressSepolia = '0xc2c72d998Fa5f2AD2db36cEE257303b2882deF6B'

export const amintAddressMumbai =  '0xE3CE24bD6F3189E4E45A7E2A20E00310919F3715'
export const abondAddressMumbai = '0x2308D4244C3935DDCF07Cf2D76e80D420D88F254'
export const usdtMumbai = '0x0C9bdA04F2eBe69A4efcbAb7093FA5c789548FE6'
export const cdsAddressMumbai = '0x85378CEc5e295DA101dC0417A02b3448ed7246aE'
export const borrowAddressMumbai = '0xbA78a0a4897a6E77d8Eec2f0285767124bC8Dc54'
export const treasuryAddressMumbai = '0x77030Bb9992769B85Afa971983896acA5c4b1f58'
export const optionsAddressMumbai = '0xFDF1C29DAf724Be45Dae1Cd3ABACc595f6ec01E8'

export const amintAddressGoerli =  '0x80075336b11D4B6D86eD2ED901d646E13C715e0c'
export const abondAddressGoerli = '0x5161c2fFaA97D8eB708783bf4bdbf83734eFf6cD'
export const usdtGoerli = '0x9F3902148dD24f5c9bCEBC5a43a60649D4f4819D'
export const cdsAddressGoerli = '0xBCbFCeB1c09585331f493352862274A6bf67dc03'
export const borrowAddressGoerli = '0xD2Eb6c9A074877cf47377c981908a89E34d9b5d0'
export const treasuryAddressGoerli = '0x426d3C3E24B20b67Be099cd59e90F58a313B797c'
export const optionsAddressGoerli = '0x78C5126FC863870Cea7C7c14B75A90Ba5845F680'
export const multiSignAddressGoerli = '0x3F0a2Fc2324B59278770998ccCb4Ac56993198f8'

export const borrowABISepolia = [{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_cds","type":"address"},{"internalType":"address","name":"_protocolToken","type":"address"},{"internalType":"address","name":"_priceFeedAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Borrowing_DepositFailed","type":"error"},{"inputs":[],"name":"Borrowing_GettingETHPriceFailed","type":"error"},{"inputs":[],"name":"Borrowing_LiquidateBurnFailed","type":"error"},{"inputs":[],"name":"Borrowing_LiquidateEthTransferToCdsFailed","type":"error"},{"inputs":[],"name":"Borrowing_MUSDMintFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawBurnFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawEthTransferFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawMUSDTransferFailed","type":"error"},{"inputs":[],"name":"Borrowing_pTokenMintFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"index","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"borrowAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"normalizedAmount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"liquidationIndex","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"cdsProfits","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"ethAmount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"name":"Liquidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"borrowDebt","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"noOfAbond","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"APY","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Trinity","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateCumulativeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cds","outputs":[{"internalType":"contract CDSInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cdsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositToAaveProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositToCompoundProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_ethPrice","type":"uint128"},{"internalType":"uint64","name":"_depositTime","type":"uint64"},{"internalType":"uint64","name":"_strikePrice","type":"uint64"}],"name":"depositTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAPY","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLTV","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUSDValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"initializeTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastCDSPoolValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCumulativeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthVaultValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthprice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTotalCDSPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint64","name":"_index","type":"uint64"},{"internalType":"uint64","name":"currentEthPrice","type":"uint64"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"noOfLiquidations","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"options","outputs":[{"internalType":"contract IOptions","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeedAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolToken","outputs":[{"internalType":"contract IProtocolToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_apy","type":"uint8"}],"name":"setAPY","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_LTV","type":"uint8"}],"name":"setLTV","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_options","type":"address"}],"name":"setOptions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_timeLimit","type":"uint64"}],"name":"setWithdrawTimeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAmintSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDiracSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalNormalizedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateLastEthVaultValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toAddress","type":"address"},{"internalType":"uint64","name":"_index","type":"uint64"},{"internalType":"uint64","name":"_ethPrice","type":"uint64"},{"internalType":"uint64","name":"_withdrawTime","type":"uint64"}],"name":"withDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromAaveProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"}],"name":"withdrawFromCompoundProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTimeLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"}]
export const cdsABISepolia = [{"inputs":[{"internalType":"address","name":"_trinity","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"address","name":"_usdt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"depositedAmint","type":"uint128"},{"indexed":false,"internalType":"uint64","name":"index","type":"uint64"},{"indexed":false,"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"depositVal","type":"uint128"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"withdrewAmint","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"withdrawETH","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Trinity_token","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amintLimit","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowing","outputs":[{"internalType":"contract IBorrowing","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"fees","type":"uint128"}],"name":"calculateCumulativeRate","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cdsCount","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cdsDetails","outputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"bool","name":"hasDeposited","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"usdtAmount","type":"uint128"},{"internalType":"uint128","name":"amintAmount","type":"uint128"},{"internalType":"bool","name":"_liquidate","type":"bool"},{"internalType":"uint128","name":"_liquidationAmount","type":"uint128"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ethVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fallbackEthPrice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"}],"name":"getCDSDepositDetails","outputs":[{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"withdrawedTime","type":"uint64"},{"internalType":"uint128","name":"withdrawedAmount","type":"uint128"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"depositPrice","type":"uint128"},{"internalType":"uint128","name":"depositValue","type":"uint128"},{"internalType":"bool","name":"optedLiquidation","type":"bool"},{"internalType":"uint128","name":"InitialLiquidationAmount","type":"uint128"},{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"liquidationindex","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"}],"internalType":"struct CDSTest.CdsAccountDetails","name":"","type":"tuple"},{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCumulativeRate","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthPrice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"liquidationIndex","type":"uint128"}],"name":"liquidationIndexToInfo","outputs":[{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"profits","type":"uint128"},{"internalType":"uint128","name":"ethAmount","type":"uint128"},{"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"_amintAmount","type":"uint128"},{"internalType":"uint64","name":"amintPrice","type":"uint64"},{"internalType":"uint64","name":"usdtPrice","type":"uint64"}],"name":"redeemUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"percent","type":"uint8"}],"name":"setAmintLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setBorrowingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"amount","type":"uint64"}],"name":"setUsdtLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_timeLimit","type":"uint64"}],"name":"setWithdrawTimeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAvailableLiquidationAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCdsDepositedAmount","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"index","type":"uint128"},{"components":[{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"profits","type":"uint128"},{"internalType":"uint128","name":"ethAmount","type":"uint128"},{"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"internalType":"struct CDSTest.LiquidationInfo","name":"liquidationData","type":"tuple"}],"name":"updateLiquidationInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateTotalAvailableLiquidationAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_amount","type":"uint128"}],"name":"updateTotalCdsDepositedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdt","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtAmountDepositedTillNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"_index","type":"uint64"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTimeLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
export const treasuryABISepolia = [{"inputs":[{"internalType":"address","name":"_borrowing","type":"address"},{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_cdsContract","type":"address"},{"internalType":"address","name":"_wethGateway","type":"address"},{"internalType":"address","name":"_cEther","type":"address"},{"internalType":"address","name":"_aavePoolAddressProvider","type":"address"},{"internalType":"address","name":"_aToken","type":"address"},{"internalType":"address","name":"_usdt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Treasury_AaveDepositAndMintFailed","type":"error"},{"inputs":[],"name":"Treasury_AavePoolAddressZero","type":"error"},{"inputs":[],"name":"Treasury_AaveWithdrawFailed","type":"error"},{"inputs":[],"name":"Treasury_CompoundDepositAndMintFailed","type":"error"},{"inputs":[],"name":"Treasury_CompoundWithdrawFailed","type":"error"},{"inputs":[],"name":"Treasury_EthTransferToCdsLiquidatorFailed","type":"error"},{"inputs":[],"name":"Treasury_ZeroDeposit","type":"error"},{"inputs":[],"name":"Treasury_ZeroWithdraw","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositToAave","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositToCompound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromAave","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromCompound","type":"event"},{"inputs":[],"name":"aToken","outputs":[{"internalType":"contract IATOKEN","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aavePoolAddressProvider","outputs":[{"internalType":"contract IPoolAddressesProvider","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aaveWETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approveAmint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approveUsdt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"borrow","outputs":[{"internalType":"contract IBorrowing","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"borrowing","outputs":[{"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"internalType":"uint256","name":"totalBorrowedAmount","type":"uint256"},{"internalType":"bool","name":"hasBorrowed","type":"bool"},{"internalType":"bool","name":"hasDeposited","type":"bool"},{"internalType":"uint64","name":"borrowerIndex","type":"uint64"},{"internalType":"uint128","name":"totalPTokens","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cEther","outputs":[{"internalType":"contract ICEther","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cdsContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compoundAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint128","name":"_ethPrice","type":"uint128"},{"internalType":"uint64","name":"_depositTime","type":"uint64"}],"name":"deposit","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"depositToAave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositToCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalanceInTreasury","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"}],"name":"getBorrowing","outputs":[{"internalType":"uint64","name":"","type":"uint64"},{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"downsidePercentage","type":"uint64"},{"internalType":"uint128","name":"ethPriceAtDeposit","type":"uint128"},{"internalType":"uint128","name":"borrowedAmount","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"internalType":"uint8","name":"withdrawNo","type":"uint8"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"internalType":"bool","name":"liquidated","type":"bool"},{"internalType":"uint64","name":"ethPriceAtWithdraw","type":"uint64"},{"internalType":"uint64","name":"withdrawTime","type":"uint64"},{"internalType":"uint128","name":"pTokensAmount","type":"uint128"},{"internalType":"uint64","name":"strikePrice","type":"uint64"}],"internalType":"struct Treasury.DepositDetails","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"noOfBorrowers","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum Treasury.Protocol","name":"","type":"uint8"}],"name":"protocolDeposit","outputs":[{"internalType":"uint64","name":"depositIndex","type":"uint64"},{"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"internalType":"uint256","name":"totalCreditedTokens","type":"uint256"},{"internalType":"uint256","name":"depositedUsdValue","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setBorrowingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalInterest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInterestFromLiquidation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVolumeOfBorrowersAmountinUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVolumeOfBorrowersAmountinWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"transferEthToCdsLiquidators","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"trinity","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"},{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"downsidePercentage","type":"uint64"},{"internalType":"uint128","name":"ethPriceAtDeposit","type":"uint128"},{"internalType":"uint128","name":"borrowedAmount","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"internalType":"uint8","name":"withdrawNo","type":"uint8"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"internalType":"bool","name":"liquidated","type":"bool"},{"internalType":"uint64","name":"ethPriceAtWithdraw","type":"uint64"},{"internalType":"uint64","name":"withdrawTime","type":"uint64"},{"internalType":"uint128","name":"pTokensAmount","type":"uint128"},{"internalType":"uint64","name":"strikePrice","type":"uint64"}],"internalType":"struct Treasury.DepositDetails","name":"depositDetail","type":"tuple"}],"name":"updateDepositDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"updateHasBorrowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateTotalBorrowedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalDepositedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateTotalInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateTotalInterestFromLiquidation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalPTokensDecrease","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalPTokensIncrease","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdt","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wethGateway","outputs":[{"internalType":"contract IWrappedTokenGatewayV3","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint64","name":"_ethPrice","type":"uint64"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromAave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"}],"name":"withdrawFromCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
export const optionsABISepolia = [{"inputs":[{"internalType":"uint8","name":"percent","type":"uint8"}],"name":"depositOption","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint128","name":"strikePrice","type":"uint128"},{"internalType":"uint64","name":"ethPrice","type":"uint64"}],"name":"withdrawOption","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"pure","type":"function"}]

export const borrowABIMumbai = [{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_cds","type":"address"},{"internalType":"address","name":"_protocolToken","type":"address"},{"internalType":"address","name":"_priceFeedAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Borrowing_DepositFailed","type":"error"},{"inputs":[],"name":"Borrowing_GettingETHPriceFailed","type":"error"},{"inputs":[],"name":"Borrowing_LiquidateBurnFailed","type":"error"},{"inputs":[],"name":"Borrowing_LiquidateEthTransferToCdsFailed","type":"error"},{"inputs":[],"name":"Borrowing_MUSDMintFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawBurnFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawEthTransferFailed","type":"error"},{"inputs":[],"name":"Borrowing_WithdrawMUSDTransferFailed","type":"error"},{"inputs":[],"name":"Borrowing_pTokenMintFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"index","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"borrowAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"normalizedAmount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"liquidationIndex","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"cdsProfits","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"ethAmount","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"name":"Liquidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"borrowDebt","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"noOfAbond","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"APY","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Trinity","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"calculateCumulativeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cds","outputs":[{"internalType":"contract CDSInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cdsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositToAaveProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositToCompoundProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_ethPrice","type":"uint128"},{"internalType":"uint64","name":"_depositTime","type":"uint64"},{"internalType":"uint64","name":"_strikePrice","type":"uint64"}],"name":"depositTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAPY","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLTV","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUSDValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"initializeTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastCDSPoolValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCumulativeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthVaultValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthprice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTotalCDSPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint64","name":"_index","type":"uint64"},{"internalType":"uint64","name":"currentEthPrice","type":"uint64"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"noOfLiquidations","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"options","outputs":[{"internalType":"contract IOptions","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeedAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolToken","outputs":[{"internalType":"contract IProtocolToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_apy","type":"uint8"}],"name":"setAPY","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"setAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_LTV","type":"uint8"}],"name":"setLTV","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_options","type":"address"}],"name":"setOptions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_timeLimit","type":"uint64"}],"name":"setWithdrawTimeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAmintSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDiracSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalNormalizedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateLastEthVaultValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_toAddress","type":"address"},{"internalType":"uint64","name":"_index","type":"uint64"},{"internalType":"uint64","name":"_ethPrice","type":"uint64"},{"internalType":"uint64","name":"_withdrawTime","type":"uint64"}],"name":"withDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromAaveProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"}],"name":"withdrawFromCompoundProtocol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTimeLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"}]
export const cdsABIMumbai = [{"inputs":[{"internalType":"address","name":"_trinity","type":"address"},{"internalType":"address","name":"priceFeed","type":"address"},{"internalType":"address","name":"_usdt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"depositedAmint","type":"uint128"},{"indexed":false,"internalType":"uint64","name":"index","type":"uint64"},{"indexed":false,"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"depositVal","type":"uint128"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"withdrewAmint","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"withdrawETH","type":"uint128"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Trinity_token","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amintLimit","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowing","outputs":[{"internalType":"contract IBorrowing","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"fees","type":"uint128"}],"name":"calculateCumulativeRate","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cdsCount","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cdsDetails","outputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"bool","name":"hasDeposited","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"usdtAmount","type":"uint128"},{"internalType":"uint128","name":"amintAmount","type":"uint128"},{"internalType":"bool","name":"_liquidate","type":"bool"},{"internalType":"uint128","name":"_liquidationAmount","type":"uint128"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ethVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fallbackEthPrice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"}],"name":"getCDSDepositDetails","outputs":[{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"withdrawedTime","type":"uint64"},{"internalType":"uint128","name":"withdrawedAmount","type":"uint128"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"depositPrice","type":"uint128"},{"internalType":"uint128","name":"depositValue","type":"uint128"},{"internalType":"bool","name":"optedLiquidation","type":"bool"},{"internalType":"uint128","name":"InitialLiquidationAmount","type":"uint128"},{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"liquidationindex","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"}],"internalType":"struct CDSTest.CdsAccountDetails","name":"","type":"tuple"},{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCumulativeRate","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEthPrice","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"liquidationIndex","type":"uint128"}],"name":"liquidationIndexToInfo","outputs":[{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"profits","type":"uint128"},{"internalType":"uint128","name":"ethAmount","type":"uint128"},{"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"_amintAmount","type":"uint128"},{"internalType":"uint64","name":"amintPrice","type":"uint64"},{"internalType":"uint64","name":"usdtPrice","type":"uint64"}],"name":"redeemUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"percent","type":"uint8"}],"name":"setAmintLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setBorrowingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"amount","type":"uint64"}],"name":"setUsdtLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_timeLimit","type":"uint64"}],"name":"setWithdrawTimeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAvailableLiquidationAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCdsDepositedAmount","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"index","type":"uint128"},{"components":[{"internalType":"uint128","name":"liquidationAmount","type":"uint128"},{"internalType":"uint128","name":"profits","type":"uint128"},{"internalType":"uint128","name":"ethAmount","type":"uint128"},{"internalType":"uint256","name":"availableLiquidationAmount","type":"uint256"}],"internalType":"struct CDSTest.LiquidationInfo","name":"liquidationData","type":"tuple"}],"name":"updateLiquidationInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateTotalAvailableLiquidationAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"_amount","type":"uint128"}],"name":"updateTotalCdsDepositedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdt","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtAmountDepositedTillNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"_index","type":"uint64"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawTimeLimit","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
export const treasuryABIMumbai = [{"inputs":[{"internalType":"address","name":"_borrowing","type":"address"},{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_cdsContract","type":"address"},{"internalType":"address","name":"_wethGateway","type":"address"},{"internalType":"address","name":"_cEther","type":"address"},{"internalType":"address","name":"_aavePoolAddressProvider","type":"address"},{"internalType":"address","name":"_aToken","type":"address"},{"internalType":"address","name":"_usdt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Treasury_AaveDepositAndMintFailed","type":"error"},{"inputs":[],"name":"Treasury_AavePoolAddressZero","type":"error"},{"inputs":[],"name":"Treasury_AaveWithdrawFailed","type":"error"},{"inputs":[],"name":"Treasury_CompoundDepositAndMintFailed","type":"error"},{"inputs":[],"name":"Treasury_CompoundWithdrawFailed","type":"error"},{"inputs":[],"name":"Treasury_EthTransferToCdsLiquidatorFailed","type":"error"},{"inputs":[],"name":"Treasury_ZeroDeposit","type":"error"},{"inputs":[],"name":"Treasury_ZeroWithdraw","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositToAave","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositToCompound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromAave","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"count","type":"uint64"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawFromCompound","type":"event"},{"inputs":[],"name":"aToken","outputs":[{"internalType":"contract IATOKEN","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aavePoolAddressProvider","outputs":[{"internalType":"contract IPoolAddressesProvider","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aaveWETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approveAmint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approveUsdt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"borrow","outputs":[{"internalType":"contract IBorrowing","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"}],"name":"borrowing","outputs":[{"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"internalType":"uint256","name":"totalBorrowedAmount","type":"uint256"},{"internalType":"bool","name":"hasBorrowed","type":"bool"},{"internalType":"bool","name":"hasDeposited","type":"bool"},{"internalType":"uint64","name":"borrowerIndex","type":"uint64"},{"internalType":"uint128","name":"totalPTokens","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cEther","outputs":[{"internalType":"contract ICEther","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cdsContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compoundAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint128","name":"_ethPrice","type":"uint128"},{"internalType":"uint64","name":"_depositTime","type":"uint64"}],"name":"deposit","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"depositToAave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositToCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalanceInTreasury","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"}],"name":"getBorrowing","outputs":[{"internalType":"uint64","name":"","type":"uint64"},{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"downsidePercentage","type":"uint64"},{"internalType":"uint128","name":"ethPriceAtDeposit","type":"uint128"},{"internalType":"uint128","name":"borrowedAmount","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"internalType":"uint8","name":"withdrawNo","type":"uint8"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"internalType":"bool","name":"liquidated","type":"bool"},{"internalType":"uint64","name":"ethPriceAtWithdraw","type":"uint64"},{"internalType":"uint64","name":"withdrawTime","type":"uint64"},{"internalType":"uint128","name":"pTokensAmount","type":"uint128"},{"internalType":"uint64","name":"strikePrice","type":"uint64"}],"internalType":"struct Treasury.DepositDetails","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"noOfBorrowers","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum Treasury.Protocol","name":"","type":"uint8"}],"name":"protocolDeposit","outputs":[{"internalType":"uint64","name":"depositIndex","type":"uint64"},{"internalType":"uint256","name":"depositedAmount","type":"uint256"},{"internalType":"uint256","name":"totalCreditedTokens","type":"uint256"},{"internalType":"uint256","name":"depositedUsdValue","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setBorrowingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalInterest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalInterestFromLiquidation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVolumeOfBorrowersAmountinUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalVolumeOfBorrowersAmountinWei","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"transferEthToCdsLiquidators","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"trinity","outputs":[{"internalType":"contract ITrinityToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint64","name":"index","type":"uint64"},{"components":[{"internalType":"uint64","name":"depositedTime","type":"uint64"},{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint64","name":"downsidePercentage","type":"uint64"},{"internalType":"uint128","name":"ethPriceAtDeposit","type":"uint128"},{"internalType":"uint128","name":"borrowedAmount","type":"uint128"},{"internalType":"uint128","name":"normalizedAmount","type":"uint128"},{"internalType":"uint8","name":"withdrawNo","type":"uint8"},{"internalType":"bool","name":"withdrawed","type":"bool"},{"internalType":"uint128","name":"withdrawAmount","type":"uint128"},{"internalType":"bool","name":"liquidated","type":"bool"},{"internalType":"uint64","name":"ethPriceAtWithdraw","type":"uint64"},{"internalType":"uint64","name":"withdrawTime","type":"uint64"},{"internalType":"uint128","name":"pTokensAmount","type":"uint128"},{"internalType":"uint64","name":"strikePrice","type":"uint64"}],"internalType":"struct Treasury.DepositDetails","name":"depositDetail","type":"tuple"}],"name":"updateDepositDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"updateHasBorrowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"updateTotalBorrowedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalDepositedAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateTotalInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"updateTotalInterestFromLiquidation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalPTokensDecrease","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"}],"name":"updateTotalPTokensIncrease","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdt","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wethGateway","outputs":[{"internalType":"contract IWrappedTokenGatewayV3","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint64","name":"_ethPrice","type":"uint64"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromAave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"index","type":"uint64"}],"name":"withdrawFromCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawInterest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
export const optionsABIMumbai = [{"inputs":[{"internalType":"uint8","name":"percent","type":"uint8"}],"name":"depositOption","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint128","name":"depositedAmount","type":"uint128"},{"internalType":"uint128","name":"strikePrice","type":"uint128"},{"internalType":"uint64","name":"ethPrice","type":"uint64"}],"name":"withdrawOption","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"pure","type":"function"}]

export const borrowABIGoerli = [
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
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "inputs": [],
      "name": "depositToAaveProtocol",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "depositToCompoundProtocol",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "uint64",
          "name": "_depositTime",
          "type": "uint64"
        },
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
          "name": "_treasury",
          "type": "address"
        }
      ],
      "name": "initializeTreasury",
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
      "inputs": [],
      "name": "lastEthprice",
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
      "name": "lastTotalCDSPool",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "holder",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowedAmount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "allowed",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "permit",
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
      "name": "totalAmintSupply",
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
      "name": "totalDiracSupply",
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
        },
        {
          "internalType": "uint64",
          "name": "_ethPrice",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "_withdrawTime",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "_bondRatio",
          "type": "uint64"
        }
      ],
      "name": "withDraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        }
      ],
      "name": "withdrawFromAaveProtocol",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        }
      ],
      "name": "withdrawFromCompoundProtocol",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawTimeLimit",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
export const cdsABIGoerli = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_amint",
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
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "depositedAmint",
          "type": "uint128"
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
          "name": "liquidationAmount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "normalizedAmount",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "depositVal",
          "type": "uint128"
        }
      ],
      "name": "Deposit",
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
          "internalType": "uint128",
          "name": "withdrewAmint",
          "type": "uint128"
        },
        {
          "indexed": false,
          "internalType": "uint128",
          "name": "withdrawETH",
          "type": "uint128"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "PRECISION",
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
      "name": "amintLimit",
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
      "name": "borrowing",
      "outputs": [
        {
          "internalType": "contract IBorrowing",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "borrowingContract",
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
          "name": "amintAmount",
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
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ethVault",
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
      "name": "fallbackEthPrice",
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
              "internalType": "uint128",
              "name": "depositedAmount",
              "type": "uint128"
            },
            {
              "internalType": "uint64",
              "name": "withdrawedTime",
              "type": "uint64"
            },
            {
              "internalType": "uint128",
              "name": "withdrawedAmount",
              "type": "uint128"
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
              "internalType": "uint128",
              "name": "normalizedAmount",
              "type": "uint128"
            }
          ],
          "internalType": "struct CDS.CdsAccountDetails",
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
      "inputs": [],
      "name": "lastCumulativeRate",
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
      "name": "lastEthPrice",
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
          "internalType": "uint128",
          "name": "liquidationIndex",
          "type": "uint128"
        }
      ],
      "name": "liquidationIndexToInfo",
      "outputs": [
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
      "stateMutability": "view",
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
      "inputs": [
        {
          "internalType": "uint128",
          "name": "_amintAmount",
          "type": "uint128"
        },
        {
          "internalType": "uint64",
          "name": "amintPrice",
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
          "name": "percent",
          "type": "uint8"
        }
      ],
      "name": "setAmintLimit",
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
          "internalType": "struct CDS.LiquidationInfo",
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
      "inputs": [],
      "name": "usdt",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
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
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawTimeLimit",
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
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
export const treasuryABIGoerli = [
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
          "name": "_cdsContract",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_wethGateway",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_cEther",
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
          "name": "_usdt",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "name": "Treasury_ZeroDeposit",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Treasury_ZeroWithdraw",
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
      "name": "aToken",
      "outputs": [
        {
          "internalType": "contract IATOKEN",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "aavePoolAddressProvider",
      "outputs": [
        {
          "internalType": "contract IPoolAddressesProvider",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "aaveWETH",
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
      "name": "approveAmint",
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
      "inputs": [],
      "name": "borrow",
      "outputs": [
        {
          "internalType": "contract IBorrowing",
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
        },
        {
          "internalType": "uint128",
          "name": "totalAbondTokens",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "borrowingContract",
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
      "name": "cEther",
      "outputs": [
        {
          "internalType": "contract ICEther",
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
          "internalType": "uint64",
          "name": "count",
          "type": "uint64"
        }
      ],
      "name": "calculateInterestForDepositAave",
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
      "name": "cdsContract",
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
      "name": "compoundAddress",
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
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "depositToAave",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "depositToCompound",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "externalProtocolDepositCount",
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
          "internalType": "uint64",
          "name": "",
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
              "internalType": "uint8",
              "name": "withdrawNo",
              "type": "uint8"
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
              "internalType": "uint64",
              "name": "strikePrice",
              "type": "uint64"
            },
            {
              "internalType": "uint128",
              "name": "optionFees",
              "type": "uint128"
            },
            {
              "internalType": "uint256",
              "name": "burnedAmint",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "externalProtocolCount",
              "type": "uint64"
            },
            {
              "internalType": "uint256",
              "name": "discountedPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint128",
              "name": "cTokensCredited",
              "type": "uint128"
            }
          ],
          "internalType": "struct Treasury.DepositDetails",
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
      "name": "getInterestForCompoundDeposit",
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
      "name": "increaseExternalProtocolCount",
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
      "inputs": [
        {
          "internalType": "enum Treasury.Protocol",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "protocolDeposit",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "depositIndex",
          "type": "uint64"
        },
        {
          "internalType": "uint256",
          "name": "depositedAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalCreditedTokens",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "depositedUsdValue",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "cumulativeRate",
          "type": "uint256"
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
      "inputs": [],
      "name": "totalInterest",
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
      "name": "totalInterestFromExternalProtocol",
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
      "name": "totalInterestFromLiquidation",
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
              "internalType": "uint8",
              "name": "withdrawNo",
              "type": "uint8"
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
              "internalType": "uint64",
              "name": "strikePrice",
              "type": "uint64"
            },
            {
              "internalType": "uint128",
              "name": "optionFees",
              "type": "uint128"
            },
            {
              "internalType": "uint256",
              "name": "burnedAmint",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "externalProtocolCount",
              "type": "uint64"
            },
            {
              "internalType": "uint256",
              "name": "discountedPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint128",
              "name": "cTokensCredited",
              "type": "uint128"
            }
          ],
          "internalType": "struct Treasury.DepositDetails",
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
      "name": "updateTotalAbondTokensDecrease",
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
      "name": "updateTotalAbondTokensIncrease",
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
      "inputs": [],
      "name": "usdt",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "wethGateway",
      "outputs": [
        {
          "internalType": "contract IWrappedTokenGatewayV3",
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
        },
        {
          "internalType": "uint64",
          "name": "_ethPrice",
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
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        }
      ],
      "name": "withdrawFromAave",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "index",
          "type": "uint64"
        }
      ],
      "name": "withdrawFromCompound",
      "outputs": [],
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
export const optionsABIGoerli = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_priceFeed",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_treasuryAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_cdsAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "inputs": [],
      "name": "calculateStandardDeviation",
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
      "name": "getLatestPrice",
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
      "name": "updateDailyEMA",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "withdrawOption",
      "outputs": [
        {
          "internalType": "uint128",
          "name": "",
          "type": "uint128"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ]