"use client";
import React, { useState } from "react";
import { Modal } from "../Modal/Modal";
import { playSound } from "@/app/util/playSound";
import s from './Header.module.scss'

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialActiveTab, setInitialActiveTab] = useState('login'); 
  
  const openModal = (tab) => {
    playSound()
    setInitialActiveTab(tab)
    setIsModalOpen(true);
  };

  const closeModal = () => { playSound()
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
