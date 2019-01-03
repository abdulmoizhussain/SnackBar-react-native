import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";

export default class Modal extends Component {
  state = {};
  render() {
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.welcome}>Update Rates</Text>
        <Text style={styles.currencyCode}>USD/PKR</Text>
        <View style={styles.inputViewWithLabel}>
          <Text style={styles.inputLabel}>Buying</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={this.state.buying}
            onChangeText={buying => {
              this.setState({ buying });
            }}
            underlineColorAndroid="gray"
          />
        </View>
        <View style={styles.inputViewWithLabel}>
          <Text style={styles.inputLabel}>Selling</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            value={this.state.selling}
            onChangeText={selling => this.setState({ selling })}
            underlineColorAndroid="gray"
          />
        </View>
        <TouchableHighlight
          style={styles.updateButton}
          onPress={() => {}}
          underlayColor="#fff"
        >
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    minHeight: "50%",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1
  },
  inputViewWithLabel: {
    flexDirection: "row"
  },
  inputLabel: {
    margin: 10,
    fontSize: 16
  },
  textInput: {
    height: 40,
    width: 130,
    fontSize: 16,
    color: "gray",
    textAlign: "center"
  },
  welcome: {
    fontSize: 22,
    textAlign: "center",
    margin: 10
  },
  currencyCode: {
    fontSize: 19,
    textAlign: "center",
    margin: 10,
    shadowColor: "gray",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  updateButton: {
    marginTop: "5%",
    marginBottom: 20,
    padding: "auto",
    height: 40,
    width: 150,
    borderRadius: 20,
    backgroundColor: "#1666DF"
  },
  updateButtonText: {
    textAlign: "center",
    margin: 5,
    fontSize: 19,
    color: "#fff"
  }
});
