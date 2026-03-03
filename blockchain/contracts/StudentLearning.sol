// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StudentLearning {
    // ---------------- ROLES ----------------
    enum Role { NONE, STUDENT, MENTOR, HR }
    address public owner;

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.HR; // deployer is HR
    }

    // ---------------- STRUCTS ----------------
    struct Activity {
        string category;        // Domain / Extra / Details
        string title;           // Course or Activity name
        string certificateCID;  // IPFS hash
        uint score;             // 0 if no quiz
        address mentor;         // assigned mentor
        bool approved;
        uint timestamp;
    }

    // ---------------- MAPPINGS ----------------
    mapping(address => Role) public roles;
    mapping(address => Activity[]) private studentActivities;

    // ---------------- MODIFIERS ----------------
    modifier onlyMentor() {
        require(roles[msg.sender] == Role.MENTOR, "Not a mentor");
        _;
    }

    modifier onlyHR() {
        require(roles[msg.sender] == Role.HR, "Not HR");
        _;
    }

    modifier onlyStudent() {
        require(roles[msg.sender] == Role.STUDENT, "Not a student");
        _;
    }

    // ---------------- HR FUNCTIONS ----------------
    function assignMentor(address mentor) external onlyHR {
        require(roles[mentor] == Role.NONE, "Already has role");
        roles[mentor] = Role.MENTOR;
    }

    // ---------------- STUDENT FUNCTIONS ----------------
    function registerStudent() external {
        require(roles[msg.sender] == Role.NONE, "Already registered");
        roles[msg.sender] = Role.STUDENT;
    }

    function submitActivity(
        string memory category,
        string memory title,
        string memory certificateCID,
        uint score,
        address mentor
    ) external onlyStudent {
        require(roles[mentor] == Role.MENTOR, "Invalid mentor");
        require(bytes(category).length > 0, "Category required");
        require(bytes(title).length > 0, "Title required");

        studentActivities[msg.sender].push(
            Activity({
                category: category,
                title: title,
                certificateCID: certificateCID,
                score: score,
                mentor: mentor,
                approved: false,
                timestamp: block.timestamp
            })
        );
    }

    // ---------------- MENTOR FUNCTIONS ----------------
    function approveActivity(address student, uint index) external onlyMentor {
        require(index < studentActivities[student].length, "Invalid index");
        Activity storage act = studentActivities[student][index];
        require(act.mentor == msg.sender, "Not assigned mentor");
        act.approved = true;
    }

    // ---------------- READ FUNCTIONS ----------------
    function getStudentActivities(address student)
        external
        view
        returns (Activity[] memory)
    {
        return studentActivities[student];
    }

    function getStudentActivityCount(address student) external view returns (uint) {
        return studentActivities[student].length;
    }
}
