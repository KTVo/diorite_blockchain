pragma solidity >=0.4.22 <0.8.0;

contract Transaction {
    // Model a User
    struct User {
        // address id;
        uint id;
        string name;
        uint balance;
    }


    // Read/write users
    mapping(uint => User) public users;

    // searches for a user account by given username then return that account's ID
    function getUserID (string memory _name) public returns (uint) {
        uint userID = 0;

        for (uint i = 0; i <= usersCount; i++)
        {
            if (keccak256(abi.encodePacked(users[i].name)) == keccak256(abi.encodePacked(_name))) {
                userID = i;
                break;
            }
        }

        return userID;
    }


    // Store users Count
    uint public usersCount;


    event transactionEvent (
        uint indexed _userId
    );


    constructor() public {
        addUser("User1");
        addUser("User2");
        addUser("User3");
        uint user1ID = getUserID("User1");
        uint user2ID = getUserID("User2");

        send(user1ID, user2ID, 50);
    }


    function addUser (string memory _name) public returns (bool) {
        bool valid = true;
        for (uint i = 0; i <= usersCount; i++) {
            // requre that user's name is unique
            if (keccak256(abi.encodePacked(users[i].name)) == keccak256(abi.encodePacked(_name))) {
                valid = false;
                break;
            }    
        }

        if (valid)
        {
            usersCount++;
            users[usersCount] = User(usersCount, _name, 50);
        }
        
        return valid;
    }


    function send (uint _senderId, uint _receiverId, uint _amount) public {
        // require that the amount is greater than 0
        require(_amount > 0);

        // require that the sender has enough balance for the transaction
        require(users[_senderId].balance >= _amount);

        // require a valid sender
        require(_senderId > 0 && _senderId <= usersCount);

        // require a valid receiver
        require(_receiverId > 0 && _receiverId <= usersCount);

        // update sender's balance
        users[_senderId].balance -= _amount;

        // update receiver's balance
        users[_receiverId].balance += _amount;

        // trigger transaction event
        emit transactionEvent(_senderId);
    }
}
