// SPDX-License-Identifier: MIT
pragma solidity ^0.5.11;

contract TipPlatform {
    struct Creator {
        string name;
        address walletAddress;
        uint256 balance;
    }

    mapping(address => Creator) public creators;

    event TipSent(address indexed creator, address indexed sender, uint256 amount);

    // Register a new creator
    function registerCreator(string memory _name, address _walletAddress) public {
        require(creators[_walletAddress].walletAddress == address(0), "Creator already registered");
        creators[_walletAddress] = Creator({
            name: _name,
            walletAddress: _walletAddress,
            balance: 0
        });
    }

    // Tip a creator
    function tipCreator(address _creatorWallet) public payable {
        require(msg.value > 0, "Tip amount must be greater than 0");
        require(creators[_creatorWallet].walletAddress != address(0), "Creator not registered");

        creators[_creatorWallet].balance += msg.value;

        emit TipSent(_creatorWallet, msg.sender, msg.value);
    }

    // Get balance of a creator
    function getCreatorBalance(address _creatorWallet) public view returns (uint256) {
        return creators[_creatorWallet].balance;
    }
}
