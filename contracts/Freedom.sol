pragma solidity >=0.4.22 <0.9.0;

contract Freedom
{
	string public name = "Freedom";
	string public symbol = "FRE";
	string public standard = "Freedom v1.0";
	uint256 public totalSupply;

	event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
	);

	mapping(address => uint256) public balanceOf;

	// Constructor
	constructor(uint256 _initialSupply) public
	{
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;   // Set the total number of tokens

	}

	function transfer(address _to, uint256 _value) public returns (bool success) {
		require(balanceOf[msg.sender] >= _value);
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;

		emit Transfer(msg.sender, _to, _value);
		return true;
	}
	
}