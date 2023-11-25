import React, { ReactElement } from 'react';

import MarketPlaceUserContext from '@/app/context/MarketPlaceUserContext';

interface ContextWrapperProps {
  children: ReactElement;
}

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  return <MarketPlaceUserContext>{children}</MarketPlaceUserContext>;
};

export default ContextWrapper;
