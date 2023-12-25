'use client'
import { MdStar } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";

const Examples = ({ mean }) => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      easing: 'ease-in-out', // Easing type
    });
  }, []);
    return (
      <div>
        {mean.map(val => val.meanings.map(means => means.definitions.map(def => (
          <div key={def.example}>
            {def.example ? <p className="py-2 text-[16px] font-medium text-black flex justify-start items-center gap-2"><MdStar className="text-yellow-400"/> {def.example}</p> : '' }
          </div>
        ))))}
      </div>
    );
  };
  
  export default Examples;
  