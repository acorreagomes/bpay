import Colors from '~/constants/Colors';

export default {
  TOAST_STYLE: {
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
    width: 700,
    height: 120,
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 2,
    lines: 4,
    borderRadius: 15,
    fontWeight: 'bold',
    yOffset: 40,
  },
  BUTTON_OK: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_SUCESS,
  },
  BUTTON_CANCEL: {
    flex: 1,    
    marginVertical: 10,
    margiRight: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.COLORS.BUTTON_ERROR,
  },
  BUTTON_TEXT: {
    color: Colors.COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
};
