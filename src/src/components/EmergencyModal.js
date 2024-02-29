import React, { useState, useEffect } from "react";
import { Modal, ModalContent, Header, Progress } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const EmergencyModal = ({ fifthOpen, setFifthOpen }) => {
  const [progress, setProgress] = useState(0);
  const [audio, setAudio] = useState(null);
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    let intervalId;
    if (fifthOpen) {
      intervalId = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
      setProgress(0); 
      if (audio) {
        audio.pause();
      }
    }

    return () => {
      clearInterval(intervalId); 
      if (audio) {
        audio.pause();
        setAudio(null); 
      }
    };
  }, [fifthOpen]);

  useEffect(() => {
    if (progress === 100) {
      const audioElement = new Audio(require('../assets/alarm.mp3'));
      audioElement.play();
      setAudio(audioElement); 
    }
  }, [progress]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <Modal
      open={fifthOpen}
      onClose={() => setFifthOpen(false)}
      closeOnEscape
      style={{ position: 'relative' }} // Add this style to ensure proper positioning of the modal content
    >
      <Header style={{ color: "red", textAlign: "center" }} content='EMERGENCY' />
      <ModalContent style={{ overflow: 'visible' }}> {/* Add overflow: visible to ensure the map container is visible */}
        <MapContainer center={[userLocation.latitude || 51.505, userLocation.longitude || -0.09]} zoom={15} style={{ height: "300px" }}> {/* Adjust height as needed */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userLocation.latitude && userLocation.longitude && (
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
              <Popup>
                Your current location.
              </Popup>
            </Marker>
          )}
        </MapContainer>
        <h2 style={{ color: "red", textAlign: "center" }}>
          You are about to set off an alarm which will cause a medical team to be dispatched to your location!
        </h2>
        <h2 style={{ color: "red", textAlign: "center", marginTop: 5 }}>
          Click outside to abort!
        </h2>
        <Progress error percent={progress} indicating></Progress>
      </ModalContent>
    </Modal>
  );
}

export default EmergencyModal;
