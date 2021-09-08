import React, {useContext} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  View,
  Platform,
  ImageBackground,
} from 'react-native';
import {heightToDp, widthToDp} from '../utils/Dimensions';

export const MovieItemLayout = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}`,
        }}
        resizeMode="stretch"
        style={{
          width: widthToDp(35),
          height: widthToDp(48),
          margin: 10,
        }}
        imageStyle={{borderRadius: 10}}>
        <TouchableOpacity
          onPress={props.onLike}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            width: widthToDp(8),
            height: widthToDp(8),
            backgroundColor: 'transparent',
            borderRadius: 10,
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: widthToDp(7),
              width: widthToDp(7),
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            source={
              props.isLiked
                ? require('../assets/redH.png')
                : require('../assets/heart.png')
            }
          />
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'column',
          margin: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            marginRight: widthToDp(50),
          }}>
          {props.item.original_title}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View>
            <Text style={{}}>
              {props.item.release_date.slice(0, 4)} |{' '}
              {props.item.original_language.toUpperCase()}
            </Text>
            <Text style={{}}>Genre</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text
              style={{
                color: 'black',
              }}>
              {props.item.vote_average}
            </Text>
            <Text
              style={{
                color: 'black',
              }}>
              {props.item.adult ? 'Adult' : 'Public'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
