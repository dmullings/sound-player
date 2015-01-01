/** @namespace SOUND_PLAYER */
(function(SOUND_PLAYER){
	"use strict";

	var sounds = {},	//object to store the collection of sounds clips
		ac,				//audio context
		gainNode;

	/**
	 * Represents a playable sound clip
	 *
	 * @param {string} source - path to the sound clip
	 * @constructor
	 */
	function Sound(source) {
		var that = this;
		that.buffer = null;
		that.isLoaded = false;
		this.init();	//create the audio context if needed

		var getSound = new XMLHttpRequest();
		getSound.open("GET", source, true);
		getSound.responseType = "arraybuffer";
		getSound.onload = function () {
			ac.decodeAudioData(getSound.response, function (buffer) {
				that.buffer = buffer;
				that.isLoaded = true;
			});
		};
		getSound.send();
	}

	/**
	 * Initialization function used to create the audio context and gain node if one doesn't already exist
	 */
	Sound.prototype.init = function () {
		if (!ac) {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			ac = new window.AudioContext();
			gainNode = ac.createGain();
			gainNode.gain.value = 0;
		}
	};

	/**
	 * function used to play the sound clip
	 */
	Sound.prototype.play = function () {
		if (this.isLoaded) {
			var playSound = ac.createBufferSource();
			playSound.buffer = this.buffer;
			playSound.connect(gainNode);
			gainNode.connect(ac.destination);
			playSound.start(0);
		}
	};

	//////////////////// EXPOSED PUBLIC METHODS //////////////////////////////////

	/**
	 * addSound - adds a sound clip to the object of playable sounds
	 * @param {string} id - unique id of the sound clip
	 * @param {string} source - the path of the sound clip
	 */
	SOUND_PLAYER.addSound = function(id,source){
		sounds[id] = new Sound(source);
	};

	/**
	 * playSound - play the specified sound clip
	 * @param id
	 */

	SOUND_PLAYER.playSound = function(id){
		sounds[id].play();
	};

	/**
	 * getSoundCount - retrieves the current number of playable sounds
	 * @returns {Number}
	 */
	SOUND_PLAYER.getSoundCount = function(){
		return Object.keys(sounds).length;
	};

	/**
	 * getVolume - retrieves the current volume level
	 * @returns {Number}
	 */
	SOUND_PLAYER.getVolume = function(){
		return gainNode.gain.value;
	};

	/**
	 * setVolume - set the volume of the sound player
	 * @param {Number} volume - value between 0 and 1
	 */
	SOUND_PLAYER.setVolume = function(volume){
		gainNode.gain.value = volume;
	};

	return SOUND_PLAYER;

})(window.SOUND_PLAYER = window.SOUND_PLAYER || {}, undefined);