import ConnectEth from "@/components/wallet/connect-eth";
import EtheruemWalletProvider from "@/hooks/eth-wallet.provider";
import SolanaWalletProvider from "@/hooks/sol-wallet.provider";
import { WalletMultiButton as ConnectSol } from "@solana/wallet-adapter-react-ui";

const useWallet = () => {
  return {
    EtheruemWalletProvider,
    SolanaWalletProvider,
    ConnectSol,
    ConnectEth,
  };
};

export default useWallet;
