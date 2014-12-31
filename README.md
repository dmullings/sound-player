soundPlayer
===========

A simple wrapper for playing sounds using the Web Audio API

## Usage

    //adding sounds
    SOUND_PLAYER.addSound("sound1", "path_to_sounds/sound1.wav");
    SOUND_PLAYER.addSound("sound2", "path_to_sounds/sound2.wav");
    
    //play a sound
    SOUND_PLAYER.playSound("sound1");
    //play another sound
    SOUND_PLAYER.playSound("sound2");
    
    //set the volume level
    SOUND_PLAYER.setVolume(this.dataset.volume);
    
    //get the current volume level
    var v olume = SOUND_PLAYER.getVolume();
