var Transaction = artifacts.require("./Transaction.sol");

contract("Transaction", function(accounts) {
  var transactionInstance;

  it("it initializes the users with the correct values", function() {
    return Transaction.deployed().then(function(instance) {
      transactionInstance = instance;
      return transactionInstance.users(1);
    }).then(function(user1) {
      assert.equal(user1[0], 1, "User1 - contains the correct ID");
      assert.equal(user1[1], "User1", "User1 - contains the correct name");
      assert.equal(user1[2], 0, "User1 - contains 50 Diorite");
      return transactionInstance.users(2);
    }).then(function(user2) {
      assert.equal(user2[0], 2, "User2 - contains the correct ID");
      assert.equal(user2[1], "User2", "User2 - contains the correct name");
      assert.equal(user2[2], 100, "User2 - contains 50 Diorite");
      return transactionInstance.users(3);
    }).then(function(user3) {
      assert.equal(user3[0], 3, "User3 - contains the correct ID");
      assert.equal(user3[1], "User3", "User3 - contains the correct name");
      assert.equal(user3[2], 50, "User3 - contains 50 Diorite");
    })
  }); 
});
