'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiDrinksFill, RiDrinks2Line } from 'react-icons/ri';
import { BiDrink, BiSolidDrink } from 'react-icons/bi';

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
    { id: 'Soda', icon: <BiSolidDrink />, label: 'Soda', query: 'soda' },
  ];

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
    router.push(`/category/${tab.query}`);
  };

  return (
    <div className="w-full overflow-x-auto py-4 bg-background/5 rounded-xl">
      <div className="flex justify-center gap-4 sm:gap-6 px-4 sm:px-10">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`flex flex-col items-center cursor-pointer 
              transition-all duration-300 ease-in-out px-3 py-2 font-nickysans
              ${
                activeTab === tab.id
                  ? 'text-accent bg-white/10 backdrop-blur-md rounded-xl'
                  : 'text-foreground/60 hover:text-accent'
              }
              hover:bg-white/10 hover:backdrop-blur-md hover:rounded-xl
            `}
          >
            <div className="text-xl sm:text-2xl leading-none">{tab.icon}</div>
            <div className="text-[10px] sm:text-sm mt-1 leading-none">{tab.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
