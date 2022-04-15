// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

/**
    @author Chris Gonel
    @title CRUD Post Contract Interface
    @notice CSBC2010 - Module 6
    @dev defines the functions needed in CRUDContract
*/

interface ICRUD {
    function createPost(string memory _content) external;
    function readPost(uint256 _id) view external returns(string memory);
    function updatePost(uint256 _id, string memory _content) external;
    function deletePost(uint256 _id) external;
}
