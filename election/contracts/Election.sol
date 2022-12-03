// Declares Solidity version
pragma solidity 0.5.16;

// Declaring a contract with the contract name Election
contract Election {

	// Model a Candidate -> create + design a candidate
	//		Will have a name, vote count, ID
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}
	
	// Store Candidate that we've modeled
	// Using a hash map
	//		Key: uint ID
	//      Value: Candidate
	mapping(uint => Candidate) public candidates;

	// Store accounts that have voted
	mapping(address => bool) public voters;
	
	// Fetch Candidate that we've stored
	
	// Store Candidates Count
	uint public candidatesCount;

	// This is a state variable
	// It allows us to write data to the block chain
	// public -> Solidity will offer a getter FN to let us access this value
	// 	outside our contract
	// Read/write candidate
	string public candidate;

	// Constructor
	// Contructor is called whenever our smart contract we deploy a 
	// 	smart contract to the block chain
	constructor() public {

		addCandidate("Candidate 1");
		addCandidate("Candidate 2");
		
	}
	
	function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

	// Calculates vote for candidates
	function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;
    }
}

