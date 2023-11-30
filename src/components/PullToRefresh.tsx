'use client';
import React from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
type PropsType = {
  children: React.ReactElement;
};

const PullRefresh = ({ children }: PropsType) => {
  const refreshHandler = async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        window.location.href = '/';
        resolve;
      }, 2000);
    });
  };

  return (
    <div>
      <PullToRefresh
        onRefresh={refreshHandler}
        pullDownThreshold={67}
        maxPullDownDistance={95}
      >
        {children}
      </PullToRefresh>
    </div>
  );
};

export default PullRefresh;
