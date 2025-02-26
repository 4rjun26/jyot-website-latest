import React from "react";
import SoundPlayer from "@/components/index_page_components/SoundPlayer";
export default function Sound(){
    return(
        <>
            <SoundPlayer src={'/sample_sound.mp3'} />
        </>
    );
}