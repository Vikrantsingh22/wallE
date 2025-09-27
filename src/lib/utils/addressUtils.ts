/**
 * Utility functions for formatting addresses and creating Etherscan links
 */

/**
 * Shortens an Ethereum address to the format: 0x28...bcad
 * @param address - Full Ethereum address
 * @param startChars - Number of characters to show at the start (default: 4, includes 0x)
 * @param endChars - Number of characters to show at the end (default: 4)
 * @returns Shortened address string
 */
export function shortenAddress(
  address: string,
  startChars: number = 4,
  endChars: number = 4
): string {
  if (!address || address.length < startChars + endChars) {
    return address;
  }
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Creates an Etherscan URL for a given address
 * @param address - Ethereum address
 * @param network - Network name (default: mainnet)
 * @returns Etherscan URL
 */
export function getEtherscanUrl(
  address: string,
  network: string = "mainnet"
): string {
  const baseUrl = network === "mainnet" 
    ? "https://etherscan.io" 
    : `https://${network}.etherscan.io`;
  
  return `${baseUrl}/address/${address}`;
}

/**
 * Validates if a string is a valid Ethereum address
 * @param address - Address to validate
 * @returns boolean indicating if the address is valid
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}