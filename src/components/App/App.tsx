import { useState} from 'react';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import fetchNotes from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox'
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

 
 
const PER_PAGE = 12;

   
function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  

   const handleSeaarch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setCurrentPage(1); 
  }, 300);


 const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const { data, isLoading, isError} = useQuery({
    queryKey: ['notes', currentPage, searchValue],
     queryFn: () => fetchNotes(currentPage, PER_PAGE, searchValue),
    placeholderData: keepPreviousData,

  })
   

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

 

  return (
   <div className={css.app}>
      <header className={css.toolbar}>
		   <SearchBox value={searchValue} onChange={handleSeaarch} />
		  {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={currentPage}   
          onPageChange={(selectedPage) => setCurrentPage(selectedPage)} // 
        />
      )}
		<button className={css.button} onClick={openModal}>Create note +</button>

      </header>
     {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && notes.length > 0 && (
        <NoteList notes={notes} />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm  onClose={closeModal}/>
        </Modal>
      )}
       
</div>
  )
}

export default App
