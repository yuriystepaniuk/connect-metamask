"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "../Modal/Modal";
import s from "./Header.module.scss";
import useSound from "use-sound";
import { MetaMaskProvider } from "@metamask/sdk-react";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialActiveTab, setInitialActiveTab] = useState("login");
  const [dappUrl, setDappUrl] = useState("");
  const [play] = useSound("/assets/audio/click.mp3");

  useEffect(() => {
    setDappUrl(window.location.href);
  }, []);

  const openModal = (tab) => {
    play();
    setInitialActiveTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "test_wallet",
          url: dappUrl,
        },
      }}
    >
      <div className={s.header}>
        <div className={s.buttonGroup}>
          <button onClick={() => openModal("login")}>Login</button>
          <button onClick={() => openModal("signup")}>Register</button>
          {isModalOpen && (
            <Modal
              closeModal={closeModal}
              initialActiveTab={initialActiveTab}
            />
          )}
        </div>
      </div>
    </MetaMaskProvider>
  );
};
