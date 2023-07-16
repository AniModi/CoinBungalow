
async function main() {
      const nftAddress = '0x619a7618e045db47044cbC00dc6D3ffA31FC473F'
      const Loan = await ethers.getContractFactory("Loan")
      const loan = await Loan.deploy(nftAddress);
      console.log("Loan address:", loan.target);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  