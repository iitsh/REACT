import { View, Button, Alert, TouchableOpacity, Text, Pressable } from "react-native"

const Buttonsimple = () => {
    return (
        <View>
            <Button title="save" onPress={() => Alert.alert('Boutton cliqué')}/> // simple button
            <TouchableOpacity style={{backgroundColor:'cyan', padding:10, marginTop:10}} onPress={() => console.log('boutton cliqué')} > 
                <Text>click here</Text>
            </TouchableOpacity>
            <Pressable onPress={() => console.log('boutton cliqué')} onLongPress={() => console.log('Appui long ')} style={{marginTop:10, padding:10, backgroundColor:'orange'}}>
                {({pressed}) => (
                    <Text>
                        {pressed ? 'Pressed' : 'Press Me'}
                    </Text>
                )}
            </Pressable>
                    
                
        </View>
    )
}
export default Buttonsimple