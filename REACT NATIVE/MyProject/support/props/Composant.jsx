import { View, Text } from "react-native"

const Composant = (props) => {
    return (
            <View style={{marginTop: 250}}>
                <Text>{props.message}</Text>
            </View>
    )
}
export default Composant