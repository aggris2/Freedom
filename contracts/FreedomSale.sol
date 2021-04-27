pragma solidity >=0.4.22 <0.9.0;
import "./Freedom.sol";

contract FreedomSale {
	address admin;
	Freedom public tokenContract;
	uint256 public tokenPrice;

	constructor(Freedom _tokenContract, uint256 _tokenPrice) public {
		admin = msg.sender;
		tokenContract = _tokenContract;
		tokenPrice = _tokenPrice;
	}

}