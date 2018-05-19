import React from 'react';

function Screen(props) {
  const sign = props.value[0]
  const mantissa = props.value.substr(1, 16)
  const exponentSign = props.value.substr(17, 1)
  const exponent = props.value.substr(18, 4)

  let screenDigits = []
  screenDigits[0] = {value: sign !== '-' ? '&nbsp;' : sign, dot: false}

  for (let i = 0; i < mantissa.length; i += 2) {
    screenDigits.push({value: mantissa[i] !== 'd' ? mantissa[i] : '&nbsp;', dot: mantissa[i+1] !== 's'})
  }

  screenDigits.push({value: exponentSign !== '-' ? '&nbsp;' : exponentSign, dot: false})

  for (let i = 0; i < exponent.length; i += 2) {
    screenDigits.push({value: exponent[i] !== 'd' ? exponent[i] : '&nbsp;', dot: exponent[i+1] !== 's'})
  }

  const resultScreen = screenDigits.reduce((result, digit) => {
    result += `${digit.value}${digit.dot ? '.' : ''}`
    return result;
  }, '')
  return (
    <div className={props.className} dangerouslySetInnerHTML={{__html: resultScreen}}></div>
  );
}

export default Screen;
