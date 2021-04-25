import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  divContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  blue: {
    color: '#ffffff',
    backgroundColor: '#de011b',
    width: 33,
    height: 33,
    fontSize: 28,
    margin: '5px 18px'
  },
}));

function QtyCtrl(props) {
  const classes = useStyles()
  const [counter, setCounter] = useState(0)
  //console.log("Counter-", counter)

  useEffect(() => {
    setCounter(props.value)
  })

  const handleIncrement = () => {
    var qty = counter + 1
    setCounter(qty)
    props.onChange(qty)
  }
  const handleDecrement = () => {

    if (counter >= 1) {
      var qty = counter - 1
      //alert(qty)
      if (qty != 0) { setCounter(qty) }
      props.onChange(qty)
    }
  }
  return (
    <div className={classes.divContainer}>
      <Avatar className={classes.blue} onClick={() => handleDecrement()}>-</Avatar>
      <span style={{ marginTop: 11 }}>{counter}</span>
      <Avatar className={classes.blue} onClick={() => handleIncrement()}>+</Avatar>
    </div>
  )
}

export default QtyCtrl;