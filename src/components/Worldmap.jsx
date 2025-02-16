import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import axios from 'axios';
import { useMemo, useEffect, useState } from 'react';
import ModalStructure from './ModalStructure';
import useWorldMap from '../hooks/useWorldMap';

const Worldmap = () => {
    const [geoData, setGeoData] = useState(null)
    const [selectedCountryName, setSelectedCountryName] = useState(null)
    const [selectedCountryCode, setSelectedCountryCode] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedColor, setSelectedColor] = useState('#fff')


    const { saveCountry, countrys, deleteCountry } = useWorldMap()

    const arrCountry = useMemo(() => {
        return countrys.reduce((acc, item) => {
            acc[item.country] = item.color;
            return acc;
        }, {})
    }, [countrys])


    useEffect(() => {
        async function fechData() {
            try {
                const response = await axios('/world.geojson');
                setGeoData(response.data)

            } catch (error) {
                console.log(error)
            }
        }
        fechData();
    }, [])



    const handleAccept = (newColor) => {
        let selectedId = null
        for (let i = 0; i < countrys.length; i++) {
            if (countrys[i].country === selectedCountryName) {
                selectedId = countrys[i]._id
                break;
            }
        }
        saveCountry({
            country: selectedCountryName,
            color: newColor,
            id: selectedId
        })
        setModalIsOpen(false)
    }

    const handleDelete = () => {
        let selectedId = null
        for (let i = 0; i < countrys.length; i++) {
            if (countrys[i].country === selectedCountryName) {
                selectedId = countrys[i]._id
                deleteCountry(selectedId)
                break;
            }

        }
        setModalIsOpen(false)
    }

    const onEachCountry = (feature, layer) => {

        const countryName = feature.properties.ADMIN

        layer.setStyle(getCountryStyle(feature))


        layer.on({
            click: () => {
                setSelectedCountryName(countryName);
                setSelectedCountryCode(feature.properties.ISO_A2);
                const country = extractCountry(countryName);
                setSelectedCountry(country);
                setModalIsOpen(true);

            }
        });
    }

    /*
    * useMemo memoizes getCountryStyle to prevent unnecessary recalculations.
    */
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

    const bounds = [
        [-85, -180],
        [85, 180]
    ];

    return (
        <>
            <div id='map' className='' style={{ width: "100%", height: "50rem" }}>
                <MapContainer className='' center={[40.505, -0.09]} zoom={2.8} maxBounds={bounds} maxBoundsViscosity={1.0} scrollWheelZoom={false} style={{
                    width: "100%", height: "100%",
                    boxShadow: ""
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