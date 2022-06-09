//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


// AgUSD Errors
contract AGUSDErrors {

  struct Error {
    uint256 code;
    string message;
  }

  Error internal NOT_ENOUGH_SENT = Error(1, "Not enough collateral sent");
  Error internal NOT_ENOUGH_TO_REDEEM = Error(2, "Not enough AgUSD to redeem");
  Error internal NOT_ENOUGH_COLLATERAL = Error(3, "Not enough collateral to redeem");

  Error internal GATE_LOCKED = Error(101, "Cannot deposit with this collateral");

  Error internal NOT_AUTH = Error(401, "Not authorized");
}

abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _setOwner(_msgSender());
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Not authorized");
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _setOwner(newOwner);
    }

    function _setOwner(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IERC20 {

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface IERC20Metadata is IERC20 {

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}

contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][_msgSender()];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        unchecked {
            _approve(sender, _msgSender(), currentAllowance - amount);
        }

        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender] + addedValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        uint256 currentAllowance = _allowances[_msgSender()][spender];
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(_msgSender(), spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[sender] = senderBalance - amount;
        }
        _balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);

        _afterTokenTransfer(sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

abstract contract ERC20Burnable is Context, ERC20 {

    function burn(uint256 amount) internal virtual {
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) internal virtual {
        uint256 currentAllowance = allowance(account, _msgSender());
        require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        unchecked {
            _approve(account, _msgSender(), currentAllowance - amount);
        }
        _burn(account, amount);
    }
}

interface YvVault {
  function deposit () external returns (uint256);
  function deposit (uint256 _amount) external returns (uint256);
  function deposit (uint256 _amount, address recipient) external returns (uint256);
}

contract Cooldown {
  uint256 cooldownTime = 30 minutes;

  mapping(address => uint256) readyTimes;

  modifier isCooled() {
    require(
      readyTimes[msg.sender] < block.timestamp,
      "Cooldown: Must wait before interacting again."
    );
    _;
  }

  function _triggerCooldown(address account) internal {
    readyTimes[account] = block.timestamp + cooldownTime;
  }

  function getCooldownTime(address account) public view returns(uint256) {
    return readyTimes[account];
  }
}

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/extensions/ERC20Snapshot.sol)

pragma solidity ^0.8.0;

import "../ERC20.sol";
import "../../../utils/Arrays.sol";
import "../../../utils/Counters.sol";

/**
 * @dev This contract extends an ERC20 token with a snapshot mechanism. When a snapshot is created, the balances and
 * total supply at the time are recorded for later access.
 *
 * This can be used to safely create mechanisms based on token balances such as trustless dividends or weighted voting.
 * In naive implementations it's possible to perform a "double spend" attack by reusing the same balance from different
 * accounts. By using snapshots to calculate dividends or voting power, those attacks no longer apply. It can also be
 * used to create an efficient ERC20 forking mechanism.
 *
 * Snapshots are created by the internal {_snapshot} function, which will emit the {Snapshot} event and return a
 * snapshot id. To get the total supply at the time of a snapshot, call the function {totalSupplyAt} with the snapshot
 * id. To get the balance of an account at the time of a snapshot, call the {balanceOfAt} function with the snapshot id
 * and the account address.
 *
 * NOTE: Snapshot policy can be customized by overriding the {_getCurrentSnapshotId} method. For example, having it
 * return `block.number` will trigger the creation of snapshot at the beginning of each new block. When overriding this
 * function, be careful about the monotonicity of its result. Non-monotonic snapshot ids will break the contract.
 *
 * Implementing snapshots for every block using this method will incur significant gas costs. For a gas-efficient
 * alternative consider {ERC20Votes}.
 *
 * ==== Gas Costs
 *
 * Snapshots are efficient. Snapshot creation is _O(1)_. Retrieval of balances or total supply from a snapshot is _O(log
 * n)_ in the number of snapshots that have been created, although _n_ for a specific account will generally be much
 * smaller since identical balances in subsequent snapshots are stored as a single entry.
 *
 * There is a constant overhead for normal ERC20 transfers due to the additional snapshot bookkeeping. This overhead is
 * only significant for the first transfer that immediately follows a snapshot for a particular account. Subsequent
 * transfers will have normal cost until the next snapshot, and so on.
 */

abstract contract ERC20Snapshot is ERC20 {
    // Inspired by Jordi Baylina's MiniMeToken to record historical balances:
    // https://github.com/Giveth/minimd/blob/ea04d950eea153a04c51fa510b068b9dded390cb/contracts/MiniMeToken.sol

    using Arrays for uint256[];
    using Counters for Counters.Counter;

    // Snapshotted values have arrays of ids and the value corresponding to that id. These could be an array of a
    // Snapshot struct, but that would impede usage of functions that work on an array.
    struct Snapshots {
        uint256[] ids;
        uint256[] values;
    }

    mapping(address => Snapshots) private _accountBalanceSnapshots;
    Snapshots private _totalSupplySnapshots;

    // Snapshot ids increase monotonically, with the first value being 1. An id of 0 is invalid.
    Counters.Counter private _currentSnapshotId;

    /**
     * @dev Emitted by {_snapshot} when a snapshot identified by `id` is created.
     */
    event Snapshot(uint256 id);

    /**
     * @dev Creates a new snapshot and returns its snapshot id.
     *
     * Emits a {Snapshot} event that contains the same id.
     *
     * {_snapshot} is `internal` and you have to decide how to expose it externally. Its usage may be restricted to a
     * set of accounts, for example using {AccessControl}, or it may be open to the public.
     *
     * [WARNING]
     * ====
     * While an open way of calling {_snapshot} is required for certain trust minimization mechanisms such as forking,
     * you must consider that it can potentially be used by attackers in two ways.
     *
     * First, it can be used to increase the cost of retrieval of values from snapshots, although it will grow
     * logarithmically thus rendering this attack ineffective in the long term. Second, it can be used to target
     * specific accounts and increase the cost of ERC20 transfers for them, in the ways specified in the Gas Costs
     * section above.
     *
     * We haven't measured the actual numbers; if this is something you're interested in please reach out to us.
     * ====
     */
    function _snapshot() internal virtual returns (uint256) {
        _currentSnapshotId.increment();

        uint256 currentId = _getCurrentSnapshotId();
        emit Snapshot(currentId);
        return currentId;
    }

    /**
     * @dev Get the current snapshotId
     */
    function _getCurrentSnapshotId() internal view virtual returns (uint256) {
        return _currentSnapshotId.current();
    }

    /**
     * @dev Retrieves the balance of `account` at the time `snapshotId` was created.
     */
    function balanceOfAt(address account, uint256 snapshotId) public view virtual returns (uint256) {
        (bool snapshotted, uint256 value) = _valueAt(snapshotId, _accountBalanceSnapshots[account]);

        return snapshotted ? value : balanceOf(account);
    }

    /**
     * @dev Retrieves the total supply at the time `snapshotId` was created.
     */
    function totalSupplyAt(uint256 snapshotId) public view virtual returns (uint256) {
        (bool snapshotted, uint256 value) = _valueAt(snapshotId, _totalSupplySnapshots);

        return snapshotted ? value : totalSupply();
    }

    // Update balance and/or total supply snapshots before the values are modified. This is implemented
    // in the _beforeTokenTransfer hook, which is executed for _mint, _burn, and _transfer operations.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        if (from == address(0)) {
            // mint
            _updateAccountSnapshot(to);
            _updateTotalSupplySnapshot();
        } else if (to == address(0)) {
            // burn
            _updateAccountSnapshot(from);
            _updateTotalSupplySnapshot();
        } else {
            // transfer
            _updateAccountSnapshot(from);
            _updateAccountSnapshot(to);
        }
    }

    function _valueAt(uint256 snapshotId, Snapshots storage snapshots) private view returns (bool, uint256) {
        require(snapshotId > 0, "ERC20Snapshot: id is 0");
        require(snapshotId <= _getCurrentSnapshotId(), "ERC20Snapshot: nonexistent id");

        // When a valid snapshot is queried, there are three possibilities:
        //  a) The queried value was not modified after the snapshot was taken. Therefore, a snapshot entry was never
        //  created for this id, and all stored snapshot ids are smaller than the requested one. The value that corresponds
        //  to this id is the current one.
        //  b) The queried value was modified after the snapshot was taken. Therefore, there will be an entry with the
        //  requested id, and its value is the one to return.
        //  c) More snapshots were created after the requested one, and the queried value was later modified. There will be
        //  no entry for the requested id: the value that corresponds to it is that of the smallest snapshot id that is
        //  larger than the requested one.
        //
        // In summary, we need to find an element in an array, returning the index of the smallest value that is larger if
        // it is not found, unless said value doesn't exist (e.g. when all values are smaller). Arrays.findUpperBound does
        // exactly this.

        uint256 index = snapshots.ids.findUpperBound(snapshotId);

        if (index == snapshots.ids.length) {
            return (false, 0);
        } else {
            return (true, snapshots.values[index]);
        }
    }

    function _updateAccountSnapshot(address account) private {
        _updateSnapshot(_accountBalanceSnapshots[account], balanceOf(account));
    }

    function _updateTotalSupplySnapshot() private {
        _updateSnapshot(_totalSupplySnapshots, totalSupply());
    }

    function _updateSnapshot(Snapshots storage snapshots, uint256 currentValue) private {
        uint256 currentId = _getCurrentSnapshotId();
        if (_lastSnapshotId(snapshots.ids) < currentId) {
            snapshots.ids.push(currentId);
            snapshots.values.push(currentValue);
        }
    }

    function _lastSnapshotId(uint256[] storage ids) private view returns (uint256) {
        if (ids.length == 0) {
            return 0;
        } else {
            return ids[ids.length - 1];
        }
    }
}

contract AgUSD is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, AGUSDErrors, ReentrancyGuard, Cooldown  {
    /*
     *  AgUSD, Aggregated USD
     *  Aggregated USD is an overcollateralized stablecoin which works by:
     *
     *  1) User deposits DAI, fUSDT, USDC, MIM or FRAX
     *  2) 50% of stablecoin investment gets sent to multisig, other stays in the contract, to allow for partial redemptions.
     *
     *  - having many different dollar-pegged stables will help protect the peg if one coin depegs.
     *
     *  [ Scenario 1 ]
     *  Coin prices go from $1 each to:
     *  DAI | FUSDT | USDC | MIM | FRAX
     * ----+-------+------+-----+-------
     *  $1 |  $1   |  $1  | $.75| $1
     *
     * 5 AgUSD would be backed by $4.75, and 1 AgUSD would be backed by $0.95.
     *
     * [ Scenario 2 ]
     *  Coin prices go from $1 each to:
     *  DAI | FUSDT | USDC | MIM | FRAX
     * ----+-------+------+-----+-------
     *  $1 |  $0.1 |  $1  | $1  | $1
     *
     * 5 AgUSD would be backed by $4.1, and 1 AgUSD would be backed by $0.82.
     *
     * [ Scenario 3 ]
     *  Coin prices go from $1 each to:
     *  DAI | FUSDT | USDC | MIM | FRAX
     * ----+-------+------+-----+-------
     *  $1 |  $0.1 |  $1  | $.75| $1
     *
     * 5 AgUSD would be backed by $3.85, and 1 AgUSD would be backed by $0.77.
     *
     * You can see, that even in the most dire circumstances (1 token at $0.1 and/or another at $0.75), the AgUSD peg only loses [5|18|23]% of its peg!
     * This allows the treasury to grow more, while only having to spend minimal amounts on maintaining the peg.
     *
     */

    address private dai = 0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E;
    address private fusdt = 0x049d68029688eAbF473097a2fC38ef61633A3C7A;
    address private usdc = 0x04068DA6C83AFCFA0e13ba15A6696662335D5B75;
    address private mim = 0x82f0B8B456c1A451378467398982d4834b6829c1;
    address private frax = 0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355;

    bool public mimGate = true;
    bool public daiGate = true;
    bool public usdcGate = true;
    bool public fusdtGate = true;
    bool public fraxGate = true;

    address public multisig = 0x3e522051A9B1958Aa1e828AC24Afba4a551DF37d;

    uint256 public treasurySend = 2;

    event SetGate(string ASSET, bool NEWGATE);
    event ChangeSend(uint256 _original, uint256 _new);
    event ChangedMultisig(address _old, address _new);

    modifier apartFromOwner() {
      require(_msgSender() != owner(), NOT_AUTH.message);
      _;
    }


    // these functions will be payable nonReentrant isCooled to optimise gas

    constructor() ERC20("AggregatedUSD", "AgUSD") {  }

    function startCooldown() public onlyOwner {
      _triggerCooldown(_msgSender());
    }

    function snapshot() public onlyOwner {
      _snapshot();
    }

    function mintFromDAI(uint256 amount) public payable nonReentrant isCooled {
        IERC20 daiToken = IERC20(dai);
        require(daiGate, GATE_LOCKED.message);
        require(
            daiToken.transferFrom(
                msg.sender,
                address(this),
                amount
            ),
            'Could not transfer tokens from your address to this contract'
        );
        daiToken.transferFrom(
            address(this),
            multisig,
            amount / treasurySend
        );
        _mint(msg.sender, amount);
        _triggerCooldown(_msgSender());
    }

    function mintFromUSDC(uint256 amount) public payable nonReentrant isCooled {
        IERC20 usdcToken = IERC20(usdc);
        require(usdcGate, GATE_LOCKED.message);
        require(
            usdcToken.transferFrom(
                msg.sender,
                address(this),
                amount / 10**12
            ),
            'Could not transfer tokens from your address to this contract'
        );
        usdcToken.transferFrom(
            address(this),
            multisig,
            (amount / 10**12) / treasurySend
        );
        _mint(msg.sender, amount);
        _triggerCooldown(_msgSender());
    }

    function mintFromFUSDT(uint256 amount) public payable nonReentrant isCooled {
        IERC20 fusdtToken = IERC20(fusdt);
        require(fusdtGate, GATE_LOCKED.message);
        require(
            fusdtToken.transferFrom(
                msg.sender,
                address(this),
                amount / 10**12
            ),
            'Could not transfer tokens from your address to this contract'
        );
        fusdtToken.transferFrom(
            address(this),
            multisig,
            (amount / 10**12) / treasurySend
        );
        _mint(msg.sender, amount);
        _triggerCooldown(_msgSender());
    }

    function mintFromMIM(uint256 amount) public payable nonReentrant isCooled {
        IERC20 mimToken = IERC20(mim);
        require(mimGate, GATE_LOCKED.message);
        require(
            mimToken.transferFrom(
                msg.sender,
                address(this),
                amount
            ),
            'Could not transfer tokens from your address to this contract'
        );
        mimToken.transferFrom(
            address(this),
            multisig,
            amount / treasurySend
        );
       _mint(msg.sender, amount);
       _triggerCooldown(_msgSender());
    }

    function mintFromFRAX(uint256 amount) public payable nonReentrant isCooled {
        IERC20 fraxToken = IERC20(frax);
        require(fraxGate, GATE_LOCKED.message);
        require(
            fraxToken.transferFrom(
                msg.sender,
                address(this),
                amount
            ),
            'Could not transfer tokens from your address to this contract'
        );
        fraxToken.transferFrom(
            address(this),
            multisig,
            amount / treasurySend
        );
       _mint(msg.sender, amount);
       _triggerCooldown(_msgSender());
    }

    function AgUSDToDAI(uint256 amount) public payable nonReentrant isCooled apartFromOwner {
        IERC20 daiToken = IERC20(dai);
        require(daiToken.balanceOf(address(this)) >= amount, NOT_ENOUGH_TO_REDEEM.message);
        require(balanceOf(msg.sender) >= amount);
        burn(amount);
        daiToken.transfer(msg.sender, amount);
        _triggerCooldown(_msgSender());
    }

    function AgUSDToFUSDT(uint256 amount) public payable nonReentrant isCooled apartFromOwner {
        IERC20 fusdtToken = IERC20(fusdt);
        require(fusdtToken.balanceOf(address(this)) >= amount, NOT_ENOUGH_TO_REDEEM.message);
        require(balanceOf(msg.sender) >= amount);
        burn(amount);
        fusdtToken.transfer(msg.sender, amount / 10**12);
        _triggerCooldown(_msgSender());
    }

    function AgUSDToUSDC(uint256 amount) public payable nonReentrant isCooled apartFromOwner {
        IERC20 usdcToken = IERC20(usdc);
        require(usdcToken.balanceOf(address(this)) >= amount, NOT_ENOUGH_TO_REDEEM.message);
        require(balanceOf(msg.sender) >= amount);
        burn(amount);
        usdcToken.transfer(msg.sender, amount / 10**12);
        _triggerCooldown(_msgSender());
    }

    function AgUSDToMIM(uint256 amount) public payable nonReentrant isCooled apartFromOwner {
        IERC20 mimToken = IERC20(mim);
        require(mimToken.balanceOf(address(this)) >= amount, NOT_ENOUGH_TO_REDEEM.message);
        require(balanceOf(msg.sender) >= amount);
        burn(amount);
        mimToken.transfer(msg.sender, amount);
        _triggerCooldown(_msgSender());
    }

    function AgUSDToFRAX(uint256 amount) public payable nonReentrant isCooled apartFromOwner {
        IERC20 fraxToken = IERC20(frax);
        require(fraxToken.balanceOf(address(this)) >= amount, NOT_ENOUGH_TO_REDEEM.message);
        require(balanceOf(msg.sender) >= amount);
        burn(amount);
        fraxToken.transfer(msg.sender, amount);
        _triggerCooldown(_msgSender());
    }

    function getUSDCBalance() public view returns(uint256) {
        return ERC20(usdc).balanceOf(address(this));
    }

    function getFUSDTBalance() public view returns(uint256) {
        return ERC20(fusdt).balanceOf(address(this));
    }

    function getDAIBalance() public view returns(uint256) {
        return ERC20(dai).balanceOf(address(this));
    }

    function getMIMBalance() public view returns(uint256) {
        return ERC20(mim).balanceOf(address(this));
    }

    function getFRAXBalance() public view returns(uint256) {
        return ERC20(frax).balanceOf(address(this));
    }

    function setMimGate(bool mimStatus) public onlyOwner {
        mimGate = mimStatus;
        emit SetGate("MIM", mimStatus);
    }

    function setDaiGate(bool daiStatus) public onlyOwner {
        daiGate = daiStatus;
        emit SetGate("DAI", daiStatus);
    }

    function setFusdtGate(bool fusdtStatus) public onlyOwner {
        fusdtGate = fusdtStatus;
        emit SetGate("fUSDT", fusdtStatus);
    }

    function setUsdcGate(bool usdcStatus) public onlyOwner {
        usdcGate = usdcStatus;
        emit SetGate("USDC", usdcStatus);
    }

    function setFraxGate(bool fraxStatus) public onlyOwner {
        fraxGate = fraxStatus;
        emit SetGate("FRAX", fraxStatus);
    }

    function setTreasurySent(uint256 newSend) public onlyOwner {
        require(newSend >= 2, NOT_AUTH.message);
        emit ChangeSend(treasurySend, newSend);
        treasurySend = newSend;
    }

    function setMultisig(address newSig) public onlyOwner {
        emit ChangedMultisig(multisig, newSig);
        multisig = newSig;
    }
}
