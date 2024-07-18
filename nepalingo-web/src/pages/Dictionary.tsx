import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Header from '../components/header/Header';
import ViewDictionary from '../components/View_Dictionary/ViewDictionary';

const Dictionary: React.FC = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
      title: 'Dictionary page',
    });
  }, []);

  return (
    <>
      <Header />
      <ViewDictionary />
    </>
  );
};

export default Dictionary;
