import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { TaskAbi, TaskAddress } from './context';


const fetchContract = (signerOrProvider) =>
    new ethers.Contract(TaskAddress,TaskAbi, signerOrProvider);

export const taskContext = React.createContext();

export const TaskProvider = ({children}) =>{
    const [currentAccount,setCurrentAccount] = useState("");
    const createTask = async (tasks) =>{
        const {task} = tasks;
        const {time} = tasks;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
       
        try{
            const transaction = await contract.createTask(
                task,
                new Date().getTime()
            )
            await transaction.wait();
            console.log("contract call is success",transaction);
        }catch(error){
            console.log("contract call error",error);
        }

    }
    const getTask = async() =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const tasks = await contract.getTasks();
        const parsedtask = tasks.map((t, i) => ({
            task: t.description,
            date:t.time,
            completed:t.completed,
            pId: i,
        }));
        return parsedtask
    }
    const markAscompleted = async(index)=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        
        try{
            const transaction = await contract.markTaskAsCompleted(0);
            await transaction.wait();
            console.log("Contract call is successful",transaction);
        }catch(error){
            console.log(error)
        }
    }
    const deletetask = async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        
        try{
            const transaction = await contract.deleteCompletedTasks();
            await transaction.wait();
            console.log("Contract call is successful",transaction);
        }catch(error){
            console.log(error)
        }
    }
    const checkIfWalletConnected = async () => {
        try {
            if (!window.etherum)
                return 1;
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account Found");
            }
        } catch (error) {
            console.log("Error:", error);
           
        }
    }
    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum)
                setalert(true);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <taskContext.Provider value={{createTask,getTask,currentAccount,connectWallet,checkIfWalletConnected,markAscompleted,deletetask}}>
            {children}
        </taskContext.Provider>
    )
}