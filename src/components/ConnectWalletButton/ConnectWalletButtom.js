import { Button } from "@mui/material";
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wait } from "@/app/util/wait";
import { fetchWithMockedRoutes } from "@/app/util/fetchWithMockedRoutes";
import { playSound } from "@/app/util/playSound";

const ConnectWalletButton = ({ userName, isDisabled, activeTab }) => {
  const { sdk, connected} = useSDK();
  const [signedMessage, setSignedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const connectAndSignLogin = async () => {
    playSound()
    setIsLoading(true);
    try {
      const [walletAddress] = await sdk?.connect();
      const nonce = await fetchWithMockedRoutes(
        `test.api/eth/nonce?walletAddress=${walletAddress}`
      );
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [nonce, walletAddress],
      });
      setSignedMessage(`Sign-in to TEST_APP ${signature}`);
      await fetchWithMockedRoutes(`test.api/auth/metamask/sign-in`, {
        method: "POST",
        body: JSON.stringify({ walletAddress, signedMessage }),
      });
     
      toast(nonce);
    } catch (error) {
      console.error("Error in signing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const connectAndSignUp = async () => {
    playSound()
    setIsLoading(true);
    try {
      const [walletAddress] = await sdk?.connect();
      const nonce = await fetchWithMockedRoutes(
        `test.api/eth/nonce?walletAddress=${walletAddress}`
      );
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [nonce, walletAddress],
      });
      setSignedMessage(`Sign-up to TEST_APP ${signature}`);
      await fetchWithMockedRoutes(`test.api/auth/metamask/sign-in`, {
        method: "POST",
        body: JSON.stringify({ walletAddress, signedMessage, userName }),
      });
      toast(nonce);
    } catch (error) {
      console.error("Error in signing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    playSound()
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <>
      <Button
        disabled={isDisabled || isLoading }
        size="large"
        variant="outlined"
        onClick={
          activeTab === "signup" ? connectAndSignUp : connectAndSignLogin
        }
      >
        Connect
      </Button>
      <ToastContainer />
      <Button disabled={!connected} onClick={disconnect}>
        Disconnect
      </Button>

    </>
  );
};

export default ConnectWalletButton;
