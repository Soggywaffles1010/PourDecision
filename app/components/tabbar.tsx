'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiDrinksFill, RiDrinks2Line } from "react-icons/ri";
import { BiDrink } from "react-icons/bi";

type Tab = {
  id: string;
  icon: React.ReactNode;
  label: string;
  query: string;
};

const TabBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Hot Drinks');
  const router = useRouter();

  const tabs: Tab[] = [
    { id: 'Hot Drinks', icon: <RiDrinksFill />, label: 'Hot Drinks', query: 'hotDrinks' },
    { id: 'Cold Drinks', icon: <RiDrinks2Line />, label: 'Cold Drinks', query: 'coldDrinks' },
    { id: 'Frappe', icon: <BiDrink />, label: 'Frappe', query: 'frappe' },
    { id: 'Soda', icon: <BiDrink />, label: 'Soda', query: 'soda' },
  ];

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
    router.push(`/category/${tab.query}`); // 👈 navigates with query
  };

  return (
    <div className="flex justify-center space-x-[20px] px-[50px] py-4">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => handleTabClick(tab)}
          className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out
            ${activeTab === tab.id ? 'text-white' : 'text-gray-300'}
            hover:bg-white/20 hover:backdrop-blur-md hover:rounded-xl p-4 gap-2
            ${activeTab === tab.id ? 'bg-white/20 backdrop-blur-md rounded-xl' : ''}
          `}
        >
          <div className="text-3xl">{tab.icon}</div>
          <div className="text-sm">{tab.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
