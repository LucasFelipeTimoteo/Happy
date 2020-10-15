import React from 'react';
import { Link } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import { FiArrowRight, FiPlus } from 'react-icons/fi';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanagesMap.css';

import happyMapIcon from '../utils/mapIcon';


export default function OrphanagesMap() {
    return (
        <div id="page-map">

            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas criaças estão esperando sua visita</p>
                </header>

                <footer>
                    <strong> Osasco </strong>
                    <span> São Paulo </span>
                </footer>
            </aside>

            <Map
                center={[-23.5324357, -46.7788003]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker
                    icon={happyMapIcon}
                    position={[-23.5324357, -46.7788003]}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                        <Link to="orphanages/1">
                            <FiArrowRight size={20} color="#FFF" />
                        </Link>
                        Lar das Meninas
                    </Popup>
                </Marker>
            </Map>

            <Link to="orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    );
}