import React, { Component } from 'react'
import { Button, Text,Alert, View, StyleSheet, StatusBar, AsyncStorage , Image } from 'react-native'
import { Fab, Icon } from 'native-base'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import { Database } from '../public/firebaseConfig'
import Geocoder from 'react-native-geocoder'

import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from 'firebase';

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userid:'',
			mapRegion: null,
			latitude: 0,
			longitude: 0,
			users: [],
			isModalVisible: false,
			time:null,
			address:""
			}
		}

	modalControl = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible })
	}

	componentDidMount = async () => {

		AsyncStorage.getItem('userid', (err, result) => {
			if (result) { this.setState({ userid: result })}
		})
			this.getCurrentPosition()
			await this.user()
			this.setState({
				time:setInterval(() => this.updateLocation(), 5000000)
			})
	}

	updateLocation = async () => {
		
		const { userid } = this.state
		Database.ref('/user').orderByChild('userid').equalTo(userid).once('value', (result) => {
			Database.ref('/user/' + userid).update({latitude: this.state.latitude, longitude: this.state.longitude })
		})
}
	getCurrentPosition() {
			GetLocation.getCurrentPosition({
					enableHighAccuracy: true,
					// timeout: 15000,
			})
					.then(location => {
						console.warn(location.latitude);

						let region = {
							latitude: location.latitude,
							longitude: location.longitude,
							latitudeDelta: 1,
							longitudeDelta: 1
						}

						this.setState({
							mapRegion: region,
							latitude: location.latitude,
							longitude: location.longitude
						})
					})
					.catch(error => {
						const { code, message } = error;
						alert("gps nya di nyalain dulu coeg");
					})
	}


	user = async () => {
			Database.ref('/user').once('value', (result) => {
					let data = result.val();
					if (data !== null) {
							let users = Object.values(data);
							this.setState({
									users: users
							})
					}
			});
	}
	clear = async () => {
		alert("asdsad")
		clearInterval(this.state.time)
		this.setState({ time :null }) 
	
	}
	
	geocode = async (lat,lng,item) => {
		var Location = {lat,lng};
		var UID = await AsyncStorage.getItem("userid")
		Geocoder.geocodePosition(Location).then(async res => {
			const address =  res[0].subLocality+", "+res[0].subAdminArea+", "+res[0].adminArea
			{ item.id !== this.state.userid ? 
				// Alert.alert(
				// 	"si " + item.username + ", lagi ada di",
				// 	address,
				// 	[
				// 		{text: 'Ajak chat',onPress: () =>this.props.navigation.navigate('chat', { data: item })},
				// 		{text: 'OK', onPress: () => console.log('OK Pressed')},
				// 	],
				// 	{cancelable: false},
				// )
				Alert.alert(
					"si " + item.username + ", lagi ada di",
					address,
					[
						{text: 'Ga mau', onPress: () => console.log('OK Pressed')},
						{text: 'Ajak chat',onPress: () =>this.props.navigation.navigate('chat', { data: item })},
						{text: '', onPress: () => console.log('OK Pressed')},
						

					],
					{cancelable: false},
				):
				Alert.alert(
					"Loe lagi ada di ",
					address,
					[
						{text: 'OK', onPress: () => console.log('OK Pressed')},
					],
					{cancelable: false},
				);
			}
			// if(item.userid !== this.state.userid){
			// 	Alert.alert(
			// 		"si " + item.username + ", lagi ada di",
			// 		address,
			// 		[
			// 			{text: 'Ajak chat',onPress: () =>this.props.navigation.navigate('chat', { data: item })},
			// 			{text: 'OK', onPress: () => console.log('OK Pressed')},
			// 		],
			// 		{cancelable: false},
			// 	);
			// }else{
			// 	Alert.alert(
			// 		"Loe lagi ada di ",
			// 		address,
			// 		[
			// 			{text: 'OK', onPress: () => console.log('OK Pressed')},
			// 		],
			// 		{cancelable: false},
			// 	);
			// }


		}).catch(err => alert(err))
	

	}

    render() {

			var Location = {
				lat: this.state.latitude,
				lng: this.state.longitude
			};
			
			// Geocoder.geocodePosition(Location).then(res => {
			// 	const address =  res[0].subLocality+", "+res[0].subAdminArea+", "+res[0].adminArea+", "+res[0].country
			// 	this.setState({ address:address})
			// }).catch(err => alert(err))
			return (
				<>
					<View style={styles.container}>
						<MapView
							provider={PROVIDER_GOOGLE}
							showsMyLocationButton={true}
							showsUserLocation={true}
							zoomControlEnabled={true}
							showsTraffic={true}
							style={styles.map}
							region={this.state.mapRegion}
							>
							{
								this.state.users.map((item) => {
									return (
										<>
										
										<Marker
											coordinate={{	latitude: item.latitude,	longitude: item.longitude,}}
											description={item.id !== this.state.userid ? item.status:""}
											// description={`${item.latitude} / ${item.longitude}`}
											title={item.username}
											key={item.id}
											onPress={ ()=> this.geocode(item.latitude,item.longitude,item)}
										>
											<View>
												<Icon name='pin' type='Ionicons' style={{ color: 'steelblue', fontSize: 50 }} />
												<Image	source={{ uri: item.avatar }}	style={{ width: 26, height: 26, borderRadius: 100 / 2, position: 'absolute', bottom: 18, left: 3 }}/>
											</View>
										</Marker>
										
										</>
									)
								})
							}
						</MapView>

							{/* <Fab position="bottomRight" onPress={() => this.clear()} >
								<Icon name="people" type="Ionicons" />
							</Fab> */}

							<Fab position="bottomRight" onPress={() => this.getCurrentPosition()} style={{  backgroundColor: 'white' }} >
								<Icon name="locate" type="Ionicons" style={{ color: 'steelblue' }} />
							</Fab>
					</View>
				</>
			)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,backgroundColor:"red"
    },
    map: {
        flex: 1,left:"1%",width:"98%"
    }
})