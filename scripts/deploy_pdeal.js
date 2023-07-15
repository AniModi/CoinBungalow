
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const PnftAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
    const PropertyDeal = await ethers.getContractFactory("PropertyDeal")
    const propertyDeal = await PropertyDeal.deploy(PnftAddress);
    console.log("PropertyDeal address:", propertyDeal.target);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  