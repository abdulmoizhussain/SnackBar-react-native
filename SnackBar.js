import React, { Component } from "react";
import { StyleSheet, Text, Animated } from "react-native";
// required:
// autoHideDuration
// default:
// color
// text
// undo/hide text
class SnackBar extends Component {
  constructor() {
    super();

    this.animatedValue = new Animated.Value(50);
    this.ShowSnackBar = false;
    this.HideSnackBar = true;
    this.state = {
      SnackBarInsideMsgHolder: "",
      UndoMessage: ""
    };
  }

  ShowSnackBarFunction(
    SnackBarInsideMsgHolder = "Default SnackBar Message...",
    UndoMessage = "UNDO",
    duration = 5000
  ) {
    if (this.ShowSnackBar === false) {
      this.setState({ SnackBarInsideMsgHolder, UndoMessage });

      this.ShowSnackBar = true;

      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 400 // pop-up animation duration
      }).start(this.HideSnackBarFunction(duration));
    }
  }

  HideSnackBarFunction = (hidingAnimationDuration = 0) => {
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
    }, hidingAnimationDuration);
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
    return (
      <Animated.View
        style={[
          { transform: [{ translateY: this.animatedValue }] },
          styles.SnackBarContainter
        ]}
      >
        <Text numberOfLines={1} style={styles.SnackBarMessage}>
          {this.state.SnackBarInsideMsgHolder}
        </Text>

        <Text
          style={styles.SnackBarUndoText}
          onPress={this.SnackBarCloseFunction}
        >
          {this.state.UndoMessage}
        </Text>
      </Animated.View>
    );
  }
}

export default SnackBar;

const styles = StyleSheet.create({
  SnackBarContainter: {
    position: "absolute",
    backgroundColor: "#009688",
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
    color: "#fff",
    fontSize: 18
  },

  SnackBarUndoText: {
    color: "#FFEB3B",
    fontSize: 18,
    position: "absolute",
    right: 10,
    justifyContent: "center",
    padding: 5
  }
});
