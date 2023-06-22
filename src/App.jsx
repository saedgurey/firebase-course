import React, { useEffect, useState } from 'react'
import Auth from './components/Auth'
import { auth, db, storage } from './firebase';
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';



const App = () => {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("0");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState("false");
  const [updatedTitle, setUpdatedTitle] = useState("false");
  const [fileUpload, setFileUpload] = useState(null);




  const MovieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {

    try {
      const data = await getDocs(MovieCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData)

    } catch (err) { console.log(err) }

  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };


  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };


  


  useEffect(() => {
    getMovieList()
  }, [])

  const onSubmitMovie = async () => {

    try {
      await addDoc(MovieCollectionRef, {
        title: newMovieTitle,
        releaseData: newReleaseDate,
        recievedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      })

      getMovieList()

    } catch (err) {
      console.log(err)
    }

  }



  return (
    <div>
      <Auth />

      <div style={{ paddingTop: 20 }}>
        <input
          onChange={(e) => setNewMovieTitle(e.target.value)}
          placeholder='movie title' />


        <input
          onChange={(e) => setNewReleaseDate(e.target.value)}
          type="number"
          placeholder='relese Data' />

        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />

        <label> recieved an oscar</label>
        <button onClick={onSubmitMovie}> Submit Movie</button>
      </div>
      <div>
        {movieList.map(movie => (
          <div>
            <h1 style={{ color: movie.recievedOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>data:{movie.releaseData}</p>
            <p>{movie.recievedOscar}</p>


            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

            <input
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />

            <button onClick={() => updateMovieTitle(movie.id)}>
              {" "}
              Update Title
            </button>
          </div>
        ))}
      </div>
    </div >
  )
}

export default App