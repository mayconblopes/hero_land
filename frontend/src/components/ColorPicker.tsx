import { Fragment, useContext, useState } from 'react'
import { ColorResult } from 'react-color'
import { ChromePicker } from 'react-color'
import { ElementToChangeInThemeContext } from '../utils/settings'
import { ThemeContext } from '../context/ThemeContext'



export default function ColorPicker({elementToChange}: {elementToChange: ElementToChangeInThemeContext}) {
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
  const [colorPickerState, setColorPickerState] = useState({
    color: {
      hex: currentTheme[elementToChange],
    },
    visible: false,
  })

  function toggleColorPickerVisibility(){
    setColorPickerState({
            ...colorPickerState,
            visible: !colorPickerState.visible,
          })
  }

  function handleOnChangeComplete(color: ColorResult){
    setColorPickerState({...colorPickerState, color: {...color, hex: color.hex}})
    setCurrentTheme({...currentTheme, [elementToChange]: colorPickerState.color.hex})
  }

  return (
    <Fragment>
      <button
        onClick={toggleColorPickerVisibility}
      >
        Color
      </button>
      {colorPickerState.visible && (
        <div
          style={{
            position: 'absolute',
            zIndex: '2',
            left: 'auto',
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: 'auto',
              right: 'auto',
              bottom: 'auto',
              left: 'auto',
            }}
          >
            <button onClick={toggleColorPickerVisibility} >X</button>
            <ChromePicker color={colorPickerState.color.hex} onChangeComplete={handleOnChangeComplete}/>
          
          </div>
        </div>
      )}
    </Fragment>
  )
}
