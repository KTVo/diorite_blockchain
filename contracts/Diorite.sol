pragma solidity ^0.5.16;

contract Diorite {
    string masterDioriteAddr = "0xb0630dc4c80A85f0aDB0E8e9857Ac6E208589Ddb";

    struct User {
        string addr;
        uint dioriteBalance;
        bool isValue;
    }

    // Hash map for user
    mapping(string => User) public users;

    constructor() public {
        
    }


    function send (string memory _senderAddr, string memory _receiverAddr, uint _etherAmt)
    public
    {

        // require that the amount is greater than 0
        require(_etherAmt > 0);

        // require that the sender has enough balance for the transaction
        require(users[_senderAddr].dioriteBalance >= _etherAmt);

        // require a valid sender
        // require(users[_senderAddr]);

        // require a valid receiver
        // require(users[_receiverAddr]);

        // update sender's balance
        users[_senderAddr].dioriteBalance -= _etherAmt;

        // update receiver's balance
        users[_receiverAddr].dioriteBalance += _etherAmt;

    }

    // Exchange Diorite for Ether from Master account to Recipient
    function buy(string memory _accountAddr, uint _etherAmt) public {

        // require that the amount is greater than 0
        require(_etherAmt > 0);

        // require a valid receiver
        // require(users[_accountAddr].isValue);

        // Adds a new user if address does NOT exist
        // Check if address already exist
        if (!users[_accountAddr].isValue)
            users[_accountAddr] = User(_accountAddr, 0, true);  

        users[_accountAddr].dioriteBalance += _etherAmt;
    }

    function getBalance(string memory _accountAddr) public returns (uint) {
        // require a valid user
        // require(users[_accountAddr].isValue);

        // Adds a new user if address does NOT exist
        // Check if address already exist
        if (!users[_accountAddr].isValue)
            users[_accountAddr] = User(_accountAddr, 0, true);  

        return users[_accountAddr].dioriteBalance;
    }
}