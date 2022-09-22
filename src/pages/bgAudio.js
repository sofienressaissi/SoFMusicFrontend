import React from "react";
import ReactAudioPlayer from "react-audio-player";
import Sound from "../mp3BG/Heart_Aching_By_SoF.mp3";

export default function Audio() {

    return (
          <ReactAudioPlayer
            src={Sound}
            autoPlay
            loop
        />
    );

}