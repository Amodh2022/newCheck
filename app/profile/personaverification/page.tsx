'use client'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { callApi } from '../../_actions/personaupdateapi';
// import { useRouter } from 'next/router'; // Import useRouter from 'next/router'
// import Persona from 'persona' // Use dynamic import for Persona

const InlineInquiry = () => {
  // const router = useRouter();
  const [myuserId, setMyuserId] = useState<string | null>(null);

  useEffect(() => {
    // Check if window is defined before using localStorage
    if (typeof window !== 'undefined') {
      const userIdFromStorage = localStorage.getItem('userId');
      if (userIdFromStorage) {
        setMyuserId(userIdFromStorage);
      }
    }
  }, []);

  const handleComplete = async ({ inquiryId, status, fields }: any) => {
    try {
      if (status === 'completed') {
        // await callApi(inquiryId, myuserId);
        // router.push('/profile');
      }
    } catch (e) {
      console.error("Error in handleComplete:", e);
      throw Error(e);
    }
  };

  return (
    <div className='h-screen flex justify-center'>
      
    </div>
  );
};

export default InlineInquiry;
