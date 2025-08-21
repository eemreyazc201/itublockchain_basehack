// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

contract FHEVoting is SepoliaConfig {
    struct Poll {
        euint32 total;          // Şifreli toplam oy
        string description;     // Açıklama
        address owner;          // Oylama sahibi
        bool exists;            // Var/yok
        string[] options;       // Oy seçenekleri (plain)
    }

    mapping(uint256 => Poll) private polls;
    uint256 public mapIdCounter = 0;

    modifier onlyPollOwner(uint256 mapId) {
        require(polls[mapId].exists, "Poll does not exist");
        require(msg.sender == polls[mapId].owner, "Not poll owner");
        _;
    }

    /// Yeni oylama: açıklama + seçenekler
    function createPoll(string calldata description, string[] calldata options) external {
        require(options.length >= 2, "Need >=2 options");

        euint32 zero = FHE.asEuint32(0);

        polls[mapIdCounter] = Poll({
            total: zero,
            description: description,
            owner: msg.sender,
            exists: true,
            options: options
        });

        // yetkiler
        FHE.allowThis(polls[mapIdCounter].total);
        FHE.allow(polls[mapIdCounter].total, msg.sender);

        mapIdCounter++;
    }


    function vote(
        uint256 mapId,
        uint256 optionIndex
    ) external {
        require(polls[mapId].exists, "Poll does not exist");
        require(optionIndex < polls[mapId].options.length, "Bad option");

        uint32 factor = 1;
        for (uint i = 0; i < optionIndex; i++) {
            factor *= 100;
        }
        euint32 factorEnc = FHE.asEuint32(factor);

        polls[mapId].total = FHE.add(polls[mapId].total, factorEnc);
        FHE.allowThis(polls[mapId].total);
        FHE.allow(polls[mapId].total, polls[mapId].owner);
    }

    /// Sadece sahibi toplam şifreli sayacı alabilir
    function getCount(uint256 mapId)
        external
        view
        onlyPollOwner(mapId)
        returns (euint32)
    {
        return polls[mapId].total;
    }

    /// Herkese açık meta bilgiler
    function getPollInfo(uint256 mapId)
        external
        view
        returns (string memory description, address owner, bool exists, string[] memory options)
    {
        Poll storage p = polls[mapId];
        return (p.description, p.owner, p.exists, p.options);
    }
}
