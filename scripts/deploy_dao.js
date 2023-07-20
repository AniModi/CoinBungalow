
async function main() {
    const Dao = await ethers.getContractFactory("DAO")
    const dao = await Dao.deploy();
    console.log("Loan address:", dao.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
