import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, Animated, StatusBar, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font'
import { Audio } from 'expo-av'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { GlobalContext, GlobalProvider } from './providers/GlobalProvider';



const Home = () => {
  const hpShield = require('./assets/hpShield.png')
  const context = React.useContext(GlobalContext)
  const { currentHouse, customFonts, bgSound } = context
  const translateX = React.useRef(new Animated.Value(-150)).current
  const translateY = React.useRef(new Animated.Value(-85)).current


  console.log(translateX, translateY)

  async function _loadFontsAsync() {
    await Font.loadAsync( customFonts.hpFont )
    customFonts.setFontLoaded(true)
  }


  React.useEffect(()=> {

    async function loadFont() {
      await _loadFontsAsync()
      
    }

    loadFont()

      
  }, [])



  React.useEffect(()=> {
    
    async function loadSound() {
      try {
        if (!bgSound.sound) {
          const { sound } =  await Audio.Sound.createAsync(
            require('./assets/sounds/hp_theme.mp3'),
            {
              shouldPlay: true,
              isLooping: true,
              volume: 0.1
            }
          )
  
          bgSound.setSound(sound)
          bgSound.setPlaying(true)
          bgSound.setSoundIcon(bgSound.volumeIcon.on)
        }      
      }
      catch(err) {
        console.error(err)
      } 
    }
    loadSound()

    return bgSound.sound ? ()=> {
      bgSound.sound.unloadAsync()
    } : null
  }, [bgSound.sound])

  const toggleSound = async ()=> {

    const turnOff = async () => {
      bgSound.setSoundIcon(bgSound.volumeIcon.off)
      bgSound.setPlaying(false)
      await bgSound.sound.pauseAsync()
    }

    const turnOn = async () => {
      bgSound.setSoundIcon(bgSound.volumeIcon.on)
      bgSound.setPlaying(true)
      await bgSound.sound.playAsync()
    }

    if (bgSound.playing) {
      await turnOff()
    }
    else {
      await turnOn()
    }


  }


  const selectHouse = ( house )=> {
    currentHouse.setSelectedHouse(house)
  }

  if (!customFonts.fontLoaded) {
    return (
      <View style={{ flex: 1}}>
        <ImageBackground source={require('./assets/hpbg.jpg')} resizeMode='cover' style={styles.imageBg}>
          <ActivityIndicator size={40} color='#fff'/>
        </ImageBackground>
      </View>
    )
  }

  return (!currentHouse.selectedHouse) ?  (
    <View style={ { flex: 1}}>
      <ImageBackground source={require('./assets/hpbg.jpg')} resizeMode='cover' style={styles.imageBg} style={{ flex: 1, justifyContent: 'space-evenly'}}>
        <Text style={{ fontSize: 60, color: '#fff', textAlign: 'center', fontFamily: 'hp'}}>
          Choose Your House
        </Text>
        <Image source={ hpShield } style={{width: '100%', height: '50%'}} />
        <Icon.Button name={bgSound.soundIcon} size={32}  backgroundColor={'transparent'} 
        style={{ justifyContent: 'center'  }} onPress={toggleSound} />
      </ImageBackground>
      <Animated.View style={{ flexDirection: 'row', flexWrap: 'wrap', position: 'absolute',  height: '30%', width: '70%', top: '50%', left: '50%', transform: [{translateX: translateX}, {translateY: translateY}]}}>
            <View style={{ width: '50%', height: '50%'}}>
              <TouchableOpacity onPress={()=> selectHouse('gryffindor')} style={{ width: '100%', height: '100%'}}>
              </TouchableOpacity>
            </View>  
            <View style={{ width: '50%', height: '50%'}}>
              <TouchableOpacity onPress={()=> selectHouse('slytherin')} style={{ width: '100%', height: '100%'}}>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', height: '50%'}}>
              <TouchableOpacity onPress={()=> selectHouse('hufflepuff')} style={{ width: '100%', height: '100%'}}>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', height: '50%'}}>
              <TouchableOpacity onPress={()=> selectHouse('ravenclaw')} style={{ width: '100%', height: '100%'}}>
              </TouchableOpacity>
            </View>
      </Animated.View>
      
    </View>
  ) : (
    <HousePage />
  )
}

const HousePage = () => {
  const context = React.useContext(GlobalContext)
  const { currentHouse } = context
  return (
    <View>
      <Text>{ currentHouse.selectedHouse } </Text>
      <TouchableOpacity onPress={()=> currentHouse.setSelectedHouse('')}>
        <Text>
          Home
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
    return (
      <>
        <StatusBar>
        </StatusBar>
        <GlobalProvider>
          <Home />
        </GlobalProvider>
      </>
    )
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: 'center',
  }
});
