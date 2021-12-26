import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginVertical: 5,
    borderRadius: 10,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'OpenSans-Regular',
    color: '#888',
    fontSize: 16,
  },

  mainText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
