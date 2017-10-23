pragma solidity ^0.4.2;

import "zeppelin-solidity/contracts/token/StandardToken.sol";

contract GeneratedToken is StandardToken {
    string public name;
    string public symbol;
    uint public decimals;

    function GeneratedToken(uint initialSupply, string _name, string _symbol, uint _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        balances[msg.sender] = initialSupply;
    }
}
