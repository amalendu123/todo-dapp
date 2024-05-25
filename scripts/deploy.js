const hre = require("hardhat");

async function main() {
    const task = await hre.ethers.getContractFactory("Tasks");
    const Task = await task.deploy(); // Corrected line
   // Wait for deployment to be confirmed
   await Task.waitForDeployment();

    console.log("Crowdfunding deployed to:", Task.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
