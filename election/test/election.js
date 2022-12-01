var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
	
	it("testing adding new users", function() {
		return Election.deployed().then(function(instance) {
			electionInstance = instance;
			return electionInstance(1).candidate
		}).then(function(candidate_1) {assert.equal(candidate_1, candidate[2], "1 & 2 have the same name"}))

    it("initializes with two candidates", function() {
        // Fetch our instance
        return Election.deployed().then(function(instance) {
			// Fetch our # of candidates
            return instance.candidatesCount();
			
			// Injects the value of the count into this FN
        }). then(function(count) {
			// To check if there are 2 candidates
            assert.equal(count, 2);
        });
    });

    it("it initializes the users with the correct values", function() {
		return Election.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.users(1);
        }).then(function(user1) {
		  assert.equal(user1[0], 1, "contains the correct ID");
          assert.equal(user1[1], "User1", "contains the correct name");
          assert.equal(user1[2], 50, "contains the correct votes count");
          return electionInstance.users(2);
        }).then(function(user2) {
		  assert.equal(user2[0], 2, "contains the correct ID");
          assert.equal(user2[1], "User2", "contains the correct name");
          assert.equal(user2[2], 50, "contains the correct votes count");
		  return electionInstance.candidates(3);
        }).then(function(user3) {
			assert.equal(user3[0], 3, "contains the correct ID");
			assert.equal(user3[1], "User3", "contains the correct name");
			assert.equal(user3[2], 50, "contains the correct votes count");
		})
      });

});

it("allows a voter to cast a vote", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, { from: accounts[0] });
    }).then(function(receipt) {
      return electionInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "increments the candidate's vote count");
    })
  });

it("throws an exception for invalid candidates", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
    });
  });

it("throws an exception for double voting", function() {
    return Election.deployed().then(function(instance) {
      electionInstance = instance;
      candidateId = 2;
      electionInstance.vote(candidateId, { from: accounts[1] });
      return electionInstance.candidates(candidateId);
    }).then(function(candidate) {
      var voteCount = candidate[2];
      assert.equal(voteCount, 1, "accepts first vote");
      // Try to vote again
      return electionInstance.vote(candidateId, { from: accounts[1] });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
    });
  });