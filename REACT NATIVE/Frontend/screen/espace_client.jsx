import { View, Text } from "react-native"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Espace_client = () => {
    const {user, setUser} = useContext(UserContext);

    return (
        <View>
            <Text>Nom : {user?.Nom ?? ''}</Text>
            {console.log(user?.Nom ?? '')}
        </View>
        )
}

