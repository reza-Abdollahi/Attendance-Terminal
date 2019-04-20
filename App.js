import React, {Component} from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import NumPad from './components/NumPad';
import Camera from './components/Camera';
import Commands from './components/Commands';
import FooterMessage from './components/FooterMessage';
import AppHeader from './components/AppHeader';
import AjaxHelper from './helpers/AjaxHelper';
import SoundHelper from './helpers/SoundHelper';
import Settings from './config/Settings';

type Props = {};
export default class App extends Component<Props> {
  static navigationOptions = {
      headerTitle: <AppHeader />,
  };

  constructor(props) {
      super(props);
      this.state = {
          message: { text: "لطفا کد پرسنلی را وارد نمایید" },
          employeeId: undefined,
          currentEmployeeInfo: undefined,
      };

      this.playBeep = this.playBeep.bind(this);
      this.playSuccessBeep = this.playSuccessBeep.bind(this);
      this.playErrorBeep = this.playErrorBeep.bind(this);
      this.onEmployeeIdChanged = this.onEmployeeIdChanged.bind(this);
      this.onFaceDetected = this.onFaceDetected.bind(this);
      this.registerCommand = this.registerCommand.bind(this);
      this.camera = React.createRef();
      this.takenPicture = undefined;

      this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      );
  }

  componentDidMount(){
    SoundHelper.initiate();
    this.errorSound =  SoundHelper.getSoundObject({path:require('./resources/Beep-Error.wav')});
    this.successSound =  SoundHelper.getSoundObject({path:require('./resources/Beep-Success.wav'), play:true});
    this.keyPressSound =  SoundHelper.getSoundObject({path:require('./resources/Beep-KeyPress.wav')});

    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      this.backHandler.remove()
    );
  }
  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  async getEmployee(employeeId){
      this.setState({ message: { type: "info", text: "دریافت اطلاعات پرسنلی ..." } });

      let employeeDataUrl = `/Source/EmployeeFullName/${employeeId}`;
      const employeeData = await AjaxHelper.instance.get(employeeDataUrl)
        .then(res => res.data)
        .catch(error => console.log(error));

      if (employeeData && employeeData.fullName && employeeData.fullName !== ' ') {
          employeeData.Id = employeeId;
          this.setState({
              currentEmployeeInfo: employeeData,
              message: { type: "info", text: !Settings.noFaceDetection
                ? "جستجوی چهره..."
                : "لطفا عملیات را انتخاب نمایید"
              },
          });
      } else {
          this.playErrorBeep();
          this.setState({ message: { type: "error", text: "کد پرسنلی صحیح نیست" } });
      }
  }

  playBeep() {
    this.keyPressSound.play((success) => {
      if (!success) {console.log('Sound did not play')}
    });
  }
  playSuccessBeep() {
    this.successSound.play((success) => {
      if (!success) {console.log('Sound did not play')}
    });
  }
  playErrorBeep() {
    this.errorSound.play((success) => {
      if (!success) {console.log('Sound did not play')}
    });
  }

  onEmployeeIdChanged (employeeId, isFullId) {
      this.setState({ employeeId: employeeId });
      this.onClear();
      if (!isFullId)
          return;

      this.getEmployee(employeeId);
  }

  onClear(resetEmployeeId) {
      this.setState({
          currentEmployeeInfo: undefined,
          preventCommand: false,
          message: { type: "info", text: "لطفا کد پرسنلی را وارد نمایید" }
        });
      this.takenPicture = undefined;
      this.camera.current.camera.resumePreview();
      if (resetEmployeeId)
          this.setState({ employeeId: undefined });
  }

  async registerCommand (type) {
      this.playBeep();
      var currentEmployeeInfo = this.state.currentEmployeeInfo;
      this.setState({ preventCommand: true });

      const base64img = this.takenPicture || await this.camera.current.takePicture();
      AjaxHelper.instance.post('/source/register', {
          employeeId: currentEmployeeInfo.Id,
          triggerType: type,
          imgBase64: base64img,
      })
      .then(res => {
          this.playSuccessBeep();
          var typeText = type === "in" ? "ورود" : "خروج";
          this.setState({ message: { type: "success", text: typeText + " با موفقیت ثبت شد" } });
          setTimeout(() => this.onClear(true), 4000);
      })
      .catch(error => {
          this.playErrorBeep();
          this.setState({ message: { type: "error", text: "خطا در ثبت حضور" } });
      })
  }

  async onFaceDetected(faces) {
    if (!faces || faces.length === 0 ||
        this.currentlyprocessingFaces ||
        !this.state.currentEmployeeInfo || this.takenPicture)
    { return; }

    this.currentlyprocessingFaces = faces;
    this.takenPicture = await this.camera.current.takePicture();
    this.setState({ message: { type: "info", text: "لطفا عملیات را انتخاب نمایید" } });
    this.currentlyprocessingFaces = undefined;
  }

  render() {
    const { message, employeeId, currentEmployeeInfo } = this.state;
    const faceDetectionEnabled = !Settings.noFaceDetection;
    const shouldDetectFaces = faceDetectionEnabled && !this.takenPicture;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.appMain}>
              <View style={styles.appMainCenter}>
                <View style={styles.rightCol}>
                  <NumPad onEmployeeIdChanged={this.onEmployeeIdChanged} value={employeeId} playBeep={this.playBeep}/>
                  <Commands onClick={this.registerCommand} detectFaces={shouldDetectFaces} {...this.state}/>
                </View>
                <View style={styles.leftCol}>
                  <Camera ref={this.camera} detectFaces={faceDetectionEnabled} onFaceDetected={this.onFaceDetected}/>
                </View>
              </View>
            </View>
            <View style={styles.appFooter}>
              <FooterMessage message={message} employeeInfo={currentEmployeeInfo}/>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({

    mainContainer:{
      flex: 1,
    },
    appMain: {
      flex: 1,
    },
    appMainCenter:{
      flex: 1,
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-around',

      backgroundColor: '#aaa',
    },
    appFooter: {
        justifyContent: 'flex-start',
        flexDirection: 'row-reverse',
        paddingTop: 5,
        paddingRight: 10,
        backgroundColor: '#364653',
    },
    leftCol:{
      width:'60%',
      height:'60%',
    },
    rightCol:{
      width:'30%',
      minWidth:300,
    },
});
