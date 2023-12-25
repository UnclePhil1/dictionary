import React, { useContext, useState, useEffect } from 'react';
import { InputContext } from '@/app/page';
import Examples from './components/examples';
import SearchedMeanigList from './components/meaning';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { TailSpin } from 'react-loader-spinner';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

axios.defaults.baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const Results = () => {
  const { inputValue } = useContext(InputContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

  const fetchData = async (param) => {
    try {
      setLoading(true);
      const res = await axios(`/${param}`);
      setResponse(res.data);
      setError(null);

      // Save the searched word to local storage
      const searchedWords = JSON.parse(localStorage.getItem('searchedWords')) || [];
      searchedWords.unshift(param);
      localStorage.setItem('searchedWords', JSON.stringify(searchedWords));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue);
    }
  }, [inputValue]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 container mx-auto bg-slate-50 rounded-lg p-8 h-full w-full">
        <TailSpin type="TailSpin" color="#4F46E5" height={80} width={80} className="bg-slate-50" />
      </div>
    );
  }

  if (error) {
    return (
      <h3 className="text-center my-0 mx-auto font-semibold text-gray-500 text-[1.5em] md:text-[2em]">
        No Definitions Found 😥
      </h3>
    );
  }

  return (
    <div className="bg-slate-50 rounded-lg p-4 md:p-8 h-full w-[100%] md:w-[70%] overflow-y-auto overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="result-container"
      >
        <motion.div variants={item} className="result-item">
          {response && (
            <div>
              <h1 className="text-[2em] font-bold mt-4 text-primary">
                Meaning & Definitions:
              </h1>
              <SearchedMeanigList mean={response} />
              <h1 className="text-[2em] font-bold mt-4 text-primary">
                Examples:
              </h1>
              <Examples mean={response} />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Results;
