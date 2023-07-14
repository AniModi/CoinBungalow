
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const PnftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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
  