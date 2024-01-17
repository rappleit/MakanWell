import { View, Image} from "react-native";

const RewardsScreen = () => {
    return ( 
        <View style={{ width: "100%", display: "flex", alignItems: 'flex-start', justifyContent: "center", transform: "translateY(-200px)"}}>
            <Image
              style={{width: "100%", resizeMode: 'contain',} }
              source={require('../assets/RewardsScreen.png')} />
        </View>
     );
}
 
export default RewardsScreen;