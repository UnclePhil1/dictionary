import { useState } from 'react';
import Modal from '@/components/modal';
import { motion } from 'framer-motion';

const SearchedMeaningList = ({ mean }) => {
  const [selectedMeaning, setSelectedMeaning] = useState(null);

  const openModal = (meaning) => {
    setSelectedMeaning(meaning);
  };

  const closeModal = () => {
    setSelectedMeaning(null);
  };

  return (
    <div>
      <div className="hover:bg-slate-100 transition p-4 mb-4">
      {mean.map((val) =>
        val.meanings.map((means) =>
          means.definitions.slice(0, 2).map((def) => (
            <motion.div
              key={def.definition}
              className="meaning-container"
              onClick={() => openModal(def)}
            >
              <p className="py-2 text-[20px] font-medium text-black">
                {def.definition}
              </p>
            </motion.div>
          ))
        )
      )}
      </div>

      <Modal isOpen={selectedMeaning !== null} onClose={closeModal}>
        {selectedMeaning && (
          <div>
            <h1 className="text-[2em] font-bold mt-4 text-backbg">
              All Meanings:
            </h1>
            <hr />
            <div className='pt-4'>
              {mean
                .flatMap((val) =>
                  val.meanings.flatMap((means) =>
                    means.definitions.map((def) => (
                      <p key={def.definition}>{def.definition}</p>
                    ))
                  )
                )
                .map((meaning) => (
                  <p key={meaning} className='text-[20px] py-4'>{meaning}</p>
                ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchedMeaningList;
