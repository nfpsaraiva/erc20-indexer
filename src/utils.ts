import { Utils } from "alchemy-sdk";

const formatBalance = (balance: string | null) => {
  return Number(Utils.formatEther(Number(balance).toString())).toFixed(2);
}

const isEns = (address: string) => address.substring(address.length - 4, address.length) === '.eth';

export {
  formatBalance,
  isEns
}