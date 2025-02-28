
import useWorldMap from "../../hooks/useWorldMap"
import Note from "../../components/NoteBody"
import { useEffect, useState } from "react"
import axios from "axios"
import ReactPaginate from 'react-paginate'


export default function Notes() {
  const { notes, filterNotes, notesFiltered } = useWorldMap()
  const [countries, setCountries] = useState([])
  const [selectedFilter, setSelectedFilter] = useState({
    country: '',
    date: ''
  })
  const [charging, setCharging] = useState(false)

  useEffect(() => {
    async function fechData() {
      const countries = new Set()
      try {
        const url = 'https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson'
        const response = await axios(url);
        let geoData = response.data.features
        for (let feature in geoData) {
          countries.add(geoData[feature].properties.ADMIN)
        }
        const arrCountry = Array.from(countries)
        setCountries(arrCountry.sort())

      } catch (error) {
        console.log(error)
      }
    }
    fechData();
  }, [])


  useEffect(() => {
    const fillFilter = async () => {
      setCharging(true)
      try {
        if (selectedFilter.country || selectedFilter.date) {
          await filterNotes(selectedFilter)
        }
      } catch (error) {
        console.log(error)
      }
      setCharging(false)

    }
    fillFilter()

  }, [selectedFilter, notes])


  return (
    <>
      <main className="mt-10">
        <div className="bg-amber-400 p-2   rounded-lg shadow-xl flex  m-10 flex-col">
          <label htmlFor="countryFilter" className="font-bold mb-3">Filter By </label>
          <section className="flex gap-2 flex-col sm:flex-row">
            <div className="flex ">
              {countries && <select name="countryFilter" value={selectedFilter.country || ""} id="countryFilter" onChange={(e) => { setSelectedFilter({ ...selectedFilter, country: e.target.value }) }} className=" p-2 rounded-md w-full max-w-50  ">
                <option disabled value=''>Countrys</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>}
              {selectedFilter.country && <button className=" font-bold m-2 px-2 rounded-full bg-blur-md bg-red-500 hover:bg-red-700" onClick={() => setSelectedFilter({ ...selectedFilter, country: '' })}>X</button>}

            </div>
            <div className="flex">
              <input value={selectedFilter.date} type="date" name="dateFilter" id="dateFilter" className="p-2 rounded-md w-full max-w-50 " onChange={(e) => setSelectedFilter({ ...selectedFilter, date: e.target.value })} />
              {selectedFilter.date && <button className=" font-bold m-2 px-2 rounded-full bg-blur-md bg-red-500 hover:bg-red-700" onClick={() => setSelectedFilter({ ...selectedFilter, date: '' })}>X</button>}
            </div>
          </section>

        </div>
        
          {selectedFilter.country !== '' || selectedFilter.date !== ''
            ? (notesFiltered.length > 0
              ? (<Paginator notes={notesFiltered} />) 
              : !charging && <p className="m-10 font-bold">Doesn't exist notes with this filter</p>)
            : (<Paginator notes={notes} />) }
      </main>
    </>
  )
}

const Paginator = ({ notes }) => {

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((note, index) => (
            <Note key={index} note={note} />
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = notes.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(notes.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % notes.length;

      setItemOffset(newOffset)
    }

    return (
      <>
        <section className="grid xl:grid-cols-5 font-bold lg:grid-cols-3 md:grid-cols-2  grid-cols-1 m-10 gap-5 ">
          <Items currentItems={currentItems} /> 
        </section>
        <ReactPaginate
          breakLabel='...'
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel='< previous'
          renderOnZeroPageCount={null}
          pageClassName=" p-2 border-2 border-amber-400 hover:scale-105 transition-all ease-in-out duration-200 font-bold"
          pageLinkClassName=" p-2"
          previousClassName="border-2 border-amber-400 p-2 hover:scale-105 transition-all ease-in-out duration-200 font-bold"
          previousLinkClassName=" p-2 "
          nextClassName=" p-2 border-2 border-amber-400 hover:scale-105 transition-all ease-in-out duration-200 font-bold"
          nextLinkClassName=" p-2 "
          breakClassName="bg-blue-200"
          breakLinkClassName=""
          containerClassName="flex justify-center items-center  pb-10 "
          activeClassName="active bg-amber-400"
        />
      </>
    )
  }

  return (
    <>
      <div>
        <PaginatedItems itemsPerPage={15} />
      </div>

    </>)

}
