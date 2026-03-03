// scripts/deploy.cjs
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const StudentLearning = await hre.ethers.getContractFactory("StudentLearning");
  const studentLearning = await StudentLearning.deploy();

  await studentLearning.waitForDeployment();

  console.log("StudentLearning deployed to:", studentLearning.target);
  console.log(
    "View on Kava testnet:",
    `https://explorer.testnet.kava.io/address/${studentLearning.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
