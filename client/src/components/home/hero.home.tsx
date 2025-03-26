import { Button } from "@/components/ui/button";
import { ChevronRight, Users } from "lucide-react";
import { useAccount, useConnect } from "wagmi";
import WalletOptions from "../wallet/connect-eth";

const Hero = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      <HeroHeader />
      <HeroContent />
    </div>
  );
};

const HeroHeader = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-1">
      <h3 className="w-full lg:w-3/4 text-center text-h1 font-dm font-bold text-3xl lg:text-5xl tracking-tight">
        Your Ultimate Knowledge Hub for Everything about{" "}
        <span className="text-grape-300">Technology</span>
      </h3>
      <span className="w-full lg:w-2/3 tracking-tight font-light text-sm md:text-xl text-center text-h2">
        Explore the future of technology through well-organized,
        community-driven documentation
      </span>
    </div>
  );
};

const HeroContent = () => {
  const { connectAsync, connectors } = useConnect();
  const account = useAccount();

  return (
    <div className="w-full flex flex-col justify-center items-center gap-1">
      <div className="z-10 flex justify-center items-center gap-3">
        <Button variant={"default"}>
          About Patron <ChevronRight />
        </Button>
        {account.isConnected ? (
          <Button variant={"secondary"}>
            Explore Communities
            <Users />
          </Button>
        ) : (
          <WalletOptions
            connect={connectAsync}
            connectors={connectors}
            label="Connect Wallet"
          />
        )}
      </div>
      <div className="z-10 flex flex-col justify-center items-center">
        <div className="text-p flex justify-center items-center gap-1">
          Did you connect wallet?{" "}
          <Button variant={"link"} className="text-app-primary-dark/70 p-0">
            App
          </Button>
        </div>
      </div>
      <div className=" absolute top-60 w-3/5 h-20 bg-neutral-600/50 blur-3xl rounded" />

      <div className="z-10 flex justify-start items-center gap-2 p-0 mt-5">
        <span className="text-md md:text-lg text-p/70 font-dm-sans ">
          Passionately built by
        </span>
        <img
          src="/assets/vectors/sticky-fingers.svg"
          alt="DSS Logo"
          className="size-12 md:size-20 md:h-10"
        />
      </div>
    </div>
  );
};

export default Hero;
