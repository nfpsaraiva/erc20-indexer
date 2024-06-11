import { Utils } from "alchemy-sdk";

const formatBalance = (balance: string | null) => {
  if (balance === null) return 0;

  return Utils.formatEther(balance);
}

const isEns = (address: string) => address.substring(address.length - 4, address.length) === '.eth';

export {
  formatBalance,
  isEns
}