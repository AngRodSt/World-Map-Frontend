import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import axios from 'axios';
import { useMemo, useEffect, useState } from 'react';
import ModalStructure from './ModalStructure';
import useCountry from '../hooks/useCountry';

const Worldmap = () => {
    const [geoData, setGeoData] = useState(null)
    const [selectedCountryName, setSelectedCountryName] = useState(null)
    const [selectedCountryCode, setSelectedCountryCode] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedColor, setSelectedColor] = useState('#fff')


    const { saveCountry, countrys, deleteCountry } = useCountry()

    const arrCountry = useMemo(() => {
        return countrys.reduce((acc, item) => {
            acc[item.country] = item.color;
            return acc;
        }, {})
    }, [countrys])


    useEffect(() => {
        async function fechData() {
            try {
                const url = 'https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson'
                const response = await axios(url);
                setGeoData(response.data)

            } catch (error) {
                console.log(error)
            }
        }
        fechData();
    }, [])


    const handleAccept = (newColor) => {
        let selectedId;
        const countryToSave = countrys.find(country => country.country === selectedCountryName)
        if (countryToSave) {
            selectedId = countryToSave._id
        }
        saveCountry({
            country: selectedCountryName,
            color: newColor,
            id: selectedId
        })
        setModalIsOpen(false)
    }

    const handleDelete = () => {
        const countryToDelete = countrys.find(country => country.country === selectedCountryName)
        if (countryToDelete) {
            const selectedId = countryToDelete._id
            deleteCountry(selectedId)
        }
        setModalIsOpen(false)
    }

    const onEachCountry = (feature, layer) => {
        layer.setStyle(getCountryStyle(feature))
        layer.on({
            click: () => {
                const countryName = feature.properties.ADMIN
                setSelectedCountryName(countryName);
                setSelectedCountryCode(feature.properties.ISO_A2);
                const country = extractCountry(countryName);
                setSelectedCountry(country);
                setModalIsOpen(true);

            }
        });
    }

    const getCountryStyle = useMemo(() => {
        return (feature) => {
            const countryName = feature.properties.ADMIN;
            const color = arrCountry[countryName] || 'transparent';

            return {
                color: color,
                weight: 1,
                fillColor: color,
                fillOpacity: color === 'transparent' ? 0 : 1
            };
        }
    }, [arrCountry])

    const extractCountry = (countryName) => {
        const country = geoData.features.find(feature => feature.properties.ADMIN === countryName);
        return country;
    }

    return (
        <>
            <div id="map" style={{ width: "100%" }}
                className=" w-[90vh] h-[80vh] overflow-hidden ">

                <MapContainer className='' center={[40.505, -0.09]} zoom={2.8} maxBounds={[[-85, -180],
                [85, 180]]} maxBoundsViscosity={1.0} scrollWheelZoom={false} style={{
                    width: "100%", height: "100%",

                }} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {geoData && <GeoJSON data={geoData} onEachFeature={onEachCountry} style={getCountryStyle} />}
                </MapContainer>

                {modalIsOpen && <ModalStructure modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} countryName={selectedCountryName} selectedContry={selectedCountry} countryCode={selectedCountryCode} selectedColor={selectedColor} setSelectedColor={setSelectedColor} onAccept={handleAccept} onDelete={handleDelete} />}
            </div>

        </>
    );
};

export default Worldmap;
