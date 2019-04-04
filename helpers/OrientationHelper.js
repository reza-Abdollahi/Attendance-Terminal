import { Dimensions } from 'react-native';

export default class OrientationHelper {

  static getScreenInfo() {
      const dim = Dimensions.get('window');
      return dim;
  }

  static isPortrait() {
      const dim = this.getScreenInfo();
      return dim.height >= dim.width;
  };
  static isLandscape() {
      const dim = this.getScreenInfo();
      return dim.width >= dim.height;
  };

  static bindScreenDimensionsUpdate(component) {
      const setDimentions = () => {
          try{
              const { height, width } = this.getScreenInfo();
              component.setState({
                  orientation: this.isPortrait() ? 'portrait' : 'landscape',
                  screenWidth: width,
                  screenHeight: height
              });
          }catch(e){
              // Fail silently
          }
      };
      Dimensions.addEventListener('change', setDimentions);
      setDimentions();
  }

  static selectStyle(obj){
    const styles = this.isPortrait()
      ? obj["portrait"]
      : obj["landscape"]
    return styles || {};
  }
}
