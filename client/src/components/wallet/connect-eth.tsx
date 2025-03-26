import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Config, Connector, CreateConnectorFn } from "wagmi";
import { ConnectMutateAsync } from "wagmi/query";
import Logo from "../shared/logo";

interface ConnectEthProps {
  label: string;
  connectors: readonly Connector<CreateConnectorFn>[];
  connect: ConnectMutateAsync<Config, unknown>;
}

const ConnectEth = ({ label, connectors, connect }: ConnectEthProps) => {
  const navigate = useNavigate();

  async function handleConnect(connector: Connector<CreateConnectorFn>) {
    await connect({ connector });
    navigate("/app");

    toast("Wallet Connected", {
      description: `You have successfully connected your ${connector.name} wallet.`,
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="text-sm cursor-pointer font-semibold flex justify-center items-center gap-2 bg-neutral-200 h-9 rounded-md px-3">
        {label}
        <Wallet className="size-4" />
      </DialogTrigger>
      <DialogContent className="flex flex-col w-[30rem] justify-center items-center bg-midnight-100/50 backdrop-blur-2xl border-neutral-800 py-16">
        <DialogHeader className="flex flex-col w-full justify-center items-center">
          <DialogTitle>
            <div className="flex justify-center items-center gap-1">
              <Logo imgClassName="w-9" />
              <span className="text-h1 text-3xl font-audiowide">Patron</span>
            </div>
          </DialogTitle>
          <DialogDescription className="w-full text-lg tracking-tight text-center text-neutral-500">
            Connect your wallet to Patron to get started. Patron supports
            multiple wallets.
          </DialogDescription>
        </DialogHeader>
        <ul className="w-full flex flex-col gap-1 justify-center items-center mt-6">
          {connectors.map((each) => (
            <li
              key={each.uid}
              onClick={async () => await handleConnect(each)}
              className={`w-full cursor-pointer p-3 rounded-md bg-midnight-100 border border-neutral-800 flex justify-between items-center gap-3 ${
                each.name === "Injected" ? "hidden" : ""
              } dark:bg-neutral-800/30`}
            >
              <div className="flex justify-start items-center gap-2">
                <img
                  src={each.icon}
                  alt={each.name}
                  className={`h-9 w-9 rounded-md ${
                    each.name === "MetaMask" ? "bg-white h-8 w-8 p-1 px-2" : ""
                  }`}
                />
                <h4 className="text-md text-neutral-400">{each.name}</h4>
              </div>
              <h4 className="text-sm text-neutral-600">Detected</h4>
            </li>
          ))}
        </ul>
        <p className="w-full flex justify-start items-center my-5 text-neutral-500 text-sm text-center">
          By connecting a wallet, you agree to Patron’s Terms of Service and
          consent to its Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectEth;
