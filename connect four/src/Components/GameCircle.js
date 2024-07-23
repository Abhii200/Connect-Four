const GameCircle = ({ id, onCircleClicked, className, children }) => { // Change 'oncircleClicked' to 'onCircleClicked'

  const onClick = (ev) => {
    if (typeof onCircleClicked === 'function') {
      onCircleClicked(id); // Invoke onCircleClicked function with id as argument
    }
  }

  return (
    <div className={`gameCircle ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default GameCircle;
