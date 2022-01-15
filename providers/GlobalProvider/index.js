import React from 'react'
import { houses } from '../../data/houses'

export const GlobalContext = React.createContext({})

export const GlobalProvider = ({ children } ) => {
  const [selectedHouse, setSelectedHouse] = React.useState('')
  const [fontLoaded, setFontLoaded] = React.useState(false)
  const [sound, setSound] = React.useState()
  const [playing, setPlaying] = React.useState(false)
  const volumeIcon = {on: 'volume-up', off: 'volume-off' }
  const [soundIcon, setSoundIcon] = React.useState(volumeIcon.on)


  return (
    <GlobalContext.Provider value={{
    ...houses,
    currentHouse: {
      selectedHouse, setSelectedHouse
    },
    customFonts: {
      hpFont: {
        'hp':require('../../assets/fonts/harrypfont.ttf'),
      },
      fontLoaded: fontLoaded,
      setFontLoaded: setFontLoaded
    },
    bgSound: {
      sound: sound,
      setSound: setSound,
      playing: playing,
      setPlaying: setPlaying,
      soundIcon: soundIcon,
      setSoundIcon: setSoundIcon,
      volumeIcon: volumeIcon
    }
  } 
}>
      { children }
    </GlobalContext.Provider>
  )
}