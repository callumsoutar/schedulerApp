// Update the grid positioning calculation
const getGridPosition = (startHour: number, endHour: number) => {
  // Adjust for 8 AM start (8 - 8 = 0 for first column)
  const gridStart = startHour - 8;
  const duration = endHour - startHour;
  
  // Calculate percentage positions for precise placement
  const startPercentage = (gridStart / 12) * 100;
  const widthPercentage = (duration / 12) * 100;

  return {
    left: `${startPercentage}%`,
    width: `${widthPercentage}%`
  };
};

// Update the JSX to use the new positioning
const position = getGridPosition(startHour, endHour);

return (
  <>
    <div
      className={`absolute inset-y-1 rounded-md overflow-hidden text-white text-xs p-1.5 cursor-pointer ${getStatusColor()}`}
      style={{
        left: position.left,
        width: position.width,
        zIndex: 10,
      }}
      ref={blockRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="font-medium truncate">{memberName}</div>
      {booking.status !== 'confirmed' && (
        <div className="text-xs opacity-75 truncate">
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </div>
      )}
    </div>

    {showHoverModal && (
      <BookingHoverModal
        booking={booking}
        position={modalPosition}
        onMouseEnter={() => setShowHoverModal(true)}
        onMouseLeave={handleMouseLeave}
      />
    )}
  </>
);