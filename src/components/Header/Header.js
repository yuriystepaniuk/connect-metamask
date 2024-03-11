"use client";
import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import s from './Header.module.scss'
import useSound from "use-sound";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialActiveTab, setInitialActiveTab] = useState('login'); 
const [play] = useSound('/assets/audio/click.mp3');

  const openModal = (tab) => {
    play()
    setInitialActiveTab(tab)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={s.header}>
      <div className={s.buttonGroup}>
        <button onClick={() => openModal('login')}>Login</button>
        <button onClick={() => openModal('signup')}>Register</button>
        {isModalOpen && <Modal closeModal={closeModal} initialActiveTab={initialActiveTab}/>}
      </div>
    </div>
  );
};
