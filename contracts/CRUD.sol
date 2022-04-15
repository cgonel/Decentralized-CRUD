// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

/**
    @author Chris Gonel
    @title CRUD Post Contract
*/
 
import "./ICRUD.sol";

contract CRUD is ICRUD {
    uint256 private id;
    mapping(uint256 => string) private post;
    mapping(uint256 => address) private postOwner;

    /// @notice confirms if the post belongs to msg.sender
    /// @param _id the id of the post
    /// @return isAllowed returns true if post belongs to msg.sender
    function onlyPostOwner(uint256 _id) private view returns(bool isAllowed) {
        if(postOwner[_id] == msg.sender){
            return true;
        }
    }

    /// @notice creates a post
    /// @param _content The string contained in the post
    function createPost(string memory _content) external {
        // give post an id
        // & store address of creator
        id++;
        post[id] = _content;
        postOwner[id] = msg.sender;

        emit PostCreated(id, msg.sender, _content);
    }

    /// @notice logs when a post is created
    /// @param id the id of the post
    /// @param owner the owner of the post
    event PostCreated(uint256 indexed id, address indexed owner, string);

    /// @notice reads a post
    /// @param _id the id of the post
    /// @return string content of the post
    function readPost(uint256 _id) view external returns(string memory) {
        // send error message if post doesn't exist
        if(_id > id){
            return "Post doesn't exist";
        }else if(bytes(post[id]).length == 0 && _id <= id){
            return "Post has been deleted";
        }

        return post[_id];
    }

    /// @notice updates a post
    /// @param _id the id of the post
    /// @param _content the new content of the post
    function updatePost(uint256 _id, string memory _content) external {
        require(onlyPostOwner(_id), "Only the owner can alter this post");
        post[_id] = _content;

        emit PostUpdated(_id, _content);
    }

    /// @notice logs when a post is updated
    /// @param id the id of the post
    event PostUpdated(uint256 indexed id, string);

    /// @notice deletes a post
    /// @param _id the id of the post
    function deletePost(uint256 _id) external {
        require(onlyPostOwner(_id), "Only the owner can alter this post");
        delete post[_id];
        delete postOwner[_id];

        emit PostDeleted(_id);
    }

    /// @notice logs when a post is deleted
    /// @param id the id of the post
    event PostDeleted(uint256 indexed id);
}