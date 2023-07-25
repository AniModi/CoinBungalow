
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const PropertyNFT = await ethers.getContractFactory("PropertyNFT");
  const propertyNFT = await PropertyNFT.deploy();
  console.log("PropertyNFT address:", propertyNFT.target);

  const PropertyDeal = await ethers.getContractFactory("PropertyDeal")
    const propertyDeal = await PropertyDeal.deploy(propertyNFT.target);
    console.log("PropertyDeal address:", propertyDeal.target);

    const Loan = await ethers.getContractFactory("Loan")
    const loan = await Loan.deploy(propertyNFT.target);
    console.log("Loan address:", loan.target);

    const Sbt = await ethers.getContractFactory("SBT")
    const sbt = await Sbt.deploy();
    console.log("SBT address:", sbt.target);

    const Dao = await ethers.getContractFactory("DAO")
    const dao = await Dao.deploy();
    console.log("Dao address:", dao.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
