"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionError,
  TransactionResponse,
} from "@coinbase/onchainkit/transaction";
import { useNotification } from "@coinbase/onchainkit/minikit";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card({
  title,
  children,
  className = "",
  onClick,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type FeaturesProps = {
  setActiveTab: (tab: string) => void;
};

export function Features({ setActiveTab }: FeaturesProps) {
  console.log(setActiveTab);
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Key Features">
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Minimalistic and beautiful UI design
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Responsive layout for all devices
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Dark mode support
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              OnchainKit integration
            </span>
          </li>
        </ul>
        <Button variant="outline" onClick={() => setActiveTab("home")}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
}

type Voting = {
  id: number;
  title: string;
  description: string;
  creator: string;
  options: { id: number; text: string; votes?: number }[];
  maxVoters: number;
  currentVoters: number;
  isActive: boolean;
  isRevealed: boolean;
};

type HomeProps = {
  setActiveTab: (tab: string) => void;
};

export function Home({ setActiveTab }: HomeProps) {
  console.log(setActiveTab);
  const [votings, setVotings] = useState<Voting[]>([
    {
      id: 1,
      title: "Best Blockchain for DeFi",
      description: "Which blockchain do you think is the best for DeFi applications? Consider factors like transaction speed, fees, ecosystem, and security when making your choice.",
      creator: "0x83A22d02D374F0Aec2C4425130922C93046aEe6a",
      options: [
        { id: 1, text: "Ethereum", votes: 15 },
        { id: 2, text: "Base", votes: 45 },
        { id: 3, text: "Polygon", votes: 25 },
        { id: 4, text: "Arbitrum", votes: 15 }
      ],
      maxVoters: 100,
      currentVoters: 100,
      isActive: false,
      isRevealed: false
    },
    {
      id: 2,
      title: "Next Feature Priority",
      description: "What feature should we implement next in our MiniKit app? Your vote will help us prioritize development efforts for the upcoming release.",
      creator: "0xabcd...efgh",
      options: [
        { id: 1, text: "NFT Marketplace", votes: 23 },
        { id: 2, text: "DeFi Staking", votes: 31 },
        { id: 3, text: "Social Features", votes: 18 },
        { id: 4, text: "Gaming Integration", votes: 17 }
      ],
      maxVoters: 200,
      currentVoters: 89,
      isActive: true,
      isRevealed: false
    },
    {
      id: 3,
      title: "Favorite Crypto Project",
      description: "Which crypto project has the most potential in 2025? Consider innovation, adoption, and long-term sustainability in your decision.",
      creator: "0x9876...1234",
      options: [
        { id: 1, text: "Coinbase", votes: 20 },
        { id: 2, text: "Uniswap", votes: 15 },
        { id: 3, text: "Chainlink", votes: 8 },
        { id: 4, text: "AAVE", votes: 7 }
      ],
      maxVoters: 50,
      currentVoters: 50,
      isActive: false,
      isRevealed: true
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const addNewVoting = (newVoting: Omit<Voting, 'id'>) => {
    const newId = votings.length > 0 ? Math.max(...votings.map(v => v.id)) + 1 : 1;
    setVotings(prev => [{ ...newVoting, id: newId }, ...prev]);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {showCreateForm ? (
        <CreateVotingForm 
          onSubmit={addNewVoting}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : (
        <>
          <VotingList votings={votings} setVotings={setVotings} />

          <div className="flex justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setShowCreateForm(true)}
              icon={<Icon name="plus" size="sm" />}
            >
              Create Voting
            </Button>
          </div>
        </>
      )}

    </div>
  );
}

type IconProps = {
  name: "heart" | "star" | "check" | "plus" | "arrow-right" | "x";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    x: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Close</title>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}

type CreateVotingFormProps = {
  onSubmit: (voting: Omit<Voting, 'id'>) => void;
  onCancel: () => void;
};

function CreateVotingForm({ onSubmit, onCancel }: CreateVotingFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [maxVoters, setMaxVoters] = useState("");
  const { address } = useAccount();
  const sendNotification = useNotification();

  // Create transaction calls for creating voting
  const calls = useMemo(() => address
    ? [
        {
          to: address,
          data: "0x" as `0x${string}`,
          value: BigInt(0),
        },
      ]
    : [], [address]);

  const handleCreateSuccess = useCallback(async (response: TransactionResponse) => {
    const transactionHash = response.transactionReceipts[0].transactionHash;

    console.log(`Create voting transaction successful: ${transactionHash}`);

    // Create the new voting
    const newVoting: Omit<Voting, 'id'> = {
      title,
      description,
      creator: address || "Unknown",
      options: options.filter(opt => opt.trim() !== "").map((text, index) => ({
        id: index + 1,
        text: text.trim()
      })),
      maxVoters: parseInt(maxVoters) || 100,
      currentVoters: 0,
      isActive: true,
      isRevealed: false
    };

    onSubmit(newVoting);

    // Send notification
    await sendNotification({
      title: "Voting Created!",
      body: `"${title}" has been created successfully. Transaction: ${transactionHash}`,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setOptions(["", ""]);
    setMaxVoters("");
  }, [title, description, options, maxVoters, address, onSubmit, sendNotification]);

  const handleCreateError = useCallback((error: TransactionError) => {
    console.error("Create voting transaction failed:", error);
  }, []);

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const isFormValid = title.trim() !== "" && 
                     description.trim() !== "" && 
                     options.filter(opt => opt.trim() !== "").length >= 2 &&
                     maxVoters !== "" && parseInt(maxVoters) > 0 &&
                     address;

  return (
    <Card title="Create New Voting">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            Create New Voting
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            icon={<Icon name="x" size="sm" />}
          >
            Cancel
          </Button>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
              Voting Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter voting title..."
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your voting question..."
              rows={3}
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)] resize-none"
              maxLength={500}
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
              Voting Options * (minimum 2, maximum 6)
            </label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}...`}
                    className="flex-1 px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
                    maxLength={100}
                  />
                  {options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      icon={<Icon name="x" size="sm" />}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {options.length < 6 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  icon={<Icon name="plus" size="sm" />}
                >
                  Add Option
                </Button>
              )}
            </div>
          </div>

          {/* Max Voters */}
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
              Maximum Number of Voters *
            </label>
            <input
              type="number"
              value={maxVoters}
              onChange={(e) => setMaxVoters(e.target.value)}
              placeholder="Enter maximum voters (e.g., 100)"
              min="1"
              max="10000"
              className="w-full px-3 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--app-accent)]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            
            {address && isFormValid ? (
              <Transaction
                calls={calls}
                onSuccess={handleCreateSuccess}
                onError={handleCreateError}
              >
                <TransactionButton 
                  className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)] px-6 py-2 rounded-lg font-medium"
                  text="Create Voting"
                />
              </Transaction>
            ) : (
              <Button
                variant="primary"
                disabled={!isFormValid}
              >
                {!address ? "Connect Wallet" : "Create Voting"}
              </Button>
            )}
          </div>

          {!address && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-400">
                Connect your wallet to create a voting
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function VotingList({ votings, setVotings }: { votings: Voting[]; setVotings: React.Dispatch<React.SetStateAction<Voting[]>> }) {
  const [userVotes, setUserVotes] = useState<Record<number, number>>({});
  const { address } = useAccount();
  const sendNotification = useNotification();

  // Create transaction calls for voting
  const calls = useMemo(() => address
    ? [
        {
          to: address,
          data: "0x" as `0x${string}`,
          value: BigInt(0),
        },
      ]
    : [], [address]);

  const handleVoteSuccess = useCallback(async (response: TransactionResponse, votingId: number, optionId: number, optionText: string) => {
    const transactionHash = response.transactionReceipts[0].transactionHash;

    console.log(`Vote transaction successful: ${transactionHash}`);

    // Update the local vote state
    setUserVotes(prev => ({ ...prev, [votingId]: optionId }));

    // Update voting currentVoters count and check if it should be closed
    setVotings(prev => prev.map(voting => {
      if (voting.id === votingId) {
        const newCurrentVoters = voting.currentVoters + 1;
        return {
          ...voting,
          currentVoters: newCurrentVoters,
          isActive: newCurrentVoters < voting.maxVoters
        };
      }
      return voting;
    }));

    // Send notification
    await sendNotification({
      title: "Vote Submitted!",
      body: `You voted for "${optionText}". Transaction: ${transactionHash}`,
    });
  }, [sendNotification, setVotings]);

  const handleVoteError = useCallback((error: TransactionError) => {
    console.error("Vote transaction failed:", error);
  }, []);

  const handleRevealSuccess = useCallback(async (response: TransactionResponse, votingId: number, votingTitle: string) => {
    const transactionHash = response.transactionReceipts[0].transactionHash;

    console.log(`Reveal voting transaction successful: ${transactionHash}`);

    // Update voting to revealed and finished
    setVotings(prev => prev.map(voting => {
      if (voting.id === votingId) {
        return {
          ...voting,
          isRevealed: true,
          isActive: false
        };
      }
      return voting;
    }));

    // Send notification
    await sendNotification({
      title: "Results Revealed!",
      body: `Results for "${votingTitle}" have been revealed. Transaction: ${transactionHash}`,
    });
  }, [sendNotification, setVotings]);

  const handleRevealError = useCallback((error: TransactionError) => {
    console.error("Reveal voting transaction failed:", error);
  }, []);

  const isCreator = useCallback((creatorAddress: string) => {
    if (!address || !creatorAddress) return false;
    // Remove "..." if it's a truncated address, or compare full addresses
    if (creatorAddress.includes("...")) {
      // For truncated addresses like "0x1234...5678", just check if current address starts with the beginning
      const prefix = creatorAddress.split("...")[0];
      return address.toLowerCase().startsWith(prefix.toLowerCase());
    }
    return address.toLowerCase() === creatorAddress.toLowerCase();
  }, [address]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[var(--app-foreground)] mb-4">
        Active Votings
      </h2>
      {votings.map((voting) => (
        <Card key={voting.id} title={voting.title}>
          <div className="space-y-4">
            <p className="text-[var(--app-foreground-muted)] text-sm">
              {voting.description}
            </p>
            
            <div className="flex justify-between items-center text-xs text-[var(--app-foreground-muted)]">
              <span>Created by: {voting.creator}</span>
              <span className={
                voting.isRevealed ? "text-blue-500" : 
                voting.isActive ? "text-green-500" : "text-orange-500"
              }>
                {voting.isRevealed ? "Results Revealed" : 
                 voting.isActive ? `${voting.currentVoters}/${voting.maxVoters} votes` : "Awaiting Reveal"}
              </span>
            </div>

            <div className="space-y-3">
              {voting.options.map((option) => {
                const hasVoted = userVotes[voting.id] === option.id;
                const canVote = voting.isActive && !userVotes[voting.id] && address && voting.currentVoters < voting.maxVoters;
                const votePercentage = voting.isRevealed && option.votes ? Math.round((option.votes / voting.currentVoters) * 100) : 0;

                return (
                  <div key={option.id}>
                    {voting.isRevealed ? (
                      // Show results when revealed
                      <div className="w-full p-3 rounded-lg border border-[var(--app-card-border)] bg-[var(--app-card-bg)]">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[var(--app-foreground)] font-medium">
                            {option.text}
                          </span>
                          <span className="text-sm text-[var(--app-foreground-muted)]">
                            {option.votes || 0} votes ({votePercentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-[var(--app-card-border)] rounded-full h-2">
                          <div
                            className="bg-[var(--app-accent)] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${votePercentage}%` }}
                          />
                        </div>
                      </div>
                    ) : canVote ? (
                      <Transaction
                        calls={calls}
                        onSuccess={(response) => handleVoteSuccess(response, voting.id, option.id, option.text)}
                        onError={handleVoteError}
                      >
                        <TransactionButton 
                          className="w-full text-left p-3 rounded-lg border transition-all border-[var(--app-card-border)] hover:border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-foreground)]"
                          text={option.text}
                        />
                      </Transaction>
                    ) : (
                      <button
                        disabled
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          hasVoted
                            ? "border-[var(--app-accent)] bg-[var(--app-accent-light)]"
                            : "border-[var(--app-card-border)] opacity-60 cursor-not-allowed"
                        }`}
                      >
                        <span className="text-[var(--app-foreground)]">
                          {option.text}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {!address && voting.isActive && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-400">
                  Connect your wallet to vote
                </p>
              </div>
            )}

            {userVotes[voting.id] && (
              <div className="mt-4 p-3 bg-[var(--app-accent-light)] rounded-lg">
                <p className="text-sm text-[var(--app-foreground)]">
                  ✓ You voted for: {voting.options.find(opt => opt.id === userVotes[voting.id])?.text}
                </p>
              </div>
            )}

            {/* Reveal Results Button - Only for creator */}
            {!voting.isActive && !voting.isRevealed && isCreator(voting.creator) && (
              <div className="mt-4 flex justify-center">
                <Transaction
                  calls={calls}
                  onSuccess={(response) => handleRevealSuccess(response, voting.id, voting.title)}
                  onError={handleRevealError}
                >
                  <TransactionButton 
                    className="bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)] px-4 py-2 rounded-lg font-medium"
                    text="Reveal Results"
                  />
                </Transaction>
              </div>
            )}

            {/* Results Revealed Status */}
            {voting.isRevealed && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-400 text-center">
                  🎉 Results have been revealed!
                </p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
