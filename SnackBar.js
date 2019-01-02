import React, { Component } from "react";
import { StyleSheet, Text, Animated } from "react-native";
class SnackBar extends Component {
  constructor() {
    super();

    this.animatedValue = new Animated.Value(50);
    this.ShowSnackBar = false;
    this.HideSnackBar = true;
    this.state = {
      snackBarText: "",
      snackBarTextColor: "#fff",
      backgroundColor: "#009688",
      undoText: "",
      undoTextColor: "#FFEB3B",
      autoHideDuration: ""
    };
  }

  ShowSnackBarFunction(
    snackBarText = "Default SnackBar Message!",
    snackBarTextColor = "#fff",
    backgroundColor = "#009688",
    undoText = "UNDO",
    undoTextColor = "#FFEB3B",
    autoHideDuration = 5000
  ) {
    if (this.ShowSnackBar === false) {
      this.setState({
        snackBarText,
        snackBarTextColor,
        backgroundColor,
        undoText,
        undoTextColor
      });
      this.ShowSnackBar = true;
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 400 // pop-up animation time
      }).start(this.HideSnackBarFunction(autoHideDuration));
    }
  }

  HideSnackBarFunction = (autoHideDuration = 0) => {
    // kept zero to hide to it asap if time is not provided
    this.timerID = setTimeout(() => {
      if (this.HideSnackBar === true) {
        this.HideSnackBar = false;

        Animated.timing(this.animatedValue, {
          toValue: 50,
          duration: 400
        }).start(() => {
          this.HideSnackBar = true;
          this.ShowSnackBar = false;
          clearTimeout(this.timerID);
        });
      }
    }, autoHideDuration);
  };

  SnackBarCloseFunction = () => {
    if (this.HideSnackBar === true) {
      this.HideSnackBar = false;
      clearTimeout(this.timerID);
      Animated.timing(this.animatedValue, {
        toValue: 50,
        duration: 400
      }).start(() => {
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
      });
    }
  };

  render() {
    const {
      snackBarText,
      snackBarTextColor,
      backgroundColor,
      undoText,
      undoTextColor
    } = this.state;

    return (
      <Animated.View
        style={[
          { transform: [{ translateY: this.animatedValue }] },
          { backgroundColor, ...styles.SnackBarContainter }
        ]}
      >
        <Text
          numberOfLines={1}
          style={{
            color: snackBarTextColor,
            ...styles.SnackBarMessage
          }}
        >
          {snackBarText}
        </Text>

        <Text
          style={{
            color: undoTextColor,
            ...styles.SnackBarUndoText
          }}
          onPress={this.SnackBarCloseFunction}
        >
          {undoText}
        </Text>
      </Animated.View>
    );
  }
}

export default SnackBar;

const styles = StyleSheet.create({
  SnackBarContainter: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    left: 0,
    bottom: 0,
    right: 0,
    height: 50,
    paddingLeft: 10,
    paddingRight: 55
  },

  SnackBarMessage: {
    fontSize: 18
  },

  SnackBarUndoText: {
    fontSize: 18,
    position: "absolute",
    right: 10,
    justifyContent: "center",
    padding: 5
  }
});
