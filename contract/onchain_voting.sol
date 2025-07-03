// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Enum to represent vote options: None, Like, Dislike
enum Vote { None, Like, Dislike }

// Struct to store project details
struct Project {
    string name;          // Name of the project
    string description;   // Description of the project
    uint totalLikes;      // Total number of likes
    uint totalDislikes;   // Total number of dislikes
}

contract ProjectVoting {
    // Mapping to store projects by their unique ID
    mapping(uint => Project) public projects;
    // Mapping to track votes: projectID => voter address => vote
    mapping(uint => mapping(address => Vote)) public votes;
    // Mapping to check if a project exists
    mapping(uint => bool) public projectExists;
    // Counter for generating unique project IDs
    uint public nextProjectID = 0;

    // Events for front-end integration
    event ProjectAdded(uint id, string name, string description);
    event Voted(uint projectID, address voter, Vote choice);

    // Function to add a new project
    function addProject(string memory _name, string memory _description) public {
        uint id = nextProjectID;
        projects[id] = Project(_name, _description, 0, 0);
        projectExists[id] = true;
        nextProjectID++;
        emit ProjectAdded(id, _name, _description);
    }

    // Function to vote on a project
    function vote(uint _projectID, Vote _choice) public {
        // Ensure the project exists
        require(projectExists[_projectID], "Project does not exist");

        // Get the voter's current vote for this project
        Vote currentVote = votes[_projectID][msg.sender];

        // Update vote totals based on current vote
        if (currentVote == Vote.Like) {
            projects[_projectID].totalLikes--;
        } else if (currentVote == Vote.Dislike) {
            projects[_projectID].totalDislikes--;
        }

        // Apply the new vote
        if (_choice == Vote.Like) {
            projects[_projectID].totalLikes++;
        } else if (_choice == Vote.Dislike) {
            projects[_projectID].totalDislikes++;
        }

        // Record the new vote
        votes[_projectID][msg.sender] = _choice;
        emit Voted(_projectID, msg.sender, _choice);
    }

    // Function to retrieve project details
    function getProject(uint _id) public view returns (string memory, string memory, uint, uint) {
        require(projectExists[_id], "Project does not exist");
        Project memory p = projects[_id];
        return (p.name, p.description, p.totalLikes, p.totalDislikes);
    }

    // Function to retrieve a user's vote for a project
    function getVoteForProject(uint _projectID, address _voter) public view returns (Vote) {
        require(projectExists[_projectID], "Project does not exist");
        return votes[_projectID][_voter];
    }
}