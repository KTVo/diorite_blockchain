pragma solidity >=0.4.22;

contract Diorite {
    string masterDioriteAddr = "0xb0630dc4c80A85f0aDB0E8e9857Ac6E208589Ddb";

    struct User {
        string addr;
        uint dioriteBalance;
    }

    // Hash map for user
    mapping(string => User) public users;

    constructor() {

    }



    function send (string _senderAddr, string _receiverAddr, uint _etherAmt)
    public
    {
        // require that the amount is greater than 0
        require(etherAmt > 0);

        // require that the sender has enough balance for the transaction
        require(users[_senderAddr].balance >= _etherAmt);

        // require a valid sender
        require(users[_senderAddr].isValue);

        // require a valid receiver
        require(users[_receiverAddr].isValue);

        // update sender's balance
        users[_senderAddr].dioriteBalance -= _etherAmt;

        // update receiver's balance
        users[_receiverAddr].dioriteBalance += _etherAmt;

    }

    // Exchange Diorite for Ether from Master account to Recipient
    function trade(string _receiverAddr, uint _etherAmt) public {

        // require that the amount is greater than 0
        require(etherAmt > 0);

        // require a valid receiver
        require(users[_receiverAddr].isValue);

        users[_receiverAddr].dioriteBalance += _etherAmt;
    }

    function getBalance(string _accountAddr) public returns (uint) {
        // require a valid user
        require(users[_accountAddr].isValue);

        return users[_accountAddr].dioriteBalance;
    }
}