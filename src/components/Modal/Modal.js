"use client";
import React, { useState } from "react";
import {  TextField } from "@mui/material";
import s from "./Modal.module.scss";
import ConnectWalletButtom from "../ConnectWalletButton/ConnectWalletButtom";
import { MetaMaskProvider } from "@metamask/sdk-react";
import useSound from "use-sound";

export const Modal = ({ closeModal, initialActiveTab }) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [userName, setUserName] = useState("");
  const [play] = useSound('/assets/audio/click.mp3');

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleTabClick = (tab) => {
    play()
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "userName") setUserName(value);
  };

  const isConnectWalletButtonDisabled = activeTab === "signup" && !userName;

  return (
    <div className={s.modalOverlay} onClick={handleOutsideClick}>
      <div className={s.modalContent}>
        <div className={s.tabs}>
          <button
            type="button"
            onClick={() => handleTabClick("login")}
            className={`${s.tab} ${activeTab === "login" ? s.active : ""}`}
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => handleTabClick("signup")}
            className={`${s.tab} ${activeTab === "signup" ? s.active : ""}`}
          >
            SIGNUP
          </button>
        </div>
        <div className={s.containerForm}>
          <div className={s.containerTextField}>
            {activeTab === "signup" && (
              <TextField
                label="User name"
                name="userName"
                value={userName}
                onChange={handleChange}
                className={s.textField}
              />
            )}
          </div>
          <div className={s.buttonContainer}>
            <MetaMaskProvider
              debug={false}
              sdkOptions={{
                dappMetadata: {
                  name: "test_wallet",
                  url: window.location.href,
                },
              }}
            >
              <ConnectWalletButtom userName={userName} isDisabled={isConnectWalletButtonDisabled} activeTab={activeTab}/>
            </MetaMaskProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
