import { View } from "react-native";

const MapDouble = () => {
    
    const nombres = [1, 2, 3, 4, 5];
    const doubles = nombres.map(
        (nombre) => { return nombre * 2; 

        }
    );
    return (
        <View style={{marginTop:250, marginLeft:20}}>
            {console.log(doubles)}
            </View> )
}
export default MapDouble;