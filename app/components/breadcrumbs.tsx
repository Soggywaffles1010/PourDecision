// components/Breadcrumbs.tsx
'use client';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa'; // Icon for separating breadcrumbs

type Breadcrumb = {
  label: string;
  link: string;
};

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div className="flex items-center gap-2 mx-[215px] rounded-xl backdrop-blur-md">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.link}>
          {/* If it's not the last breadcrumb, show separator */}
          <a
            href={breadcrumb.link}
            className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
          >
            {breadcrumb.label}
          </a>
          {index < breadcrumbs.length - 1 && (
            <FaChevronRight className="text-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
