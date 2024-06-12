import { Utils } from "alchemy-sdk";

const formatBalance = (balance: string | null) => {
  if (balance === null) return 0;

  return Utils.formatEther(balance);
}

const isEns = (address: string) => address.substring(address.length - 4, address.length) === '.eth';

const isValidAddress = (address: string) => {
  if (
    address !== undefined &&
    address !== null &&
    (isEns(address) || address.length === 42)
  ) {
    return true;
  }

  return false;
}

export {
  formatBalance,
  isEns,
  isValidAddress
}