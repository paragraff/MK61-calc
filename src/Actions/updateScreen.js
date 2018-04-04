export const updateScreen = (screen, dots, bright) => ({
  type: 'SCREEN_STATE_UPDATE',
  payload: {
    digits: screen,
    dots: dots,
    bright: bright,
  }
})