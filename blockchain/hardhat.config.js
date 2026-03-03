// hardhat.config.js
import "@nomicfoundation/hardhat-toolbox";

export default {
  solidity: "0.8.20",

  networks: {
    kavaTestnet: {
      url: "https://evm.testnet.kava.io",
      accounts: ["4ebbae1e10b3e9f1035f838e74461c0404f3fc1c5de10c97e1d98e9e80e9c538"]
    }
  }
};
