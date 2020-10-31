import React, { Component } from "react";
import { View, Platform, Image,Modal } from "react-native";
import { Button, Icon, Text } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

class SelecImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            isModalOpen: false,
        };
    }
    componentDidMount() {
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
    }
    pickImage = async (type) => {
        let result;
        if (type === "camera") {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,

                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,

                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        }

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    showModal = (openGallery, openCamera) => {
        return (
            <Modal
                isVisible={this.state.isModalOpen}
                backdropOpacity={0.5}
                onBackButtonPress={() => this.handleCancel()}
            >
                <View>
                    <Text>Choose from your photos or taka a selfie</Text>
                    <View>
                        <TouchableOpacity>
                            <Icon
                                name="gallery"
                                type="Feather"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon
                                name="camera"
                                type="Feather"
                            />
                        </TouchableOpacity>
                    </View>
                    <Button>
                        <Text>
                            Cancel
                </Text>
                    </Button>
                </View>
            </Modal>
        )
    }

    handleCancel = () => {
        this.setState({ isModalOpen: false });
    }

    render() {
        return (
            <Button
                style={{
                    width: 96,
                    height: 96,
                    borderRadius: 50,
                    overflow: "hidden",
                    backgroundColor: "#FFF",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                onPress={this.showModal}
            >
                {this.state.image ? (
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            resizeMode: "contain",
                        }}
                        source={{ uri: this.state.image }}
                    />
                ) : (
                        <Icon
                            name="user"
                            type="Feather"
                            style={{
                                color: colors.blueBorder,
                                fontSize: 40,
                            }}
                        />
                    )}
                <View
                    style={{
                        width: "100%",
                        height: 25,
                        position: "absolute",
                        bottom: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0.53)",
                    }}
                >
                    <Icon
                        name="camera"
                        type="Feather"
                        style={{
                            color: "#FFFFFF",
                            fontSize: 17,
                        }}
                    />
                </View>
                {this.state.isModalOpen && this.showModal()}
            </Button>
        )

    }
};

export default SelecImage;
