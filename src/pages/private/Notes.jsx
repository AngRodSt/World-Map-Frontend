
import useWorldMap from "../../hooks/useWorldMap"
import Note from "../../components/NoteBody"
import { useEffect, useState } from "react"
import axios from "axios"


const Notes = () => {
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
        <section className="grid xl:grid-cols-5 font-bold lg:grid-cols-3 md:grid-cols-2  grid-cols-1 m-10 gap-5 ">
          {selectedFilter.country !== '' || selectedFilter.date !== ''
            ? (notesFiltered.length > 0
              ? notesFiltered.map((note, index) => <Note key={index} note={note} />)
              : !charging && <p>Doesn't exist notes with this filter</p>)
            : notes.map((note, index) => <Note key={index} note={note} />)
          }
        </section>
      </main>
    </>
  )


}
export default Notes