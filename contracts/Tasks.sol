// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Tasks {
    struct Task {
        string description;
        uint256 time;
        bool completed;
    }

    struct TaskList {
        Task[] tasks;
    }

    mapping(address => TaskList) private taskLists;
    address[] private owners;

    event TaskCreated(address indexed owner, string description, uint256 time);
    event TaskCompleted(address indexed owner, uint256 taskIndex, bool completed);
    event TaskDeleted(address indexed owner, uint256 taskIndex);

    function createTask(string memory _taskDescription, uint256 _time) public {
        Task memory newTask = Task({
            description: _taskDescription,
            time: _time,
            completed: false
        });

        if (taskLists[msg.sender].tasks.length == 0) {
            owners.push(msg.sender);
        }

        taskLists[msg.sender].tasks.push(newTask);
        emit TaskCreated(msg.sender, _taskDescription, _time);
    }

    function markTaskAsCompleted(uint256 _taskIndex) public {
        require(_taskIndex < taskLists[msg.sender].tasks.length, "Invalid task index");
        taskLists[msg.sender].tasks[_taskIndex].completed = true;
        emit TaskCompleted(msg.sender, _taskIndex, true);
    }

    function deleteCompletedTasks() public {
        TaskList storage userTasks = taskLists[msg.sender];
        uint256 originalLength = userTasks.tasks.length;

        for (uint256 i = 0; i < userTasks.tasks.length; i++) {
            if (userTasks.tasks[i].completed) {
                for (uint256 j = i; j < userTasks.tasks.length - 1; j++) {
                    userTasks.tasks[j] = userTasks.tasks[j + 1];
                }
                userTasks.tasks.pop();
                i--; 
            }
        }

        if (originalLength != userTasks.tasks.length) {
            emit TaskDeleted(msg.sender, originalLength - userTasks.tasks.length);
        }
    }

    function getTasks() public view returns (Task[] memory) {
        return taskLists[msg.sender].tasks;
    }

    function getAllOwners() public view returns (address[] memory) {
        return owners;
    }
}
