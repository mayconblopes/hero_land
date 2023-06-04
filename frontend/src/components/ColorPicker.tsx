import { Fragment, useContext, useState } from 'react'
import { ColorResult } from 'react-color'
import { ChromePicker } from 'react-color'
import { ElementToChangeInThemeContext } from '../utils/settings'
import { ThemeContext } from '../context/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFillDrip } from '@fortawesome/free-solid-svg-icons'

export default function ColorPicker({
  elementToChange,
}: {
  elementToChange: ElementToChangeInThemeContext
}) {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext)
  const [colorPickerState, setColorPickerState] = useState({
    color: {
      hex: currentTheme[elementToChange],
    },
    visible: false,
  })

  function toggleColorPickerVisibility() {
    setColorPickerState({
      ...colorPickerState,
      visible: !colorPickerState.visible,
    })
    console.log('visibilidade')
    console.log(colorPickerState)
  }

  function handleOnChangeComplete(color: ColorResult) {
    setColorPickerState({
      ...colorPickerState,
      color: { ...color, hex: color.hex },
    })
    setCurrentTheme({
      ...currentTheme,
      [elementToChange]: colorPickerState.color.hex,
    })
  }

  return (
    <Fragment>
      <button onClick={toggleColorPickerVisibility} style={{ padding: '10px' }}>
        <FontAwesomeIcon icon={faFillDrip} />
      </button>
      {colorPickerState.visible && (
        <div
          style={{
            position: 'absolute',
            zIndex: '2',
            left: '20%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 'auto',
              right: 'auto',
              bottom: 'auto',
              left: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}
          >
            <button onClick={toggleColorPickerVisibility}
            style={{padding: '10px'}}
            >
              FECHAR
            </button>
            <ChromePicker
              color={colorPickerState.color.hex}
              onChangeComplete={handleOnChangeComplete}
            />
          </div>
        </div>
      )}
    </Fragment>
  )
}
