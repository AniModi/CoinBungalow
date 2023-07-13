
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const PropertyNFT = await ethers.getContractFactory("PropertyNFT");
  const propertyNFT = await PropertyNFT.deploy();
  console.log("PropertyNFT address:", propertyNFT.target);

  const PropertyDeal = await ethers.getContractFactory("PropertyDeal")
  const propertyDeal = await PropertyDeal.deploy(propertyNFT.target);
  console.log("PropertyDeal address:", propertyDeal.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
