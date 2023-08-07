import { View, Text, Pressable } from "react-native";

const Btn = ({ style, pressedStyle, onPress, text, textStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
          paddingVertical: 10,
          alignItems: "center",
          borderRadius: 5,
        },
        pressed ? pressedStyle : style,
      ]}
    >
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
};

//make this component available to the app
export default Btn;
