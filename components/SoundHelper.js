//  package: https://www.npmjs.com/package/react-native-sound
import Sound from 'react-native-sound';

export default class SoundHelper {

  static initiate(){
    Sound.setCategory('Playback', true); // true = mixWithOthers
  }

  static getSoundObject(soundFileDetails, callback){
    let filePath = soundFileDetails.path,
        url = soundFileDetails.url || false,
        isBundled = soundFileDetails.isBundled,
        immediatePlay = soundFileDetails.play,
        releaseResources = soundFileDetails.release
          || (soundFileDetails.release === undefined && soundFileDetails.play);

    callback = callback || ((error, sound) => {
      if (error) {
        console.log(error);
      } else if (immediatePlay) {
        sound.play((success) => {
          if (!success) {
            console.log('Sound did not play')
          }
          if (releaseResources) {
            sound.release();
          }
        });
      }
    });

    let sound;
    if(url){
      sound = new Sound(url, null, error => callback(error, sound));
    }
    else if(isBundled){
      sound = new Sound(filePath, Sound.MAIN_BUNDLE, error => callback(error, sound));
    }
    else{
      //  should be surrounded with require. (eg: require('./audio.mp3'))
      sound = new Sound(filePath, error => callback(error, sound));
    }
    return sound;
  }

    /***** sample *****/
    // let test1 =  SoundHelper.getSoundObject({url:'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac', play:true})
    // let test2 =  SoundHelper.getSoundObject({path:require('./resources/Beep-Error.wav'), play:true})
    /***** sample *****/
}
