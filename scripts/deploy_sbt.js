
async function main() {
    const Sbt = await ethers.getContractFactory("SBT")
    const sbt = await Sbt.deploy();
    console.log("SBT address:", sbt.target);
  //   const PropertyNFT = await ethers.getContractFactory("PropertyNFT");
  // const propertyNFT = await PropertyNFT.deploy();
  // console.log("PropertyNFT address:", propertyNFT.target);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  