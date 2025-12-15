// styles/productStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
    backgroundColor: '#2f6f63',
    borderRadius: 28,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    width: '92%',
    alignSelf: 'center',
  },
  articleImageWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 6,
    marginRight: 14,
  },
  articleImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  articleInfo: {
    flex: 1,
    marginLeft: 16,
    alignItems: 'center',
  },
  articleHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f0fdf4',
  },
  articlePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#c2fbd7',
  },
  articleDetails: {
    fontSize: 13,
    color: '#e6f4ec',
    lineHeight: 18,
    marginBottom: 12,
    textAlign: 'center',
    width: '90%',
  },
  articleButton: {
    marginTop: 8,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  articleButtonText: {
    color: '#255b51',
    fontSize: 14,
    fontWeight: '700',
  },

  //style panier

  cartContainer: {
  marginTop: 20,
  padding: 16,
  backgroundColor: '#f9f9f9',
  borderTopWidth: 1,
  borderColor: '#ccc',
},
cartTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 8,
},
cartItem: {
  fontSize: 16,
  marginTop: 20,
},
header: {
  paddingHorizontal: 16,
  paddingVertical: 16,
  backgroundColor: '#4c8479',
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},

cartBadge: {
  marginLeft: 310,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  marginRight:-100
},

cartText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fff',
},

});
