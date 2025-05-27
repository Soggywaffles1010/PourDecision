// components/TabBar.tsx
'use client';
import React, { useState } from 'react';
import { FaRegImages, FaCog, FaStar } from 'react-icons/fa'; // Import icons from react-icons

type Tab = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const TabBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('themes'); // Default active tab is 'themes'

  const tabs: Tab[] = [
    { id: 'Web Design', icon: <FaRegImages />, label: 'Web Design' },
    { id: 'Graphic Designs', icon: <FaCog />, label: 'Graphic designs' },
    { id: 'Videos', icon: <FaStar />, label: 'Videos' },
  ];

  return (
    <div className="flex justify-center space-x-[20px] px-[50px] py-4  ">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)} // Change active tab on click
          className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out
            ${activeTab === tab.id ? 'text-white' : 'text-gray-300'}
            hover:bg-white/20 hover:backdrop-blur-md hover:rounded-xl p-4 gap-2
            ${activeTab === tab.id ? 'bg-white/20 backdrop-blur-md rounded-xl' : ''}
            `}
        >
          <div className="text-3xl">{tab.icon}</div> {/* Icon */}
          <div className="text-sm">{tab.label}</div> {/* Label */}
        </div>
      ))}
    </div>
  );
};

export default TabBar;
